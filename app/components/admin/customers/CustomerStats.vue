<template>
  <div class="shrink-0 grid grid-cols-2 lg:grid-cols-4 gap-2.5">

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Clientes</p>
        <p class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">{{ filteredCustomers.length }}</p>
        <p class="text-[11px] text-gray-400 mt-1 leading-none">total de clientes</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Recorrentes</p>
        <p class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">{{ recurringCount }}</p>
        <p class="text-[11px] text-gray-400 mt-1 leading-none">mais de 1 pedido</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Ticket médio</p>
        <p class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">{{ averageTicket }}</p>
        <p class="text-[11px] text-gray-400 mt-1 leading-none">por pedido</p>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
        <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Faturado</p>
        <p class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">{{ formatBRL(totalRevenue) }}</p>
        <p class="text-[11px] text-gray-400 mt-1 leading-none">total acumulado</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/shared/types'

defineProps<{
  filteredCustomers: Customer[]
  recurringCount: number
  averageTicket: string
  totalRevenue: number
}>()

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}
</script>
