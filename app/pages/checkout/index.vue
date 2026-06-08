<template>
  <div class="min-h-screen bg-[#F5EFE6]">

    <!-- Header -->
    <div class="bg-[#2F5946] sticky top-0 z-10 shadow-[0_2px_20px_rgba(44,24,16,0.2)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <!-- Logos -->
        <NuxtLink to="/" class="flex items-center gap-0">
          <img src="/images/logo_passarinho_2.png" alt="" class="h-10 w-auto" />
          <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-9 w-auto" />
        </NuxtLink>

        <!-- Título centralizado -->
        <span class="absolute left-1/2 -translate-x-1/2 font-display text-base font-semibold text-white">
          Finalizar Pedido
        </span>

        <!-- Voltar -->
        <button
          class="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 font-body text-sm group"
          @click="router.back()"
        >
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      </div>
    </div>

    <!-- Carrinho vazio -->
    <div v-if="items.length === 0" class="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div class="w-20 h-20 rounded-full bg-[#E7D7BC]/40 flex items-center justify-center mb-6">
        <svg class="w-9 h-9 text-[#B09A80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h2 class="font-display text-2xl font-semibold text-[#2C1810] mb-3">
        Sua cesta está vazia
      </h2>
      <p class="font-body text-[#7A6355] mb-8 max-w-xs leading-relaxed">
        Adicione produtos antes de finalizar o pedido.
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2F5946] hover:bg-[#254637] text-white font-body text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Ver catálogo
      </NuxtLink>
    </div>

    <!-- Checkout layout -->
    <div v-else class="max-w-5xl mx-auto px-4 sm:px-6 py-10 lg:py-14">

<!-- Título -->
      <div class="mb-8">
        <h1 class="font-display text-2xl font-semibold text-[#2C1810]">Checkout</h1>
        <p class="font-body text-sm text-[#7A6355] mt-1.5">Preencha seus dados e finalize seu pedido com segurança</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-10 items-start">

        <!-- COLUNA ESQUERDA: Formulário -->
        <div class="order-2 lg:order-1">
          <CheckoutForm @submitted="handleOrderSubmitted" />
        </div>

        <!-- COLUNA DIREITA: Resumo -->
        <div class="order-1 lg:order-2 lg:sticky lg:top-24">
          <CheckoutSummary />
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { items, clearCart } = useCart()

function handleOrderSubmitted(data: { orderId: string }) {
  clearCart()
  navigateTo(`/pagamento/${data.orderId}`)
}

useHead({
  title: 'Finalizar Pedido — Quintal dos Mineiros',
})
</script>
