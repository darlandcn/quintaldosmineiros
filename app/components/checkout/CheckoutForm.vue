<template>
  <div class="bg-[#FDFAF6] border border-[#E7D7BC]/70 rounded-2xl overflow-hidden">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 border-b border-[#E7D7BC]/60">
      <h2 class="font-display text-xl font-semibold text-[#2C1810]">
        Seus Dados
      </h2>
      <p class="font-body text-sm text-[#7A6355] mt-1">
        Preencha para finalizar seu pedido
      </p>
    </div>

    <form class="px-6 py-6 space-y-5" @submit.prevent="handleSubmit">
      <!-- Nome -->
      <div class="space-y-1.5">
        <label class="font-body text-sm font-medium text-[#2C1810]" for="nome">
          Nome completo
        </label>
        <input
          id="nome"
          v-model="form.nome"
          type="text"
          placeholder="Seu nome"
          required
          class="w-full px-4 py-3 rounded-xl border border-[#E7D7BC] bg-white font-body text-sm text-[#2C1810] placeholder-[#C4B5A5] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/30 focus:border-[#2F5946] transition-colors duration-200"
        />
      </div>

      <!-- Telefone -->
      <div class="space-y-1.5">
        <label class="font-body text-sm font-medium text-[#2C1810]" for="telefone">
          Telefone / WhatsApp
        </label>
        <input
          id="telefone"
          v-model="form.telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          required
          class="w-full px-4 py-3 rounded-xl border border-[#E7D7BC] bg-white font-body text-sm text-[#2C1810] placeholder-[#C4B5A5] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/30 focus:border-[#2F5946] transition-colors duration-200"
        />
      </div>

      <!-- Email -->
      <div class="space-y-1.5">
        <label class="font-body text-sm font-medium text-[#2C1810]" for="email">
          E-mail
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="seu@email.com"
          required
          class="w-full px-4 py-3 rounded-xl border border-[#E7D7BC] bg-white font-body text-sm text-[#2C1810] placeholder-[#C4B5A5] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/30 focus:border-[#2F5946] transition-colors duration-200"
        />
      </div>

      <!-- Endereço -->
      <div class="space-y-1.5">
        <label class="font-body text-sm font-medium text-[#2C1810]" for="endereco">
          Endereço de entrega
        </label>
        <textarea
          id="endereco"
          v-model="form.endereco"
          rows="3"
          placeholder="Rua, número, bairro, cidade, estado"
          required
          class="w-full px-4 py-3 rounded-xl border border-[#E7D7BC] bg-white font-body text-sm text-[#2C1810] placeholder-[#C4B5A5] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/30 focus:border-[#2F5946] transition-colors duration-200 resize-none"
        />
      </div>

      <!-- Observações (opcional) -->
      <div class="space-y-1.5">
        <label class="font-body text-sm font-medium text-[#2C1810]" for="obs">
          Observações
          <span class="font-normal text-[#7A6355] ml-1">(opcional)</span>
        </label>
        <textarea
          id="obs"
          v-model="form.observacoes"
          rows="2"
          placeholder="Alguma informação adicional para o pedido?"
          class="w-full px-4 py-3 rounded-xl border border-[#E7D7BC] bg-white font-body text-sm text-[#2C1810] placeholder-[#C4B5A5] focus:outline-none focus:ring-2 focus:ring-[#2F5946]/30 focus:border-[#2F5946] transition-colors duration-200 resize-none"
        />
      </div>

      <!-- Separador -->
      <div class="separator-gold" />

      <!-- Botão finalizar -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-4 rounded-xl font-body text-sm font-semibold tracking-wide text-white transition-all duration-300 flex items-center justify-center gap-2"
        :class="isSubmitting
          ? 'bg-[#2F5946]/60 cursor-not-allowed'
          : 'bg-[#2F5946] hover:bg-[#254637] active:scale-[0.98] shadow-md hover:shadow-lg'"
      >
        <span v-if="isSubmitting">Processando...</span>
        <template v-else>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Finalizar Pedido
        </template>
      </button>

      <!-- Erro -->
      <div
        v-if="errorMessage"
        class="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200"
      >
        <svg class="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-body text-sm text-red-700">{{ errorMessage }}</p>
      </div>

      <!-- Segurança -->
      <p class="font-body text-xs text-[#7A6355] text-center flex items-center justify-center gap-1.5">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        Seus dados estão seguros
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  submitted: [data: { nome: string }]
}>()

const { items, totalPrice } = useCart()
const supabase = useSupabase()

const form = reactive({
  nome: '',
  telefone: '',
  email: '',
  endereco: '',
  observacoes: '',
})

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

    emit('submitted', { nome: form.nome })
  } catch (e: any) {
    errorMessage.value = e?.message ?? 'Erro ao finalizar pedido. Tente novamente.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
