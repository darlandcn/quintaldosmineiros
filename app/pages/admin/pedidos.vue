<template>
  <div class="flex flex-col">

    <!-- Page Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-[#2F5946]/20 px-8 py-4">
      <div class="space-y-0.5">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">Pedidos</h1>
        <p class="text-xs text-gray-400 font-normal">Gerencie e acompanhe todos os pedidos</p>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex flex-col gap-2.5 px-6 py-3">
      <OrdersStats :filtered-orders="filteredOrders" :count-by-status="countByStatus" />
      <OrdersFilters
        v-model:search-query="searchQuery"
        v-model:filter-status="filterStatus"
        v-model:filter-date="filterDate"
        @clear="clearFilters"
      />
      <OrdersTable
        :filtered-orders="filteredOrders"
        :loading="loading"
        :fetch-error="fetchError"
        @open-drawer="openDrawer"
        @retry="fetchOrders"
      />
    </div>

    <OrderDetailsDrawer
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
