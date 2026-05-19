<template>
  <div class="flex-1 bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden flex flex-col min-h-[320px]">

    <div class="shrink-0 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
      <div class="space-y-0.5">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Lista</p>
        <p class="text-base font-bold text-gray-900 leading-none">Todos os pedidos</p>
      </div>
      <span class="text-[11px] text-zinc-400 font-medium">{{ filteredOrders.length }} resultados</span>
    </div>

    <div class="flex-1 overflow-y-auto min-h-0">
      <table class="w-full">
        <thead class="sticky top-0 bg-white">
          <tr class="border-b border-zinc-100">
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Pedido</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Cliente</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden sm:table-cell">Data</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden md:table-cell">Pagamento</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Valor</th>
            <th class="text-center px-6 py-3 text-xs font-medium text-zinc-500">Status</th>
            <th class="text-right px-6 py-3 text-xs font-medium text-zinc-500">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="px-6 py-14 text-center">
              <div class="flex flex-col items-center gap-2 text-zinc-400">
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span class="text-sm">Carregando pedidos...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="fetchError">
            <td colspan="7" class="px-6 py-14 text-center">
              <div class="flex flex-col items-center gap-2">
                <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <p class="text-sm text-red-500 font-medium">{{ fetchError }}</p>
                <button class="text-xs text-[#2F5946] hover:underline mt-1" @click="emit('retry')">Tentar novamente</button>
              </div>
            </td>
          </tr>
          <tr v-else-if="filteredOrders.length === 0">
            <td colspan="7" class="px-6 py-14 text-center">
              <div class="flex flex-col items-center gap-2 text-zinc-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
                </svg>
                <p class="text-sm">Nenhum pedido encontrado</p>
              </div>
            </td>
          </tr>
          <template v-else>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              class="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
              @dblclick="emit('openDrawer', order)"
            >
              <td class="px-6 py-3.5">
                <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ order.id }}</span>
              </td>
              <td class="px-6 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-full bg-[#2F5946]/10 flex items-center justify-center shrink-0">
                    <span class="text-[11px] font-bold text-[#2F5946]">{{ order.client[0] }}</span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-zinc-700 truncate max-w-[140px]">{{ order.client }}</p>
                    <p class="text-xs text-zinc-400 truncate max-w-[140px]">{{ order.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-3.5 hidden sm:table-cell">
                <span class="text-sm text-zinc-500 tabular-nums">{{ order.date }}</span>
              </td>
              <td class="px-6 py-3.5 hidden md:table-cell">
                <span class="text-sm text-zinc-500">{{ order.payment ?? '—' }}</span>
              </td>
              <td class="px-6 py-3.5">
                <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ order.amount }}</span>
              </td>
              <td class="px-6 py-3.5 text-center">
                <AdminOrdersOrderStatusBadge :status="order.status" />
              </td>
              <td class="px-6 py-3.5">
                <div class="flex items-center justify-end">
                  <button
                    class="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#2F5946] hover:border-[#2F5946]/30 hover:bg-[#2F5946]/5 transition-all duration-200"
                    title="Ver detalhes"
                    @click="emit('openDrawer', order)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="shrink-0 px-6 py-3 border-t border-zinc-100 flex items-center justify-between">
      <p class="text-xs text-zinc-400">{{ filteredOrders.length }} pedidos exibidos</p>
      <div class="flex items-center gap-1">
        <button class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors disabled:opacity-40" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="text-xs text-zinc-400 px-1">1 / 1</span>
        <button class="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors disabled:opacity-40" disabled>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Order } from '~/composables/admin/useOrders'

defineProps<{
  filteredOrders: Order[]
  loading: boolean
  fetchError: string | null
}>()

const emit = defineEmits<{
  openDrawer: [order: Order]
  retry: []
}>()
</script>
