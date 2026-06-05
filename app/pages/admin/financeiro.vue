<template>
  <div class="flex flex-col">

    <!-- Page Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-[#2F5946]/20 px-8 py-4">
      <div class="space-y-0.5">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">Financeiro</h1>
        <p class="text-xs text-gray-400 font-normal">Contas a pagar e acertos com parceiros</p>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex flex-col gap-2.5 px-6 py-3">

      <!-- Métricas -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5">

        <MetricCard label="Total a pagar" :value="totalAPagarMesDisplay">
          <template #icon>
            <CreditCard class="w-5 h-5 text-[#2F5946]" />
          </template>
        </MetricCard>

        <MetricCard label="Pendentes" :value="totalPendentesDisplay" subtext="contas em aberto">
          <template #icon>
            <Clock class="w-5 h-5 text-[#2F5946]" />
          </template>
        </MetricCard>

        <MetricCard label="Pago no mês" :value="totalPagoMesDisplay">
          <template #icon>
            <BadgeCheck class="w-5 h-5 text-[#2F5946]" />
          </template>
        </MetricCard>

        <MetricCard label="Próximo vencimento" :value="proximoVencimento">
          <template #icon>
            <CalendarDays class="w-5 h-5 text-[#2F5946]" />
          </template>
        </MetricCard>

      </div>

      <!-- Grid de parceiros -->
      <div class="grid grid-cols-4 gap-2.5">
        <button
          v-for="parceiro in parceiros"
          :key="parceiro.slug"
          class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-5 text-left hover:border-[#2F5946]/40 hover:shadow-sm transition-all"
          @click="openDrawer(parceiro.slug)"
        >
          <div class="flex items-center justify-between mb-2.5">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              :class="parceiro.cor"
            >
              <span class="text-xs font-bold" :class="parceiro.corTexto">{{ parceiro.sigla }}</span>
            </div>
            <span
              class="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              :class="parceiroStatusClass(parceiro.status)"
            >
              {{ parceiroStatusLabel(parceiro.status) }}
            </span>
          </div>
          <p class="text-sm font-semibold text-gray-900 truncate leading-none">{{ parceiro.nome }}</p>
          <p class="text-[11px] text-gray-400 truncate mt-0.5 mb-2">{{ parceiro.categoria }}</p>
          <p class="text-sm font-bold text-gray-900 tabular-nums leading-none">{{ formatBRL(parceiro.totalMensal) }}</p>
        </button>
      </div>

    </div>

    <!-- Drawer -->
    <FinanceiroDrawer :show-drawer="showDrawer" :parceiro="parceiroAtivo" @close="closeDrawer">
      <BlingContent
        v-if="parceiroAtivo?.slug === 'bling'"
        :pagamentos="blingPagamentos"
      />
      <AppmaxContent
        v-else-if="parceiroAtivo?.slug === 'appmax'"
        :transacoes="appmaxTransacoes"
      />
      <LoggiContent
        v-else-if="parceiroAtivo?.slug === 'loggi'"
        :coletas="loggiColetas"
      />
      <FornecedorContent
        v-else-if="parceiroAtivo?.slug === 'fornecedor'"
        :repasses="repasses"
      />
    </FinanceiroDrawer>

  </div>
</template>

<script setup lang="ts">
import { CreditCard, Clock, BadgeCheck, CalendarDays } from 'lucide-vue-next'
import { useFinanceiro } from '~/composables/admin/useFinanceiro'

definePageMeta({ layout: 'admin' })

const {
  parceiros,
  parceiroAtivo,
  showDrawer,
  blingPagamentos,
  appmaxTransacoes,
  loggiColetas,
  repasses,
  totalAPagarMesDisplay,
  totalPendentesDisplay,
  totalPagoMesDisplay,
  proximoVencimento,
  openDrawer,
  closeDrawer,
} = useFinanceiro()

onMounted(() => {})

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function parceiroStatusClass(status: 'ok' | 'pendente' | 'vencido'): string {
  if (status === 'ok') return 'bg-green-100 text-green-700'
  if (status === 'pendente') return 'bg-amber-100 text-amber-700'
  return 'bg-red-100 text-red-700'
}

function parceiroStatusLabel(status: 'ok' | 'pendente' | 'vencido'): string {
  if (status === 'ok') return 'Em dia'
  if (status === 'pendente') return 'Pendente'
  return 'Vencido'
}
</script>
