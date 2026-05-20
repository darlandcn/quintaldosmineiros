<template>
  <div class="bg-[#FDFAF6] border border-[#E7D7BC]/70 rounded-2xl overflow-hidden">
    <!-- Header -->
    <div class="px-6 pt-6 pb-4 border-b border-[#E7D7BC]/60">
      <h2 class="font-display text-xl font-semibold text-[#2C1810]">
        Resumo do Pedido
      </h2>
      <p class="font-body text-sm text-[#7A6355] mt-1">
        {{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }}
      </p>
    </div>

    <!-- Itens -->
    <div class="px-6 divide-y divide-[#E7D7BC]/50">
      <CheckoutItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Separador decorativo -->
    <div class="mx-6 my-1">
      <div class="separator-gold" />
    </div>

    <!-- Totais -->
    <div class="px-6 py-5 space-y-3">
      <div class="flex justify-between items-center">
        <span class="font-body text-sm text-[#7A6355]">Subtotal</span>
        <span class="font-body text-sm text-[#2C1810]">{{ totalPriceDisplay }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-body text-sm text-[#7A6355]">Frete</span>
        <span class="font-body text-sm text-[#2F5946] font-medium">A combinar</span>
      </div>
      <div class="pt-3 border-t border-[#E7D7BC]/60 flex justify-between items-center">
        <span class="font-display text-base font-semibold text-[#2C1810]">Total estimado</span>
        <span class="font-display text-lg font-bold text-[#2F5946]">{{ totalPriceDisplay }}</span>
      </div>
    </div>

    <!-- Nota -->
    <div class="px-6 pb-6">
      <p class="font-body text-xs text-[#7A6355] text-center leading-relaxed">
        O valor do frete será confirmado após o contato.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { items, totalItems, totalPriceDisplay } = useCart()
</script>
