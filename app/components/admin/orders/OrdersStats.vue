<template>
  <div class="shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Total</p>
        <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">{{ filteredOrders.length }}</p>
        <p class="text-[11px] text-gray-400 mt-1.5 leading-none">todos os pedidos</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pendentes</p>
        <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">{{ countByStatus('pending') }}</p>
        <p class="text-[11px] text-amber-500 mt-1.5 leading-none font-medium">aguardando pagamento</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pagos</p>
        <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">{{ countByStatus('paid') }}</p>
        <p class="text-[11px] text-green-600 mt-1.5 leading-none font-medium">pagamento confirmado</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Enviados</p>
        <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">{{ countByStatus('shipped') }}</p>
        <p class="text-[11px] text-indigo-500 mt-1.5 leading-none font-medium">a caminho do cliente</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
      <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Cancelados</p>
        <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">{{ countByStatus('cancelled') }}</p>
        <p class="text-[11px] text-red-400 mt-1.5 leading-none font-medium">pedidos cancelados</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Order, OrderStatus } from '~/composables/admin/useOrders'

defineProps<{
  filteredOrders: Order[]
  countByStatus: (status: OrderStatus) => number
}>()
</script>
