<template>
  <div class="px-5 py-4 space-y-4">

    <!-- Seção 1: Regra de coprodução -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Regra de Coprodução</p>
      <div class="bg-zinc-50 rounded-xl p-3">
        <div
          v-for="linha in regraLinhas"
          :key="linha.nome"
          class="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0"
        >
          <span class="text-sm text-zinc-600">{{ linha.nome }}</span>
          <span class="text-sm font-semibold text-zinc-800">{{ linha.valor }}</span>
        </div>
      </div>
    </section>

    <!-- Seção 2: Histórico de repasses -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Histórico de Repasses</p>
      <div class="rounded-xl border border-zinc-100 overflow-hidden">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-zinc-50 border-b border-zinc-100">
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-left px-2 py-2">Pedido</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-left px-2 py-2">Data</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Qtd</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Bruto</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Repasse</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-left px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="r in repasses"
              :key="r.pedidoId"
              class="border-b border-zinc-100 last:border-0"
            >
              <td class="px-2 py-2.5 text-sm font-semibold text-zinc-800">{{ r.pedidoId }}</td>
              <td class="px-2 py-2.5 text-sm text-zinc-500 whitespace-nowrap">{{ formatData(r.data) }}</td>
              <td class="px-2 py-2.5 text-sm text-zinc-600 tabular-nums text-right">{{ r.quantidade }}</td>
              <td class="px-2 py-2.5 text-sm text-zinc-600 tabular-nums text-right whitespace-nowrap">{{ formatBRL(r.valorBruto) }}</td>
              <td class="px-2 py-2.5 text-right whitespace-nowrap">
                <span
                  class="text-sm font-semibold tabular-nums"
                  :class="repasseClass(statusRepasse(r.statusPedido))"
                >
                  {{ formatBRL(r.valorRepasse) }}
                </span>
              </td>
              <td class="px-2 py-2.5">
                <span
                  class="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  :class="statusClass(statusRepasse(r.statusPedido))"
                >
                  {{ statusLabel(statusRepasse(r.statusPedido)) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import type { Repasse } from '~/shared/types'

const props = defineProps<{
  repasses: Repasse[]
}>()

const regraLinhas = [
  { nome: 'Fazenda Santa Fé',      valor: '24,5% por torresmo vendido'  },
  { nome: 'Produto vinculado',      valor: 'Torresmo — R$ 89,90 / un.'  },
  { nome: 'Repasse por unidade',    valor: 'R$ 22,03'                   },
  { nome: 'Processamento',          valor: 'Automático via AppMax'       },
]

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatData(data: string): string {
  return data.slice(0, 5)
}

function statusRepasse(statusPedido: Repasse['statusPedido']): 'realizado' | 'aguardando' | 'cancelado' {
  if (statusPedido === 'cancelled') return 'cancelado'
  if (statusPedido === 'pending') return 'aguardando'
  return 'realizado'
}

function statusClass(status: 'realizado' | 'aguardando' | 'cancelado'): string {
  if (status === 'realizado') return 'bg-green-100 text-green-700'
  if (status === 'aguardando') return 'bg-amber-100 text-amber-700'
  return 'bg-zinc-100 text-zinc-400'
}

function statusLabel(status: 'realizado' | 'aguardando' | 'cancelado'): string {
  if (status === 'realizado') return 'Realizado'
  if (status === 'aguardando') return 'Aguardando'
  return 'Cancelado'
}

function repasseClass(status: 'realizado' | 'aguardando' | 'cancelado'): string {
  if (status === 'realizado') return 'text-green-700'
  if (status === 'aguardando') return 'text-amber-600'
  return 'text-zinc-400 line-through'
}

</script>
