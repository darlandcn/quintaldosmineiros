<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">

    <!-- Icon -->
    <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
      <slot name="icon" />
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="min-w-0 flex-1 space-y-1.5">
      <div class="h-2.5 w-16 bg-gray-100 rounded-full animate-pulse" />
      <div class="h-6 w-28 bg-gray-100 rounded animate-pulse" />
      <div class="h-2.5 w-20 bg-gray-100 rounded-full animate-pulse" />
    </div>

    <!-- Content -->
    <div v-else class="min-w-0 flex-1">
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">{{ label }}</p>
      <p class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">{{ value }}</p>
      <div v-if="trend !== undefined" class="flex items-center gap-1 mt-1">
        <svg
          class="w-3 h-3 shrink-0"
          :class="trend >= 0 ? 'text-green-500' : 'text-red-400'"
          fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round" stroke-linejoin="round"
            :d="trend >= 0 ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'"
          />
        </svg>
        <span
          class="text-[11px] font-semibold leading-none"
          :class="trend >= 0 ? 'text-green-500' : 'text-red-400'"
        >{{ Math.abs(trend) }}%</span>
        <span class="text-[11px] text-gray-400 leading-none">{{ trendLabel }}</span>
      </div>
      <p v-if="subtext" class="text-[11px] text-gray-400 mt-1 leading-none">{{ subtext }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label: string
  value: string
  trend?: number
  trendLabel?: string
  subtext?: string
  loading?: boolean
}>(), {
  trendLabel: 'vs. mês anterior',
  loading: false,
})
</script>
