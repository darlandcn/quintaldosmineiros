<template>
  <div class="px-5 py-4 space-y-4">

    <!-- Resumo -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Resumo</p>
      <div class="bg-zinc-50 rounded-xl p-3 grid grid-cols-3 gap-3">
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Total em fretes</p>
          <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ formatBRL(totalFrete) }}</p>
        </div>
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Coletas</p>
          <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ coletas.length }}</p>
        </div>
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Média por coleta</p>
          <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ formatBRL(mediaColeta) }}</p>
        </div>
      </div>
    </section>

    <!-- Tabela de coletas -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Coletas</p>
      <div class="rounded-xl border border-zinc-100 overflow-hidden">

        <!-- Header -->
        <div class="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-3 py-2 bg-zinc-50 border-b border-zinc-100">
          <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">ID</p>
          <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Destino</p>
          <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Status</p>
          <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right">Valor</p>
        </div>

        <!-- Rows -->
        <div
          v-for="c in coletas"
          :key="c.id"
          class="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-3 py-2.5 border-b border-zinc-100 last:border-0 items-center"
        >
          <div class="shrink-0">
            <p class="text-sm font-semibold text-zinc-800">{{ c.id }}</p>
            <p class="text-[11px] text-zinc-400">{{ c.data }}</p>
          </div>
          <div class="min-w-0">
            <p class="text-xs text-zinc-600 truncate">{{ c.destino }}</p>
            <p class="text-[11px] text-zinc-400">Pedido {{ c.pedidoId }}</p>
          </div>
          <span
            class="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            :class="statusClass(c.status)"
          >
            {{ statusLabel(c.status) }}
          </span>
          <p class="text-sm font-semibold text-zinc-700 tabular-nums text-right shrink-0">
            {{ formatBRL(c.valor) }}
          </p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import type { LoggiColeta } from '~/shared/types'

const props = defineProps<{
  coletas: LoggiColeta[]
}>()

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const totalFrete = computed(() => props.coletas.reduce((s, c) => s + c.valor, 0))
const mediaColeta = computed(() =>
  props.coletas.length ? totalFrete.value / props.coletas.length : 0,
)

function statusClass(status: LoggiColeta['status']): string {
  if (status === 'entregue') return 'bg-green-100 text-green-700'
  if (status === 'em_transito') return 'bg-blue-100 text-blue-600'
  if (status === 'cancelado') return 'bg-red-100 text-red-600'
  return 'bg-amber-100 text-amber-700'
}

function statusLabel(status: LoggiColeta['status']): string {
  if (status === 'entregue') return 'Entregue'
  if (status === 'em_transito') return 'Em trânsito'
  if (status === 'cancelado') return 'Cancelado'
  return 'Pendente'
}
</script>
