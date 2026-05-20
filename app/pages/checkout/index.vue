<template>
  <div class="min-h-screen bg-[#FDFAF6]">
    <!-- Header da página -->
    <div class="border-b border-[#E7D7BC]/60 bg-[#FDFAF6]/80 backdrop-blur-sm sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-[#7A6355] hover:text-[#2C1810] transition-colors duration-200 font-body text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Continuar comprando
        </NuxtLink>

        <span class="font-display text-base font-semibold text-[#2C1810]">
          Finalizar Pedido
        </span>

        <!-- Logo placeholder / espaçador -->
        <div class="w-32" />
      </div>
    </div>

    <!-- Carrinho vazio -->
    <div v-if="items.length === 0" class="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div class="text-6xl mb-6">🛒</div>
      <h2 class="font-display text-2xl font-semibold text-[#2C1810] mb-3">
        Sua cesta está vazia
      </h2>
      <p class="font-body text-[#7A6355] mb-8 max-w-sm">
        Adicione produtos antes de finalizar o pedido.
      </p>
      <NuxtLink
        to="/catalogo"
        class="inline-flex items-center gap-2 px-6 py-3 bg-[#2F5946] hover:bg-[#254637] text-white font-body text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Ver catálogo
      </NuxtLink>
    </div>

    <!-- Checkout layout -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <!-- Título mobile -->
      <div class="mb-6 lg:hidden">
        <h1 class="font-display text-2xl font-semibold text-[#2C1810]">Checkout</h1>
        <p class="font-body text-sm text-[#7A6355] mt-1">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }} na cesta</p>
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
const { items, totalItems, clearCart } = useCart()

function handleOrderSubmitted(data: { nome: string }) {
  clearCart()
  navigateTo(`/pedido/sucesso?nome=${encodeURIComponent(data.nome.split(' ')[0] ?? data.nome)}`)
}

useHead({
  title: 'Finalizar Pedido — Quintal dos Mineiros',
})
</script>
