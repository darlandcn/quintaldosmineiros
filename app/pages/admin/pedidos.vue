<template>
  <div class="flex flex-col h-full min-h-0">

    <!-- Page Header -->
    <div class="shrink-0 bg-white border-b border-[#2F5946]/20 px-10 py-5">
      <div class="flex items-center justify-between">
        <div class="space-y-0.5">
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight leading-none">Pedidos</h1>
          <p class="text-sm text-gray-400 font-normal">Gerencie e acompanhe todos os pedidos</p>
        </div>
        <button
          class="flex items-center gap-2 bg-[#2F5946] hover:bg-[#264a3b] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Exportar
        </button>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex-1 min-h-0 flex flex-col gap-3 px-6 py-4 overflow-y-auto">
      <AdminOrdersOrdersStats :filtered-orders="filteredOrders" :count-by-status="countByStatus" />
      <AdminOrdersOrdersFilters
        v-model:search-query="searchQuery"
        v-model:filter-status="filterStatus"
        v-model:filter-date="filterDate"
        @clear="clearFilters"
      />
      <AdminOrdersOrdersTable
        :filtered-orders="filteredOrders"
        :loading="loading"
        :fetch-error="fetchError"
        @open-drawer="openDrawer"
        @retry="fetchOrders"
      />
    </div>

    <AdminOrdersOrderDetailsDrawer
      :show-drawer="showDrawer"
      :selected-order="selectedOrder"
      v-model:draft-status="draftStatus"
      :drawer-loading="drawerLoading"
      :drawer-error="drawerError"
      :drawer-items="drawerItems"
      :saving-status="savingStatus"
      :save-error="saveError"
      :save-success="saveSuccess"
      @close="closeDrawer"
      @save="saveStatus"
    />

  </div>
</template>

<script setup lang="ts">
import { useOrders } from '~/composables/admin/useOrders'

definePageMeta({ layout: 'admin' })

const {
  loading,
  fetchError,
  searchQuery,
  filterStatus,
  filterDate,
  showDrawer,
  selectedOrder,
  draftStatus,
  drawerLoading,
  drawerError,
  drawerItems,
  savingStatus,
  saveError,
  saveSuccess,
  filteredOrders,
  fetchOrders,
  openDrawer,
  closeDrawer,
  saveStatus,
  clearFilters,
  countByStatus,
} = useOrders()

onMounted(fetchOrders)
</script>
