<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden flex flex-col">

    <div class="shrink-0 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
      <div class="space-y-0.5">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Lista</p>
        <p class="text-base font-bold text-gray-900 leading-none">Todos os clientes</p>
      </div>
      <span class="text-[11px] text-zinc-400 font-medium">{{ filteredCustomers.length }} resultados</span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="sticky top-0 bg-white">
          <tr class="border-b border-zinc-100">
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Cliente</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden md:table-cell">Telefone</th>
            <th class="text-center px-6 py-3 text-xs font-medium text-zinc-500">Pedidos</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden sm:table-cell">Total gasto</th>
            <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden lg:table-cell">Último pedido</th>
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
                <span class="text-sm">Carregando clientes...</span>
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
          <tr v-else-if="filteredCustomers.length === 0">
            <td colspan="7" class="px-6 py-14 text-center">
              <div class="flex flex-col items-center gap-2 text-zinc-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <p class="text-sm">Nenhum cliente encontrado</p>
              </div>
            </td>
          </tr>
          <template v-else>
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.key"
              class="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
              @dblclick="emit('openDrawer', customer)"
            >
              <td class="px-6 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-full bg-[#2F5946]/10 flex items-center justify-center shrink-0">
                    <span class="text-[11px] font-bold text-[#2F5946]">{{ customer.name[0].toUpperCase() }}</span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-medium text-zinc-700 truncate max-w-[160px]">{{ customer.name }}</p>
                    <p v-if="customer.email" class="text-xs text-zinc-400 truncate max-w-[160px]">{{ customer.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-3.5 hidden md:table-cell">
                <span class="text-sm text-zinc-500">{{ customer.phone ?? '—' }}</span>
              </td>
              <td class="px-6 py-3.5 text-center">
                <span
                  class="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                  :class="customer.orderCount > 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-zinc-100 text-zinc-500'"
                >
                  {{ customer.orderCount }}
                </span>
              </td>
              <td class="px-6 py-3.5 hidden sm:table-cell">
                <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ customer.totalSpent }}</span>
              </td>
              <td class="px-6 py-3.5 hidden lg:table-cell">
                <span class="text-sm text-zinc-500 tabular-nums">{{ customer.lastOrderDate }}</span>
              </td>
              <td class="px-6 py-3.5 text-center">
                <OrderStatusBadge :status="customer.lastStatus" />
              </td>
              <td class="px-6 py-3.5">
                <div class="flex items-center justify-end">
                  <button
                    class="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#2F5946] hover:border-[#2F5946]/30 hover:bg-[#2F5946]/5 transition-all duration-200"
                    title="Ver detalhes"
                    @click="emit('openDrawer', customer)"
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
      <p class="text-xs text-zinc-400">{{ filteredCustomers.length }} clientes exibidos</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/shared/types'

defineProps<{
  filteredCustomers: Customer[]
  loading: boolean
  fetchError: string | null
}>()

const emit = defineEmits<{
  openDrawer: [customer: Customer]
  retry: []
}>()
</script>
