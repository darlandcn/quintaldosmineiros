<template>
  <div class="min-h-screen bg-[#f9f7f2]">

    <!-- Header -->
    <div class="bg-[#2F5946] sticky top-0 z-10 shadow-[0_2px_20px_rgba(44,24,16,0.2)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center relative">
        <NuxtLink to="/" class="absolute left-4 sm:left-6 flex items-center gap-0">
          <img src="/images/logo_passarinho_2.png" alt="" class="h-10 w-auto" />
          <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-9 w-auto" />
        </NuxtLink>
        <span class="font-display text-base font-semibold text-white">Pagamento</span>
        <button
          class="absolute right-4 sm:right-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 font-body text-sm group"
          @click="router.back()"
        >
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>
    </div>

    <main>
      <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">

        <!-- ─── Loading skeleton ─── -->
        <div v-if="state.loading" class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 animate-pulse">
          <div class="bg-zinc-200 rounded-xl h-96" />
          <div class="bg-zinc-200 rounded-xl h-64" />
        </div>

        <!-- ─── Error state ─── -->
        <div v-else-if="state.error" class="flex flex-col items-center text-center py-20 gap-4">
          <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p class="font-body text-sm text-[#7A6355] max-w-xs">{{ state.error }}</p>
          <NuxtLink
            to="/"
            class="mt-2 px-6 py-3 rounded-lg font-body font-medium text-sm bg-[#2d4a3e] text-white hover:bg-[#1e3329] transition-colors"
          >
            Voltar ao início
          </NuxtLink>
        </div>

        <!-- ─── Conteúdo principal ─── -->
        <div v-else-if="state.order" class="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          <!-- Coluna esquerda: Pagamento -->
          <div class="order-2 lg:order-1">

            <!-- Etapa 1: Seleção do método -->
            <template v-if="!state.selectedMethod">
              <h2 class="font-display text-xl font-semibold text-[#2C1810] mb-5">Como você quer pagar?</h2>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <!-- Pix -->
                <button
                  class="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-zinc-200 shadow-sm hover:border-[#2d4a3e]/50 hover:shadow-md transition-all duration-200 text-center"
                  @click="selectMethod('pix')"
                >
                  <Zap class="w-7 h-7 text-[#2d4a3e]" />
                  <span class="font-body text-sm font-semibold text-[#2C1810]">Pix</span>
                  <span class="font-body text-xs text-zinc-500 leading-relaxed">Aprovação imediata. Desconto de 1%</span>
                </button>

                <!-- Boleto -->
                <button
                  class="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-zinc-200 shadow-sm hover:border-[#2d4a3e]/50 hover:shadow-md transition-all duration-200 text-center"
                  @click="selectMethod('boleto')"
                >
                  <FileText class="w-7 h-7 text-[#2d4a3e]" />
                  <span class="font-body text-sm font-semibold text-[#2C1810]">Boleto</span>
                  <span class="font-body text-xs text-zinc-500 leading-relaxed">Vence em 3 dias úteis</span>
                </button>

                <!-- Cartão de crédito -->
                <button
                  class="flex flex-col items-center gap-2 p-5 bg-white rounded-xl border border-zinc-200 shadow-sm hover:border-[#2d4a3e]/50 hover:shadow-md transition-all duration-200 text-center"
                  @click="selectMethod('credit_card')"
                >
                  <CreditCard class="w-7 h-7 text-[#2d4a3e]" />
                  <span class="font-body text-sm font-semibold text-[#2C1810]">Cartão de Crédito</span>
                  <span class="font-body text-xs text-zinc-500 leading-relaxed">Em até 12x</span>
                </button>

              </div>
            </template>

            <!-- Etapa 2: UI do método selecionado -->
            <template v-else>

              <!-- Breadcrumb de volta -->
              <button
                class="inline-flex items-center gap-1.5 font-body text-xs text-[#9A8070] hover:text-[#2d4a3e] transition-colors duration-200 mb-6"
                @click="selectMethod(null)"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Trocar forma de pagamento
              </button>

              <!-- ─── Pix ─── -->
              <div v-if="state.selectedMethod === 'pix'" class="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 sm:p-6">
                <h3 class="font-display text-base font-semibold text-[#2C1810] mb-5 flex items-center gap-2">
                  <Zap class="w-5 h-5 text-[#2d4a3e]" />
                  Pagamento via Pix
                </h3>

                <!-- idle: botão gerar -->
                <div v-if="state.paymentStatus === 'idle'" class="flex justify-center py-4">
                  <button
                    class="px-8 py-3 bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body font-medium text-sm rounded-lg transition-colors duration-200"
                    @click="generatePix()"
                  >
                    Gerar QR Code Pix
                  </button>
                </div>

                <!-- processing: spinner -->
                <div v-else-if="state.paymentStatus === 'processing'" class="flex flex-col items-center py-10 gap-3">
                  <svg class="w-8 h-8 animate-spin text-[#2d4a3e]" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <p class="font-body text-sm text-[#7A6355]">Gerando seu Pix...</p>
                </div>

                <!-- waiting: QR + copia e cola + timer -->
                <div v-else-if="state.paymentStatus === 'waiting' && state.pixData" class="flex flex-col items-center gap-5">

                  <!-- QR Code placeholder -->
                  <div class="w-[200px] h-[200px] border-2 border-dashed border-zinc-300 rounded-xl flex flex-col items-center justify-center gap-2 bg-zinc-50">
                    <QrCode class="w-12 h-12 text-zinc-400" />
                    <span class="font-body text-xs text-zinc-400">QR Code Pix</span>
                  </div>

                  <!-- Countdown -->
                  <p class="font-body text-sm text-zinc-500">
                    Expira em <span class="font-semibold text-[#2d4a3e]">{{ formatCountdown(pixSecondsLeft) }}</span>
                  </p>

                  <!-- Copia e cola -->
                  <div class="w-full">
                    <p class="font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5">Pix Copia e Cola</p>
                    <div class="flex gap-2">
                      <input
                        readonly
                        :value="state.pixData.qr_code_text"
                        class="flex-1 min-w-0 px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 font-body text-xs text-zinc-600 truncate outline-none"
                      />
                      <button
                        class="flex-shrink-0 px-4 py-2.5 rounded-lg bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body text-xs font-medium transition-colors duration-200"
                        @click="handleCopyPix()"
                      >
                        {{ copiedPix ? 'Copiado!' : 'Copiar' }}
                      </button>
                    </div>
                  </div>

                  <!-- Instrução -->
                  <p class="font-body text-sm text-zinc-500 text-center max-w-xs leading-relaxed">
                    Abra o app do seu banco, escolha Pix e escaneie o QR Code ou cole o código.
                  </p>
                </div>
              </div>

              <!-- ─── Boleto ─── -->
              <div v-else-if="state.selectedMethod === 'boleto'" class="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 sm:p-6">
                <h3 class="font-display text-base font-semibold text-[#2C1810] mb-5 flex items-center gap-2">
                  <FileText class="w-5 h-5 text-[#2d4a3e]" />
                  Pagamento via Boleto
                </h3>

                <!-- idle -->
                <div v-if="state.paymentStatus === 'idle'" class="flex justify-center py-4">
                  <button
                    class="px-8 py-3 bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body font-medium text-sm rounded-lg transition-colors duration-200"
                    @click="generateBoleto()"
                  >
                    Gerar Boleto
                  </button>
                </div>

                <!-- processing -->
                <div v-else-if="state.paymentStatus === 'processing'" class="flex flex-col items-center py-10 gap-3">
                  <svg class="w-8 h-8 animate-spin text-[#2d4a3e]" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <p class="font-body text-sm text-[#7A6355]">Gerando seu boleto...</p>
                </div>

                <!-- waiting -->
                <div v-else-if="state.paymentStatus === 'waiting' && state.boletoData" class="space-y-4">

                  <!-- Linha digitável -->
                  <div>
                    <p class="font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5">Código de barras</p>
                    <div class="flex gap-2">
                      <input
                        readonly
                        :value="state.boletoData.barcode"
                        class="flex-1 min-w-0 px-3 py-2.5 rounded-lg border border-zinc-200 bg-zinc-50 font-mono text-xs text-zinc-700 outline-none"
                      />
                      <button
                        class="flex-shrink-0 px-4 py-2.5 rounded-lg bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body text-xs font-medium transition-colors duration-200"
                        @click="handleCopyBoleto()"
                      >
                        {{ copiedBoleto ? 'Copiado!' : 'Copiar' }}
                      </button>
                    </div>
                  </div>

                  <!-- PDF e vencimento -->
                  <div class="flex flex-wrap items-center gap-4">
                    <a
                      href="#"
                      class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-zinc-200 font-body text-sm font-medium text-zinc-400 opacity-50 cursor-not-allowed pointer-events-none"
                    >
                      <FileText class="w-4 h-4" />
                      Baixar PDF do boleto
                    </a>
                    <p class="font-body text-sm text-zinc-500">
                      Vencimento: <span class="font-semibold text-[#2C1810]">{{ formatDate(state.boletoData.expires_at) }}</span>
                    </p>
                  </div>

                  <!-- Aviso -->
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3">
                    <p class="font-body text-sm text-yellow-800 leading-relaxed">
                      ⚠️ Seu pedido será confirmado após a compensação do boleto, em até 1 dia útil.
                    </p>
                  </div>
                </div>
              </div>

              <!-- ─── Cartão de Crédito ─── -->
              <div v-else-if="state.selectedMethod === 'credit_card'" class="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 sm:p-6">
                <h3 class="font-display text-base font-semibold text-[#2C1810] mb-5 flex items-center gap-2">
                  <CreditCard class="w-5 h-5 text-[#2d4a3e]" />
                  Cartão de Crédito
                </h3>

                <div class="relative">
                  <form class="space-y-4" @submit.prevent="submitCreditCard()">

                    <!-- Número do cartão -->
                    <div>
                      <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="card-number">
                        Número do cartão
                      </label>
                      <input
                        id="card-number"
                        :value="state.creditCardForm.number"
                        type="text"
                        inputmode="numeric"
                        placeholder="0000 0000 0000 0000"
                        maxlength="19"
                        autocomplete="cc-number"
                        class="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-zinc-400 focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                        @input="onCardNumberInput"
                      />
                    </div>

                    <!-- Nome no cartão -->
                    <div>
                      <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="card-holder">
                        Nome no cartão
                      </label>
                      <input
                        id="card-holder"
                        :value="state.creditCardForm.holder_name"
                        type="text"
                        placeholder="NOME COMO NO CARTÃO"
                        autocomplete="cc-name"
                        class="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-zinc-400 focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200 uppercase"
                        @input="onHolderNameInput"
                      />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                      <!-- Validade -->
                      <div>
                        <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="card-expiry">
                          Validade
                        </label>
                        <input
                          id="card-expiry"
                          :value="state.creditCardForm.expiry"
                          type="text"
                          inputmode="numeric"
                          placeholder="MM/AA"
                          maxlength="5"
                          autocomplete="cc-exp"
                          class="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-zinc-400 focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                          @input="onExpiryInput"
                        />
                      </div>

                      <!-- CVV -->
                      <div>
                        <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="card-cvv">
                          CVV
                        </label>
                        <input
                          id="card-cvv"
                          :value="state.creditCardForm.cvv"
                          type="text"
                          inputmode="numeric"
                          placeholder="000"
                          maxlength="4"
                          autocomplete="cc-csc"
                          class="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-zinc-400 focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                          @input="onCvvInput"
                        />
                      </div>
                    </div>

                    <!-- Parcelas -->
                    <div>
                      <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="card-installments">
                        Parcelas
                      </label>
                      <select
                        id="card-installments"
                        v-model="state.creditCardForm.installments"
                        class="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-[#FDFAF6] font-body text-sm text-[#2C1810] focus:outline-none focus:border-[#2d4a3e] focus:ring-1 focus:ring-[#2d4a3e] transition-all duration-200"
                      >
                        <option v-for="opt in installmentOptions" :key="opt.n" :value="opt.n">
                          {{ opt.n }}x de {{ formatBRL(opt.value) }}{{ opt.hasInterest ? ' (+juros)' : ' (sem juros)' }}
                        </option>
                      </select>
                    </div>

                    <!-- Erro de pagamento -->
                    <p v-if="state.paymentStatus === 'failed'" class="font-body text-sm text-red-600">
                      Pagamento recusado. Verifique os dados e tente novamente.
                    </p>

                    <!-- Submit -->
                    <button
                      type="submit"
                      :disabled="state.paymentStatus === 'processing'"
                      class="w-full py-3.5 bg-[#2d4a3e] hover:bg-[#1e3329] text-white font-body font-medium text-sm rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Finalizar pagamento
                    </button>

                    <!-- Tentar novamente -->
                    <button
                      v-if="state.paymentStatus === 'failed'"
                      type="button"
                      class="w-full py-3 border border-zinc-200 rounded-lg font-body text-sm text-[#7A6355] hover:border-[#2d4a3e] hover:text-[#2d4a3e] transition-colors duration-200"
                      @click="state.paymentStatus = 'idle'"
                    >
                      Tentar novamente
                    </button>

                  </form>

                  <!-- Overlay de processamento -->
                  <div
                    v-if="state.paymentStatus === 'processing'"
                    class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-3 z-10"
                  >
                    <svg class="w-9 h-9 animate-spin text-[#2d4a3e]" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <p class="font-body text-sm font-medium text-[#2C1810]">Analisando pagamento...</p>
                  </div>
                </div>
              </div>

            </template>
          </div>

          <!-- Coluna direita: Resumo do pedido -->
          <div class="order-1 lg:order-2 lg:sticky lg:top-24">
            <div class="bg-white rounded-xl border border-zinc-100 shadow-sm p-5">
              <h3 class="font-display text-sm font-semibold text-[#2C1810]">Resumo do pedido</h3>

              <div class="mt-4 pt-4 border-t border-zinc-100 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="font-body text-xs text-[#9A8070]">Pedido</span>
                  <span class="font-body text-sm font-semibold text-[#2C1810]">{{ orderNumber(state.order.id) }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="font-body text-xs text-[#9A8070]">Data</span>
                  <span class="font-body text-sm text-[#2C1810]">{{ formatDate(state.order.created_at) }}</span>
                </div>
                <div class="flex items-center justify-between pt-2 border-t border-zinc-100">
                  <span class="font-body text-sm font-semibold text-[#2C1810]">Total</span>
                  <span class="font-display text-lg font-bold text-[#2d4a3e]">{{ formatBRL(state.order.total_price) }}</span>
                </div>
              </div>

              <div class="mt-4 pt-4 border-t border-zinc-100 flex items-center gap-2">
                <Lock class="w-4 h-4 text-[#2d4a3e] flex-shrink-0" />
                <span class="font-body text-xs text-zinc-500">Pagamento 100% seguro</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Zap, FileText, CreditCard, Lock, QrCode } from 'lucide-vue-next'

definePageMeta({ layout: false })

useHead({ title: 'Pagamento — Quintal dos Mineiros' })

const route = useRoute()
const router = useRouter()

const {
  state,
  loadOrder,
  selectMethod,
  generatePix,
  generateBoleto,
  submitCreditCard,
  copyToClipboard,
} = usePayment()

// ─── Timer de expiração do Pix ───
const pixSecondsLeft = ref(0)
let pixInterval: ReturnType<typeof setInterval> | null = null

function startPixTimer() {
  if (pixInterval) clearInterval(pixInterval)
  if (!state.pixData) return
  pixSecondsLeft.value = Math.max(0, Math.floor((new Date(state.pixData.expires_at).getTime() - Date.now()) / 1000))
  pixInterval = setInterval(() => {
    pixSecondsLeft.value = Math.max(0, pixSecondsLeft.value - 1)
    if (pixSecondsLeft.value === 0 && pixInterval) {
      clearInterval(pixInterval)
      pixInterval = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (pixInterval) clearInterval(pixInterval)
})

// ─── Copied states ───
const copiedPix = ref(false)
const copiedBoleto = ref(false)

async function handleCopyPix() {
  if (!state.pixData) return
  await copyToClipboard(state.pixData.qr_code_text)
  copiedPix.value = true
  setTimeout(() => { copiedPix.value = false }, 2000)
}

async function handleCopyBoleto() {
  if (!state.boletoData) return
  await copyToClipboard(state.boletoData.barcode)
  copiedBoleto.value = true
  setTimeout(() => { copiedBoleto.value = false }, 2000)
}

// ─── Watch: timer Pix e redirecionamento pós-aprovação ───
watch(() => state.paymentStatus, async (status) => {
  if (status === 'waiting' && state.selectedMethod === 'pix') {
    startPixTimer()
  }
  if (status === 'approved') {
    await new Promise<void>(resolve => setTimeout(resolve, 500))
    navigateTo('/pedido-sucesso')
  }
})

// ─── Opções de parcelamento ───
const installmentOptions = computed(() => {
  const total = state.order?.total_price ?? 0
  return Array.from({ length: 12 }, (_, i) => {
    const n = i + 1
    const hasInterest = n > 6
    const r = 0.0249
    const value = hasInterest
      ? total * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      : total / n
    return { n, value, hasInterest }
  })
})

// ─── Helpers ───
function orderNumber(id: string): string {
  return '#' + id.slice(0, 8).toUpperCase()
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR')
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// ─── Máscaras de input do cartão ───
function onCardNumberInput(e: Event) {
  const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16)
  state.creditCardForm.number = digits.replace(/(.{4})/g, '$1 ').trim()
}

function onExpiryInput(e: Event) {
  const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4)
  state.creditCardForm.expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

function onCvvInput(e: Event) {
  state.creditCardForm.cvv = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 4)
}

function onHolderNameInput(e: Event) {
  state.creditCardForm.holder_name = (e.target as HTMLInputElement).value.toUpperCase()
}

// ─── Carrega pedido ao montar ───
onMounted(() => {
  loadOrder(route.params.orderId as string)
})
</script>
