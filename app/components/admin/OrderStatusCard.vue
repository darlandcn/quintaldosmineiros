<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 px-6 py-4 flex flex-col gap-4 h-full min-h-0 justify-between">

    <!-- Header -->
    <div class="space-y-0.5">
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pedidos</p>
      <p class="text-base font-bold text-gray-900 leading-none">Status atual</p>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="flex flex-col gap-4 animate-pulse">
      <div v-for="i in 3" :key="i" class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-gray-100 shrink-0" />
            <div class="h-2.5 w-14 bg-gray-100 rounded-full" />
          </div>
          <div class="h-2.5 w-6 bg-gray-100 rounded-full" />
        </div>
        <div class="w-full h-1.5 bg-gray-100 rounded-full" />
      </div>
    </div>

    <!-- Status list -->
    <div v-else class="flex flex-col gap-4">
      <div v-for="s in statuses" :key="s.label" class="flex flex-col gap-1.5">

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span
              class="inline-block w-2 h-2 rounded-full shrink-0"
              :style="{ background: s.color }"
            />
            <span class="text-xs font-medium text-gray-600">{{ s.label }}</span>
          </div>
          <span class="text-xs font-semibold text-gray-800 tabular-nums">{{ s.count }}</span>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :style="{ width: s.pct + '%', background: s.color }"
          />
        </div>

      </div>
    </div>

    <!-- Total -->
    <div class="pt-1 border-t border-gray-100 flex items-center justify-between">
      <span class="text-[11px] text-gray-400 font-medium uppercase tracking-widest">Total</span>
      <template v-if="loading">
        <div class="h-3 w-6 bg-gray-100 rounded-full animate-pulse" />
      </template>
      <span v-else class="text-sm font-bold text-gray-900 tabular-nums">{{ total }}</span>
    </div>

  </div>
</template>

<script setup lang="ts">
interface StatusItem {
  label: string
  count: number
  color: string
  pct: number
}

const props = withDefaults(defineProps<{
  statuses?: StatusItem[]
  loading?: boolean
}>(), {
  statuses: () => [],
})

const total = computed(() => (props.statuses ?? []).reduce((s, r) => s + r.count, 0))
</script>
