<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden flex flex-col h-full min-h-0">

    <!-- Card Header -->
    <div class="shrink-0 px-5 py-3 border-b border-zinc-100 flex items-center justify-between">
      <div class="space-y-0.5">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pedidos</p>
        <p class="text-sm font-bold text-gray-900 leading-none">Recentes</p>
      </div>
      <span class="text-[11px] text-zinc-400 font-medium">Últimos 5</span>
    </div>

    <!-- Table wrapper -->
    <div class="flex-1 overflow-y-auto min-h-[260px]">

      <!-- Loading skeleton -->
      <div v-if="loading" class="divide-y divide-zinc-50 animate-pulse">
        <div v-for="i in 5" :key="i" class="flex items-center gap-3 px-5 py-2.5">
          <div class="h-3 w-10 bg-gray-100 rounded" />
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <div class="w-6 h-6 rounded-full bg-gray-100 shrink-0" />
            <div class="h-3 w-28 bg-gray-100 rounded" />
          </div>
          <div class="h-3 w-16 bg-gray-100 rounded hidden sm:block" />
          <div class="h-3 w-14 bg-gray-100 rounded" />
          <div class="h-5 w-16 bg-gray-100 rounded-full ml-auto" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex items-center justify-center h-full min-h-[120px]">
        <span class="text-sm text-red-400">{{ error }}</span>
      </div>

      <!-- Empty -->
      <div v-else-if="orders.length === 0" class="flex items-center justify-center h-full min-h-[120px]">
        <span class="text-sm text-zinc-400">Nenhum pedido encontrado</span>
      </div>

      <!-- Table -->
      <table v-else class="w-full">
        <thead class="sticky top-0 bg-white">
          <tr class="border-b border-zinc-100">
            <th class="text-left px-5 py-2 text-xs font-medium text-zinc-500">Pedido</th>
            <th class="text-left px-5 py-2 text-xs font-medium text-zinc-500">Cliente</th>
            <th class="text-left px-5 py-2 text-xs font-medium text-zinc-500 hidden sm:table-cell">Data</th>
            <th class="text-left px-5 py-2 text-xs font-medium text-zinc-500">Valor</th>
            <th class="text-right px-5 py-2 text-xs font-medium text-zinc-500">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-all duration-200"
          >
            <td class="px-5 py-2.5">
              <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ order.id }}</span>
            </td>
            <td class="px-5 py-2.5">
              <div class="flex items-center gap-2.5">
                <div class="w-6 h-6 rounded-full bg-[#2F5946]/10 flex items-center justify-center shrink-0">
                  <span class="text-[10px] font-bold text-[#2F5946]">{{ order.client[0] }}</span>
                </div>
                <span class="text-sm font-medium text-zinc-700 truncate max-w-[120px]">{{ order.client }}</span>
              </div>
            </td>
            <td class="px-5 py-2.5 hidden sm:table-cell">
              <span class="text-sm text-zinc-500 tabular-nums">{{ order.date }}</span>
            </td>
            <td class="px-5 py-2.5">
              <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ order.amount }}</span>
            </td>
            <td class="px-5 py-2.5 text-right">
              <span
                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                :class="statusClass[order.status]"
              >
                {{ statusLabel[order.status] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div class="shrink-0 px-5 py-2.5 border-t border-zinc-100">
      <p class="text-xs text-zinc-400">{{ loading ? '...' : `${orders.length} pedidos exibidos` }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
type OrderStatus = 'pending' | 'paid' | 'shipped'

const statusLabel: Record<OrderStatus, string> = {
  pending: 'Pendente',
  paid:    'Pago',
  shipped: 'Enviado',
}

const statusClass: Record<OrderStatus, string> = {
  pending: 'bg-yellow-50 text-yellow-600',
  paid:    'bg-green-50 text-green-700',
  shipped: 'bg-indigo-50 text-indigo-600',
}

const { orders, loading, error, fetchRecentOrders } = useRecentOrders()

onMounted(() => fetchRecentOrders())
</script>
