<template>
  <div class="shrink-0 bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 flex flex-wrap items-center gap-3">
    <div class="relative flex-1 min-w-[180px]">
      <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </span>
      <input
        :value="searchQuery"
        type="text"
        placeholder="Buscar por cliente ou pedido..."
        class="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all"
        @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="relative">
      <select
        :value="filterStatus"
        class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all bg-white cursor-pointer"
        @change="emit('update:filterStatus', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">Todos os status</option>
        <option value="pending">Pendente</option>
        <option value="paid">Pago</option>
        <option value="shipped">Enviado</option>
        <option value="cancelled">Cancelado</option>
      </select>
      <span class="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
        <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <div class="relative">
      <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      </span>
      <input
        :value="filterDate"
        type="date"
        class="border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all bg-white cursor-pointer"
        @input="emit('update:filterDate', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <button
      v-if="hasActiveFilters"
      class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors px-1"
      @click="emit('clear')"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      Limpar filtros
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  searchQuery: string
  filterStatus: string
  filterDate: string
}>()

const hasActiveFilters = computed(() => !!(props.searchQuery || props.filterStatus || props.filterDate))

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:filterStatus': [value: string]
  'update:filterDate': [value: string]
  clear: []
}>()
</script>
