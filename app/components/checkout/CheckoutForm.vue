<template>
  <form class="bg-white rounded-2xl border border-[#E0CCAE]/70 shadow-sm overflow-hidden" @submit.prevent="handleSubmit">

    <!-- Seção 1: Dados Pessoais -->
    <div class="px-6 pt-6 pb-6">
      <div class="flex items-center gap-2.5 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] text-[#2F5946] flex-shrink-0"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
        <div>
          <h3 class="font-display text-sm font-semibold text-[#2C1810] leading-none">Dados Pessoais</h3>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Quem está realizando o pedido</p>
        </div>
      </div>

      <div class="space-y-4">
        <!-- Nome -->
        <div>
          <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="nome">
            Nome completo
          </label>
          <input
            id="nome"
            :value="form.nome"
            type="text"
            placeholder="Seu nome completo"
            required
            class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            @input="onNomeInput"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="email">
            E-mail
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="seu@email.com"
            required
            class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Telefone -->
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="telefone">
              WhatsApp
            </label>
            <input
              id="telefone"
              v-model="form.telefone"
              type="tel"
              placeholder="(00) 00000-0000"
              required
              class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            />
          </div>

          <!-- CPF -->
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="cpf">
              CPF
            </label>
            <input
              id="cpf"
              :value="form.cpf"
              type="text"
              inputmode="numeric"
              placeholder="000.000.000-00"
              maxlength="14"
              required
              class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
              @input="onCpfInput"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Divisória -->
    <div class="mx-6 border-t border-[#EDE0CA]/70" />

    <!-- Seção 2: Entrega -->
    <div class="px-6 pt-6 pb-6">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] text-[#2F5946] flex-shrink-0"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
          <div>
            <h3 class="font-display text-sm font-semibold text-[#2C1810] leading-none">Endereço de Entrega</h3>
            <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Para onde enviamos seu pedido</p>
          </div>
        </div>
        <!-- Botão alterar CEP -->
        <button
          v-if="cepFilled"
          type="button"
          class="font-body text-[11px] text-[#2F5946] hover:text-[#254637] underline underline-offset-2 transition-colors duration-150"
          @click="resetAddress"
        >
          Alterar CEP
        </button>
      </div>

      <div class="space-y-4">
        <!-- CEP -->
        <div>
          <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="cep">
            CEP
          </label>
          <div class="relative">
            <input
              id="cep"
              :value="address.cep"
              type="text"
              inputmode="numeric"
              placeholder="00000-000"
              maxlength="9"
              required
              :readonly="cepFilled"
              class="w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
              :class="cepFilled
                ? 'border-[#D8C9B4] bg-[#F5EFE6] text-[#7A6355] cursor-default'
                : 'border-[#D8C9B4] bg-[#FDFAF6] hover:border-[#8A7060] focus:border-[#2F5946]'"
              @input="onCepInput"
            />
            <div v-if="cepLoading" class="absolute right-3 top-1/2 -translate-y-1/2">
              <svg class="w-4 h-4 animate-spin text-[#2F5946]/50" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <div v-else-if="cepFilled" class="absolute right-3 top-1/2 -translate-y-1/2">
              <svg class="w-4 h-4 text-[#2F5946]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <p v-if="cepError" class="font-body text-[11px] text-red-600 mt-1.5">
            {{ cepError }}
          </p>
        </div>

        <!-- Rua -->
        <div>
          <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="rua">
            Rua / Logradouro
          </label>
          <input
            id="rua"
            v-model="address.rua"
            type="text"
            placeholder="Nome da rua"
            required
            :readonly="cepFilled"
            class="w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            :class="cepFilled
              ? 'border-[#D8C9B4] bg-[#F5EFE6] text-[#7A6355] cursor-default'
              : 'border-[#D8C9B4] bg-[#FDFAF6] hover:border-[#8A7060] focus:border-[#2F5946]'"
          />
        </div>

        <!-- Número + Complemento -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="numero">
              Número
            </label>
            <input
              id="numero"
              v-model="address.numero"
              type="text"
              placeholder="Ex: 123"
              required
              class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            />
          </div>
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="complemento">
              Complemento
              <span class="font-normal text-[#9A8070] normal-case tracking-normal">— opcional</span>
            </label>
            <input
              id="complemento"
              v-model="address.complemento"
              type="text"
              placeholder="Apto, bloco..."
              class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            />
          </div>
        </div>

        <!-- Bairro -->
        <div>
          <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="bairro">
            Bairro
          </label>
          <input
            id="bairro"
            v-model="address.bairro"
            type="text"
            placeholder="Nome do bairro"
            required
            :readonly="cepFilled"
            class="w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
            :class="cepFilled
              ? 'border-[#D8C9B4] bg-[#F5EFE6] text-[#7A6355] cursor-default'
              : 'border-[#D8C9B4] bg-[#FDFAF6] hover:border-[#8A7060] focus:border-[#2F5946]'"
          />
        </div>

        <!-- Cidade + Estado -->
        <div class="grid grid-cols-[1fr_88px] gap-4">
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="cidade">
              Cidade
            </label>
            <input
              id="cidade"
              v-model="address.cidade"
              type="text"
              placeholder="Nome da cidade"
              required
              :readonly="cepFilled"
              class="w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200"
              :class="cepFilled
                ? 'border-[#D8C9B4] bg-[#F5EFE6] text-[#7A6355] cursor-default'
                : 'border-[#D8C9B4] bg-[#FDFAF6] hover:border-[#8A7060] focus:border-[#2F5946]'"
            />
          </div>
          <div>
            <label class="block font-body text-[11px] font-semibold text-[#6B5649] uppercase tracking-wider mb-1.5" for="estado">
              Estado
            </label>
            <input
              id="estado"
              v-model="address.estado"
              type="text"
              placeholder="UF"
              maxlength="2"
              required
              :readonly="cepFilled"
              class="w-full px-4 py-3.5 rounded-xl border font-body text-sm text-[#2C1810] placeholder-[#C0AA94] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200 uppercase"
              :class="cepFilled
                ? 'border-[#D8C9B4] bg-[#F5EFE6] text-[#7A6355] cursor-default'
                : 'border-[#D8C9B4] bg-[#FDFAF6] hover:border-[#8A7060] focus:border-[#2F5946]'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Divisória -->
    <div class="mx-6 border-t border-[#EDE0CA]/70" />

    <!-- Seção 3: Observações -->
    <div class="px-6 pt-6 pb-6">
      <div class="flex items-center gap-2.5 mb-5">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[18px] h-[18px] text-[#2F5946] flex-shrink-0"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>
        <div>
          <h3 class="font-display text-sm font-semibold text-[#2C1810] leading-none">
            Observações
            <span class="font-body text-[11px] font-normal text-[#9A8070] ml-1">— opcional</span>
          </h3>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Instruções especiais, mensagem de presente...</p>
        </div>
      </div>

      <textarea
        id="obs"
        v-model="form.observacoes"
        rows="2"
        placeholder="Alguma instrução especial para o pedido?"
        class="w-full px-4 py-3.5 rounded-xl border border-[#D8C9B4] bg-[#FDFAF6] font-body text-sm text-[#2C1810] placeholder-[#C0AA94] hover:border-[#8A7060] focus:outline-none focus:border-[#2F5946] focus:ring-2 focus:ring-[#2F5946]/15 transition-all duration-200 resize-none leading-relaxed"
      />
    </div>

    <!-- CTA + erro -->
    <div class="px-6 pb-6 space-y-3">
      <!-- Erro -->
      <div
        v-if="errorMessage"
        class="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200"
      >
        <svg class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-body text-sm text-red-700 leading-relaxed">{{ errorMessage }}</p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full h-14 rounded-xl font-body text-sm font-semibold tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-2.5"
        :class="isSubmitting
          ? 'bg-[#2F5946]/50 cursor-not-allowed'
          : 'bg-[#2F5946] hover:bg-[#254637] shadow-[0_4px_20px_rgba(47,89,70,0.22)] hover:shadow-[0_6px_28px_rgba(47,89,70,0.32)] hover:-translate-y-px active:translate-y-0 active:shadow-md'"
      >
        <span v-if="isSubmitting" class="flex items-center gap-2">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Aguarde...
        </span>
        <template v-else>
          Avançar para Pagamento
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </template>
      </button>

      <p class="font-body text-xs text-[#9A8070] text-center flex items-center justify-center gap-1.5 pt-1">
        <svg class="w-3.5 h-3.5 text-[#2F5946]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Seus dados estão protegidos e seguros
      </p>
    </div>

  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { useCart } from '~/composables/useCart'
import { useSupabase } from '~/composables/useSupabase'

const emit = defineEmits<{
  submitted: [data: { orderId: string }]
}>()

const { items, totalPrice } = useCart()
const supabase = useSupabase()

const form = reactive({
  nome: '',
  telefone: '',
  email: '',
  cpf: '',
  endereco: '',
  observacoes: '',
})

// ── Endereço por CEP ───────────────────────────────────────────────────────────

const address = reactive({
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
})

const cepLoading = ref(false)
const cepError = ref<string | null>(null)
const cepFilled = ref(false)

watch(address, () => {
  const parts = [
    address.rua,
    address.numero ? `nº ${address.numero}` : '',
    address.complemento,
    address.bairro,
    address.cidade,
    address.estado,
    address.cep,
  ].filter(Boolean)
  form.endereco = parts.join(', ')
}, { deep: true })

function onNomeInput(e: Event) {
  const input = e.target as HTMLInputElement
  const pos = input.selectionStart
  form.nome = input.value.replace(/(?:^|\s)\S/g, c => c.toUpperCase())
  nextTick(() => input.setSelectionRange(pos, pos))
}

function onCpfInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 11)
  let masked = raw
  if (raw.length > 9) masked = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`
  else if (raw.length > 6) masked = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`
  else if (raw.length > 3) masked = `${raw.slice(0, 3)}.${raw.slice(3)}`
  form.cpf = masked
}

function onCepInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 8)
  address.cep = raw.length > 5 ? `${raw.slice(0, 5)}-${raw.slice(5)}` : raw
  cepError.value = null
  if (raw.length === 8) fetchCep(raw)
}

async function fetchCep(digits: string) {
  cepLoading.value = true
  cepFilled.value = false
  try {
    const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
    const data = await res.json()
    if (data.erro) {
      cepError.value = 'CEP não encontrado. Verifique e tente novamente.'
      return
    }
    address.rua = data.logradouro ?? ''
    address.bairro = data.bairro ?? ''
    address.cidade = data.localidade ?? ''
    address.estado = data.uf ?? ''
    cepFilled.value = true
    await nextTick()
    document.getElementById('numero')?.focus()
  } catch {
    cepError.value = 'Erro ao buscar CEP. Preencha o endereço manualmente.'
  } finally {
    cepLoading.value = false
  }
}

function resetAddress() {
  address.cep = ''
  address.rua = ''
  address.numero = ''
  address.complemento = ''
  address.bairro = ''
  address.cidade = ''
  address.estado = ''
  cepFilled.value = false
  cepError.value = null
  nextTick(() => document.getElementById('cep')?.focus())
}

// ── Submit (sem alterações) ────────────────────────────────────────────────────

const isSubmitting = ref(false)
const errorMessage = ref<string | null>(null)

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = null

  try {
    // 1. Valida estoque atual no banco antes de criar qualquer registro
    const productIds = items.value.map(i => i.id)
    const { data: stockData, error: stockError } = await supabase
      .from('products')
      .select('id, name, stock')
      .in('id', productIds)

    if (stockError) throw stockError

    const stockMap = Object.fromEntries((stockData ?? []).map(p => [p.id, p]))
    const unavailable = items.value.filter(item => {
      const product = stockMap[item.id]
      return !product || product.stock < item.quantity
    })

    if (unavailable.length > 0) {
      const names = unavailable.map(i => stockMap[i.id]?.name ?? i.name).join(', ')
      errorMessage.value = `Estoque insuficiente para: ${names}. Ajuste as quantidades no carrinho e tente novamente.`
      return
    }

    // 2. Cria o pedido
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: form.nome,
        customer_email: form.email,
        customer_phone: form.telefone,
        customer_document: form.cpf.replace(/\D/g, ''),
        customer_address: form.endereco,
        notes: form.observacoes || null,
        total_price: totalPrice.value,
        status: 'pending',
      })
      .select('id')
      .single()

    if (orderError) throw orderError

    // 3. Cria os itens do pedido
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(
        items.value.map(item => ({
          order_id: order.id,
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        }))
      )

    if (itemsError) throw itemsError

    // 4. Decrementa o estoque de cada produto
    await Promise.all(
      items.value.map(item => {
        const newStock = stockMap[item.id].stock - item.quantity
        if (newStock < 0) return Promise.resolve() // segurança extra
        return supabase
          .from('products')
          .update({ stock: newStock })
          .eq('id', item.id)
      })
    )

    emit('submitted', { orderId: order.id })
  } catch (e: unknown) {
    errorMessage.value = (e as Error)?.message ?? 'Erro ao finalizar pedido. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
