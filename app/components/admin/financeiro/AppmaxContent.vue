<template>
  <div class="px-5 py-4 space-y-4">

    <!-- Seção 1: Tabela de taxas (referência) -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Tabela de Taxas</p>
      <div class="bg-zinc-50 rounded-xl p-3">
        <div
          v-for="taxa in tabelaTaxas"
          :key="taxa.nome"
          class="flex justify-between items-center py-2 border-b border-zinc-100 last:border-0"
        >
          <span class="text-sm text-zinc-600">{{ taxa.nome }}</span>
          <span class="text-sm font-semibold text-zinc-800 tabular-nums">{{ taxa.valor }}</span>
        </div>
      </div>
    </section>

    <!-- Seção 2: Últimos pedidos -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Últimos Pedidos</p>
      <div class="rounded-xl border border-zinc-100 overflow-hidden">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-zinc-50 border-b border-zinc-100">
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-left px-2 py-2">Pedido</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-left px-2 py-2">Método</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Bruto</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Taxa</th>
              <th class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest text-right px-2 py-2">Líquido</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="t in transacoes"
              :key="t.pedidoId"
              class="border-b border-zinc-100 last:border-0"
            >
              <td class="px-2 py-2.5">
                <p class="text-sm font-semibold text-zinc-800">{{ t.pedidoId }}</p>
                <p class="text-[11px] text-zinc-400">{{ formatData(t.data) }}</p>
              </td>
              <td class="px-2 py-2.5">
                <span
                  class="text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                  :class="metodoClass(t.metodo)"
                >
                  {{ metodoLabel(t) }}
                </span>
              </td>
              <td class="px-2 py-2.5 text-sm text-zinc-600 tabular-nums text-right whitespace-nowrap">
                {{ formatBRL(t.valorBruto) }}
              </td>
              <td class="px-2 py-2.5 text-right whitespace-nowrap">
                <p class="text-sm text-red-500 tabular-nums">{{ formatBRL(t.valorTaxa) }}</p>
                <p class="text-[11px] text-zinc-400">{{ taxaSubInfo(t) }}</p>
              </td>
              <td class="px-2 py-2.5 text-sm font-semibold text-green-700 tabular-nums text-right whitespace-nowrap">
                {{ formatBRL(t.valorLiquido) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AppmaxTransacao } from '~/shared/types'

const props = defineProps<{
  transacoes: AppmaxTransacao[]
}>()

const tabelaTaxas = [
  { nome: 'Cartão de crédito (30 dias)',  valor: '4,99% por venda aprovada'    },
  { nome: 'Taxa de parcelamento',         valor: '2,49% por parcela'           },
  { nome: 'Boleto',                       valor: 'R$ 3,49 por boleto pago'     },
  { nome: 'Pix',                          valor: '1,00% por pix pago'          },
  { nome: 'Gateway e Antifraude',         valor: 'R$ 0,99 por transação aprovada' },
  { nome: 'Saque (abaixo de R$ 10.000)', valor: 'R$ 3,67 por saque'           },
  { nome: 'Estorno / Chargeback',         valor: '15,00% por recuperação ativa'},
  { nome: 'Recuperação de vendas por IA', valor: 'R$ 1,99 por venda recuperada'},
  { nome: 'Recuperação de carrinho',      valor: 'R$ 1,99 por carrinho recuperado' },
]

function formatData(data: string): string {
  return data.slice(0, 5) // "dd/mm/yyyy" → "dd/mm"
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(value) + '%'
}

const totalBruto  = computed(() => props.transacoes.reduce((s, t) => s + t.valorBruto,  0))
const totalTaxas  = computed(() => props.transacoes.reduce((s, t) => s + t.valorTaxa,   0))
const totalLiquido = computed(() => props.transacoes.reduce((s, t) => s + t.valorLiquido, 0))

function metodoClass(metodo: 'pix' | 'credito' | 'boleto'): string {
  if (metodo === 'pix')     return 'bg-green-100 text-green-700'
  if (metodo === 'credito') return 'bg-blue-100 text-blue-600'
  return 'bg-amber-100 text-amber-700'
}

function metodoLabel(t: AppmaxTransacao): string {
  if (t.metodo === 'pix')    return 'Pix'
  if (t.metodo === 'boleto') return 'Boleto'
  return t.parcelas > 1 ? `Crédito ${t.parcelas}x` : 'Crédito'
}

function taxaSubInfo(t: AppmaxTransacao): string {
  if (t.taxaPercentual > 0 && t.taxaFixa > 0)
    return `${formatPercent(t.taxaPercentual)} + ${formatBRL(t.taxaFixa)}`
  if (t.taxaPercentual > 0) return formatPercent(t.taxaPercentual)
  return formatBRL(t.taxaFixa)
}
</script>
