<template>
  <div class="min-h-screen bg-[#f9f7f2]">

    <CheckoutHeader title="Acompanhar Pedido" back-to="/" />

    <main>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">

        <Transition name="fade" mode="out-in">

          <!-- ─── Etapa 1: Formulário ─── -->
          <div v-if="step === 'form'" key="form" class="max-w-md mx-auto">
            <div class="text-center mb-8">
<h1 class="font-display text-2xl font-semibold text-[#2C1810]">Acompanhar Pedido</h1>
              <p class="font-body text-sm text-[#7A6355] mt-2">Informe os dados utilizados na compra</p>
            </div>

            <div class="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 sm:p-8">
              <form @submit.prevent="handleSubmit" class="space-y-5">
                <div>
                  <label
                    class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5"
                    for="nome"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    v-model="form.nome"
                    type="text"
                    placeholder="Seu nome completo"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5"
                    for="email"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    class="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                  />
                </div>

                <p v-if="error" class="font-body text-sm text-red-600 pt-1">
                  {{ error }}
                </p>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full py-3.5 rounded-xl bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body text-sm font-semibold transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  {{ loading ? 'Consultando...' : 'Consultar pedido' }}
                </button>
              </form>
            </div>
          </div>

          <!-- ─── Etapa 2: Lista de pedidos ─── -->
          <div v-else-if="step === 'list'" key="list">
            <button
              class="inline-flex items-center gap-1.5 font-body text-xs text-[#9A8070] hover:text-[#2d4a3e] transition-colors duration-200 mb-6"
              @click="reset()"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar
            </button>

            <h2 class="font-display text-xl font-semibold text-[#2C1810] mb-1">
              Pedidos de {{ orders[0]?.customer_name }}
            </h2>
            <p class="font-body text-sm text-[#7A6355] mb-6">
              {{ orders.length }} {{ orders.length === 1 ? 'pedido encontrado' : 'pedidos encontrados' }}
            </p>

            <div class="space-y-3">
              <button
                v-for="order in orders"
                :key="order.id"
                class="w-full bg-white rounded-xl border border-zinc-100 shadow-sm px-5 py-4 flex items-center gap-4 hover:border-[#2d4a3e]/30 hover:shadow-md transition-all duration-200 text-left"
                @click="selectOrder(order)"
              >
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-3 flex-wrap mb-1.5">
                    <span class="font-body text-sm font-semibold text-[#2C1810]">
                      {{ orderNumber(order.id) }}
                    </span>
                    <span :class="['font-body text-[11px] font-semibold px-2 py-0.5 rounded-full', statusMap[order.status]?.color ?? 'bg-zinc-100 text-zinc-600']">
                      {{ statusMap[order.status]?.label ?? order.status }}
                    </span>
                  </div>
                  <div class="flex items-center gap-3 text-[#9A8070]">
                    <span class="font-body text-xs">{{ formatDate(order.created_at) }}</span>
                    <span class="font-body text-xs">·</span>
                    <span class="font-body text-xs font-semibold text-[#2C1810]">{{ formatBRL(order.total_price) }}</span>
                  </div>
                </div>
                <svg class="w-4 h-4 text-[#C0AA94] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- ─── Etapa 3: Rastreio ─── -->
          <div v-else-if="step === 'tracking' && selectedOrder" key="tracking">
            <button
              class="inline-flex items-center gap-1.5 font-body text-xs text-[#9A8070] hover:text-[#2d4a3e] transition-colors duration-200 mb-6"
              @click="step = 'list'"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Voltar aos pedidos
            </button>

            <!-- Resumo do pedido -->
            <div class="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 sm:p-6 mb-6">
              <div class="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Pedido</p>
                  <p class="font-display text-lg font-semibold text-[#2C1810]">{{ orderNumber(selectedOrder.id) }}</p>
                </div>
                <span :class="['font-body text-[11px] font-semibold px-2.5 py-1 rounded-full', statusMap[selectedOrder.status]?.color ?? 'bg-zinc-100 text-zinc-600']">
                  {{ statusMap[selectedOrder.status]?.label ?? selectedOrder.status }}
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                <div>
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Data</p>
                  <p class="font-body text-sm text-[#2C1810]">{{ formatDate(selectedOrder.created_at) }}</p>
                </div>
                <div>
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Total</p>
                  <p class="font-body text-sm font-semibold text-[#2C1810]">{{ formatBRL(selectedOrder.total_price) }}</p>
                </div>
                <div v-if="selectedOrder.tracking_code" class="col-span-2 sm:col-span-1">
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Código de rastreio</p>
                  <button
                    class="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-[#2d4a3e] hover:text-[#1e3329] transition-colors duration-200"
                    @click="copyTrackingCode"
                  >
                    {{ selectedOrder.tracking_code }}
                    <template v-if="!copiedCode">
                      <svg class="w-3.5 h-3.5 text-[#9A8070]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                      </svg>
                    </template>
                    <span v-else class="font-body text-[11px] text-green-600 font-semibold">Copiado!</span>
                  </button>
                </div>
              </div>

              <div
                v-if="selectedOrder.shipped_at || selectedOrder.delivered_at"
                class="flex flex-wrap gap-6 pt-4 border-t border-zinc-100 mt-4"
              >
                <div v-if="selectedOrder.shipped_at">
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Enviado em</p>
                  <p class="font-body text-sm text-[#2C1810]">{{ formatDate(selectedOrder.shipped_at) }}</p>
                </div>
                <div v-if="selectedOrder.delivered_at">
                  <p class="font-body text-[11px] text-[#9A8070] mb-0.5">Entregue em</p>
                  <p class="font-body text-sm text-[#2C1810]">{{ formatDate(selectedOrder.delivered_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Timeline de rastreio -->
            <div class="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 sm:p-6">
              <h3 class="font-display text-base font-semibold text-[#2C1810] mb-5">Histórico de rastreio</h3>

              <!-- Com eventos -->
              <div v-if="trackingEvents.length > 0">
                <div
                  v-for="(event, index) in trackingEvents"
                  :key="event.id"
                  class="flex gap-4"
                >
                  <div class="flex flex-col items-center">
                    <div
                      :class="[
                        'w-3 h-3 rounded-full flex-shrink-0 mt-0.5',
                        index === 0 ? 'bg-[#2d4a3e]' : 'border-2 border-[#2d4a3e] bg-white',
                      ]"
                    />
                    <div
                      v-if="index < trackingEvents.length - 1"
                      class="w-px flex-1 bg-[#2d4a3e]/20 my-1.5"
                    />
                  </div>
                  <div class="pb-5 flex-1 min-w-0">
                    <p class="font-body text-[11px] text-[#9A8070]">{{ formatDateTime(event.event_at) }}</p>
                    <p class="font-body text-sm font-semibold text-[#2C1810] mt-0.5">{{ event.status }}</p>
                    <p v-if="event.description" class="font-body text-sm text-[#7A6355] mt-0.5">{{ event.description }}</p>
                  </div>
                </div>
              </div>

              <!-- Sem eventos — pedido pendente ou pago, ainda não despachado -->
              <div
                v-else-if="selectedOrder.status === 'pending' || selectedOrder.status === 'paid'"
                class="flex flex-col items-center text-center py-10 gap-3"
              >
                <svg class="w-10 h-10 text-[#C0AA94]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p class="font-body text-sm text-[#7A6355] max-w-xs leading-relaxed">
                  Seu pedido ainda não foi despachado. Assim que sair para entrega, o rastreio aparecerá aqui.
                </p>
              </div>

              <!-- Sem eventos — pedido enviado ou posterior, rastreio pendente de sincronização -->
              <div v-else class="flex flex-col items-center text-center py-10 gap-3">
                <svg class="w-10 h-10 text-[#C0AA94]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="font-body text-sm text-[#7A6355] max-w-xs leading-relaxed">
                  Rastreio em atualização. Tente novamente em alguns minutos.
                </p>
              </div>
            </div>
          </div>

        </Transition>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({ layout: false })

useHead({
  title: 'Acompanhar Pedido — Quintal dos Mineiros',
})

const {
  step,
  loading,
  error,
  orders,
  selectedOrder,
  trackingEvents,
  searchOrders,
  selectOrder,
  reset,
} = useOrderTracking()

// ─── Estado local do formulário ───
const form = ref({ nome: '', email: '' })
const copiedCode = ref(false)

// ─── Mapa de status para badges ───
const statusMap = {
  pending:   { label: 'Aguardando pagamento', color: 'bg-yellow-100 text-yellow-800' },
  paid:      { label: 'Pagamento confirmado',  color: 'bg-blue-100 text-blue-800' },
  shipped:   { label: 'Em trânsito',           color: 'bg-purple-100 text-purple-800' },
  invoiced:  { label: 'Nota emitida',          color: 'bg-indigo-100 text-indigo-800' },
  delivered: { label: 'Entregue',              color: 'bg-green-100 text-green-800' },
  cancelled: { label: 'Cancelado',             color: 'bg-red-100 text-red-800' },
} as const

// ─── Helpers de formatação ───
function orderNumber(id: string): string {
  return '#' + id.slice(0, 8).toUpperCase()
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR')
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR')
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

// ─── Submit do formulário ───
function handleSubmit() {
  if (!form.value.nome.trim() || !form.value.email.trim()) return
  searchOrders(form.value.nome.trim(), form.value.email.trim())
}

// ─── Copiar código de rastreio ───
async function copyTrackingCode() {
  if (!selectedOrder.value?.tracking_code) return
  await navigator.clipboard.writeText(selectedOrder.value.tracking_code)
  copiedCode.value = true
  setTimeout(() => { copiedCode.value = false }, 2000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
