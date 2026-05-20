<template>
  <div class="flex flex-col">

    <!-- Page Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-[#2F5946]/20 px-8 py-4">
      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">Clientes</h1>
          <p class="text-xs text-gray-400 font-normal">Visualize e acompanhe sua base de clientes</p>
        </div>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex flex-col gap-2.5 px-6 py-3">
      <CustomerStats
        :filtered-customers="filteredCustomers"
        :recurring-count="recurringCount"
        :average-ticket="averageTicket"
        :total-revenue="totalRevenue"
      />

      <!-- Search -->
      <div class="shrink-0 bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 flex items-center gap-3">
        <div class="relative flex-1 min-w-[180px]">
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nome, email ou telefone..."
            class="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all"
          />
        </div>
        <button
          v-if="searchQuery"
          class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors px-1"
          @click="clearSearch"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpar
        </button>
      </div>

      <CustomersTable
        :filtered-customers="filteredCustomers"
        :loading="loading"
        :fetch-error="fetchError"
        @open-drawer="openDrawer"
        @retry="fetchCustomers"
      />
    </div>

    <CustomerDetailsDrawer
      :show-drawer="showDrawer"
      :selected-customer="selectedCustomer"
      @close="closeDrawer"
    />

  </div>
</template>

<script setup lang="ts">
import { useCustomers } from '~/composables/admin/useCustomers'

definePageMeta({ layout: 'admin' })

const {
  loading,
  fetchError,
  searchQuery,
  showDrawer,
  selectedCustomer,
  filteredCustomers,
  totalRevenue,
  recurringCount,
  averageTicket,
  fetchCustomers,
  openDrawer,
  closeDrawer,
  clearSearch,
} = useCustomers()

onMounted(fetchCustomers)
</script>
