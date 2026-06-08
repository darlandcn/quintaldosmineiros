<template>
  <div class="px-5 py-4 space-y-4">

    <!-- Seção 1: Plano ativo -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Plano ativo</p>
      <div class="bg-zinc-50 rounded-xl p-3 grid grid-cols-2 gap-3">
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Plano</p>
          <p class="text-sm font-semibold text-zinc-800">Titânio</p>
        </div>
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Valor mensal</p>
          <p class="text-sm font-semibold text-zinc-800">{{ formatBRL(120) }}</p>
        </div>
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Vencimento</p>
          <p class="text-sm font-semibold text-zinc-800">todo dia 10</p>
        </div>
        <div>
          <p class="text-[11px] text-zinc-400 mb-0.5">Próximo vencimento</p>
          <p class="text-sm font-semibold text-zinc-800">{{ proximoVencimento }}</p>
        </div>
      </div>
    </section>

    <!-- Seção 2: Histórico de pagamentos -->
    <section>
      <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Histórico de Pagamentos</p>
      <div class="bg-zinc-50 rounded-xl px-3">
        <div
          v-for="p in pagamentos"
          :key="p.mes"
          class="border-b border-zinc-100 last:border-0 py-3"
        >
          <div class="flex justify-between items-center">
            <p class="text-sm font-semibold text-zinc-800">{{ p.mes }}</p>
            <span
              class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              :class="statusClass(p.status)"
            >
              {{ statusLabel(p.status) }}
            </span>
          </div>
          <div class="flex justify-between items-center mt-0.5">
            <p class="text-xs text-zinc-400">{{ p.vencimento }}</p>
            <p class="text-sm font-semibold text-zinc-700 tabular-nums">{{ formatBRL(p.valor) }}</p>
          </div>
        </div>
      </div>
      <p class="text-[11px] text-zinc-400 text-center pt-2">
        Integração com Bling em breve — status atualizado automaticamente ao pagar o boleto
      </p>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BlingPagamento } from '~/shared/types'

const props = defineProps<{
  pagamentos: BlingPagamento[]
}>()

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function statusClass(status: BlingPagamento['status']): string {
  if (status === 'pago') return 'bg-green-100 text-green-700'
  if (status === 'pendente') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-600'
}

function statusLabel(status: BlingPagamento['status']): string {
  if (status === 'pago') return 'Pago'
  if (status === 'pendente') return 'Pendente'
  return 'Vencido'
}

const proximoVencimento = computed(() => {
  const hoje = new Date()
  const d = new Date(hoje.getFullYear(), hoje.getMonth(), 10)
  if (d <= hoje) d.setMonth(d.getMonth() + 1)
  return d.toLocaleDateString('pt-BR')
})
</script>
