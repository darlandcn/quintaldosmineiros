<template>
  <div class="bg-white rounded-2xl border border-[#E0CCAE]/70 shadow-sm overflow-hidden">

    <!-- Header -->
    <div class="px-5 py-4 border-b border-[#EDE0CA]/60 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <svg class="w-[18px] h-[18px] text-[#2F5946]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.048 18.566A2 2 0 004 21h16a2 2 0 001.952-2.434l-2-9A2 2 0 0018 8H6a2 2 0 00-1.952 1.566zM8 8V6a4 4 0 018 0v2" />
        </svg>
        <h2 class="font-display text-sm font-semibold text-[#2C1810]">Resumo do pedido</h2>
      </div>
      <span class="font-body text-xs text-[#9A8070]">{{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }}</span>
    </div>

    <!-- Itens -->
    <div class="px-5 divide-y divide-[#EDE0CA]/50">
      <CheckoutItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>

    <!-- Subtotal / Frete -->
    <div class="px-5 pt-3 pb-4 space-y-2 border-t border-[#EDE0CA]/60">
      <div class="flex justify-between items-center">
        <span class="font-body text-sm text-[#7A6355]">Subtotal</span>
        <span class="font-body text-sm text-[#2C1810]">{{ totalPriceDisplay }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="font-body text-sm text-[#7A6355]">Frete</span>
        <span class="font-body text-sm text-[#2F5946] font-medium">A calcular</span>
      </div>
    </div>

    <!-- Total -->
    <div class="px-5 pt-4 pb-3 border-t border-[#D8C9B4]/80">
      <div class="flex justify-between items-center">
        <span class="font-display text-sm font-semibold text-[#2C1810]">Total estimado</span>
        <span class="font-display text-xl font-bold text-[#2F5946]">{{ totalPriceDisplay }}</span>
      </div>
      <p class="font-body text-[11px] text-[#9A8070] mt-2 leading-relaxed">
        O valor do frete será confirmado no próximo passo.
      </p>
    </div>

    <!-- Separador -->
    <div class="mx-5 border-t border-[#EDE0CA]/70" />

    <!-- Trust signals -->
    <div class="px-4 py-4">
      <div class="grid grid-cols-4 gap-2">

        <div class="flex flex-col items-center text-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#2F5946]/70"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
          <div>
            <p class="font-body text-[10px] font-semibold text-[#2C1810] leading-snug">Entrega segura</p>
            <p class="font-body text-[10px] text-[#9A8070] leading-snug">Para todo o Brasil</p>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-1.5">
          <svg class="w-5 h-5 text-[#2F5946]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div>
            <p class="font-body text-[10px] font-semibold text-[#2C1810] leading-snug">Produtos artesanais</p>
            <p class="font-body text-[10px] text-[#9A8070] leading-snug">Feitos com carinho</p>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-1.5">
          <svg class="w-5 h-5 text-[#2F5946]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <p class="font-body text-[10px] font-semibold text-[#2C1810] leading-snug">Compra protegida</p>
            <p class="font-body text-[10px] text-[#9A8070] leading-snug">Seus dados seguros</p>
          </div>
        </div>

        <div class="flex flex-col items-center text-center gap-1.5">
          <svg class="w-5 h-5 text-[#2F5946]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <div>
            <p class="font-body text-[10px] font-semibold text-[#2C1810] leading-snug">Satisfação garantida</p>
            <p class="font-body text-[10px] text-[#9A8070] leading-snug">Ou reembolsamos de volta</p>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
const { items, totalItems, totalPriceDisplay } = useCart()
</script>
