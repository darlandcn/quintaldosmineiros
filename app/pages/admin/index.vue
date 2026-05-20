<template>
  <div class="flex flex-col">

    <!-- Page Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-[#2F5946]/20 px-8 py-4">
      <div class="space-y-0.5">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">Dashboard</h1>
        <p class="text-xs text-gray-400 font-normal">Visão geral do seu negócio</p>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex flex-col gap-2.5 px-4 sm:px-6 py-3">

      <!-- Linha 1: Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        <MetricCard
          label="Receita total"
          :loading="revenueLoading"
          :value="revenueError ? 'Erro' : formattedRevenue"
        >
          <template #icon>
            <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </template>
        </MetricCard>
        <MetricCard
          label="Vendas hoje"
          :loading="todayLoading"
          :value="todayError ? 'Erro' : formattedTodaySales"
          :trend="todayTrend"
          trend-label="vs. ontem"
        >
          <template #icon>
            <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </template>
        </MetricCard>
        <MetricCard
          label="Pedidos este mês"
          :loading="totalOrdersLoading"
          :value="totalOrdersError ? 'Erro' : String(thisMonthOrders)"
          :trend="totalOrdersTrend"
        >
          <template #icon>
            <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
            </svg>
          </template>
        </MetricCard>
        <MetricCard
          label="Ticket médio"
          :loading="revenueLoading"
          :value="revenueError ? 'Erro' : formattedAvgTicket"
          :trend="avgTicketTrend"
        >
          <template #icon>
            <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
            </svg>
          </template>
        </MetricCard>
      </div>

      <!-- Linha 2: Gráfico + Status -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2.5">
        <div class="lg:col-span-2">
          <SalesChart class="min-h-[240px]" />
        </div>
        <div class="lg:col-span-1">
          <OrderStatusCard :statuses="orderStatuses" :loading="totalOrdersLoading" class="min-h-[200px]" />
        </div>
      </div>

      <!-- Linha 3: Pedidos + Top Produtos -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-2.5">
        <div class="lg:col-span-3">
          <RecentOrdersTable />
        </div>
        <div class="lg:col-span-2">
          <TopProductsCard />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const {
  formattedRevenue, revenueTrend, revenueLoading, revenueError, fetchRevenue,
  formattedAvgTicket, avgTicketTrend,
  formattedTodaySales, todayTrend, todayLoading, todayError, fetchTodaySales,
  thisMonthOrders, totalOrdersHistoric, totalOrdersTrend, totalOrdersLoading, totalOrdersError,
  orderStatuses, fetchTotalOrders,
} = useAdminRevenue()

onMounted(() => {
  fetchRevenue()
  fetchTodaySales()
  fetchTotalOrders()
})
</script>
