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

      <!-- Metric Cards -->
      <div class="shrink-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

        <!-- Todos -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Total</p>
            <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">—</p>
            <p class="text-[11px] text-gray-400 mt-1.5 leading-none">todos os pedidos</p>
          </div>
        </div>

        <!-- Pendentes -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pendentes</p>
            <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">—</p>
            <p class="text-[11px] text-amber-500 mt-1.5 leading-none font-medium">aguardando pagamento</p>
          </div>
        </div>

        <!-- Pagos -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Pagos</p>
            <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">—</p>
            <p class="text-[11px] text-green-600 mt-1.5 leading-none font-medium">pagamento confirmado</p>
          </div>
        </div>

        <!-- Enviados -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Enviados</p>
            <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">—</p>
            <p class="text-[11px] text-indigo-500 mt-1.5 leading-none font-medium">a caminho do cliente</p>
          </div>
        </div>

        <!-- Cancelados -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Cancelados</p>
            <p class="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums leading-none">—</p>
            <p class="text-[11px] text-red-400 mt-1.5 leading-none font-medium">pedidos cancelados</p>
          </div>
        </div>

      </div>

      <!-- Filtros -->
      <div class="shrink-0 bg-white rounded-xl border border-[#2F5946]/20 px-5 py-4 flex flex-wrap items-center gap-3">

        <!-- Busca -->
        <div class="relative flex-1 min-w-[180px]">
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por cliente ou pedido..."
            class="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all"
          />
        </div>

        <!-- Status -->
        <div class="relative">
          <select
            class="appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all bg-white cursor-pointer"
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

        <!-- Data -->
        <div class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </span>
          <input
            type="date"
            class="border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-600 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all bg-white cursor-pointer"
          />
        </div>

        <!-- Limpar -->
        <button
          class="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors px-1"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpar filtros
        </button>

      </div>

      <!-- Tabela placeholder -->
      <div class="flex-1 bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden flex flex-col min-h-[320px]">

        <!-- Table Header -->
        <div class="shrink-0 px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div class="space-y-0.5">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Lista</p>
            <p class="text-base font-bold text-gray-900 leading-none">Todos os pedidos</p>
          </div>
          <span class="text-[11px] text-zinc-400 font-medium">— resultados</span>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-y-auto min-h-0">
          <table class="w-full">
            <thead class="sticky top-0 bg-white">
              <tr class="border-b border-zinc-100">
                <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Pedido</th>
                <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Cliente</th>
                <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden sm:table-cell">Data</th>
                <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500 hidden md:table-cell">Itens</th>
                <th class="text-left px-6 py-3 text-xs font-medium text-zinc-500">Valor</th>
                <th class="text-right px-6 py-3 text-xs font-medium text-zinc-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <!-- Empty state -->
              <tr>
                <td colspan="6" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
                      </svg>
                    </div>
                    <div class="space-y-1">
                      <p class="text-sm font-semibold text-zinc-500">Nenhum pedido encontrado</p>
                      <p class="text-xs text-zinc-400">Os pedidos aparecerão aqui quando conectados ao banco de dados</p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="shrink-0 px-6 py-3 border-t border-zinc-100 flex items-center justify-between">
          <p class="text-xs text-zinc-400">— pedidos exibidos</p>
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

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })
</script>
