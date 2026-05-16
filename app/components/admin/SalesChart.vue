<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 px-6 py-4 flex flex-col gap-3 h-full min-h-0">

    <!-- Header -->
    <div class="flex items-center justify-between shrink-0">
      <div class="space-y-0.5">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Vendas</p>
        <p class="text-base font-bold text-gray-900 leading-none">Últimos 7 dias</p>
      </div>
      <span
        v-if="!loading && !error && chartData.length > 0"
        class="text-[11px] font-semibold px-2.5 py-1 rounded-full"
        :class="totalGrowth >= 0 ? 'text-green-500 bg-green-50' : 'text-red-400 bg-red-50'"
      >
        {{ totalGrowth >= 0 ? '+' : '' }}{{ totalGrowth }}% esta semana
      </span>
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="flex-1 min-h-0 flex flex-col gap-3 animate-pulse">
      <div class="flex-1 bg-gray-100 rounded-lg" />
      <div class="flex justify-between shrink-0">
        <div v-for="i in 7" :key="i" class="h-2.5 w-6 bg-gray-100 rounded-full" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="flex-1 flex items-center justify-center min-h-0">
      <span class="text-sm text-red-400">{{ error }}</span>
    </div>

    <!-- Chart + Labels -->
    <template v-else>
      <!-- Chart -->
      <div class="relative w-full flex-1 min-h-0">
        <svg
          :viewBox="`0 0 ${W} ${H}`"
          preserveAspectRatio="none"
          class="absolute inset-0 w-full h-full overflow-visible"
        >
          <!-- Grid lines -->
          <line
            v-for="y in gridYs"
            :key="y"
            :x1="PAD_L" :y1="y" :x2="W - PAD_R" :y2="y"
            stroke="#f3f4f6" stroke-width="1"
          />

          <!-- Area fill -->
          <path :d="areaPath" fill="url(#areaGrad)" />

          <!-- Line -->
          <polyline
            :points="linePoints"
            fill="none"
            stroke="#2F5946"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
          />

          <!-- Dots -->
          <circle
            v-for="(pt, i) in points"
            :key="i"
            :cx="pt.x" :cy="pt.y"
            r="3.5"
            fill="white"
            stroke="#2F5946"
            stroke-width="2"
          />

          <!-- Gradient def -->
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stop-color="#2F5946" stop-opacity="0.12" />
              <stop offset="100%" stop-color="#2F5946" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- X Labels -->
      <div class="flex justify-between px-0 shrink-0">
        <span
          v-for="d in chartData"
          :key="d.day"
          class="text-[11px] text-gray-400 font-medium text-center flex-1"
        >{{ d.day }}</span>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
const { chartData, loading, error, fetchSalesChart } = useSalesChart()

onMounted(() => fetchSalesChart())

const W = 600
const H = 160
const PAD_L = 8
const PAD_R = 8
const PAD_T = 16
const PAD_B = 8

const minVal = computed(() => Math.min(...chartData.value.map(d => d.value)))
const maxVal = computed(() => Math.max(...chartData.value.map(d => d.value)))
const range  = computed(() => maxVal.value - minVal.value || 1)

const totalGrowth = computed(() => {
  const first = chartData.value[0]?.value ?? 0
  const last  = chartData.value[chartData.value.length - 1]?.value ?? 0
  if (first === 0) return 0
  return Number(((last - first) / first * 100).toFixed(1))
})

const gridYs = computed(() => {
  const steps = 3
  return Array.from({ length: steps + 1 }, (_, i) =>
    PAD_T + (H - PAD_T - PAD_B) * (i / steps)
  )
})

const points = computed(() => {
  const len = chartData.value.length
  if (len < 2) return []
  return chartData.value.map((d, i) => ({
    x: PAD_L + (i / (len - 1)) * (W - PAD_L - PAD_R),
    y: PAD_T + (1 - (d.value - minVal.value) / range.value) * (H - PAD_T - PAD_B),
  }))
})

const linePoints = computed(() =>
  points.value.map(p => `${p.x},${p.y}`).join(' ')
)

const areaPath = computed(() => {
  const pts = points.value
  if (pts.length === 0) return ''
  const bottom = H - PAD_B
  const start  = `M ${pts[0].x},${bottom}`
  const line   = pts.map(p => `L ${p.x},${p.y}`).join(' ')
  const end    = `L ${pts[pts.length - 1].x},${bottom} Z`
  return `${start} ${line} ${end}`
})
</script>
