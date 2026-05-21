<template>
  <div class="flex flex-col gap-5">

    <!-- Estrelas + avaliações -->
    <div class="flex items-center gap-2">
      <div class="flex items-center gap-0.5">
        <svg v-for="i in 5" :key="i" class="w-4 h-4 text-[#C9A46A]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      <span class="font-body text-xs text-[#9A8070]">4.9 · 127 avaliações</span>
    </div>

    <!-- Nome do produto -->
    <h1 class="font-display font-bold text-3xl md:text-4xl text-[#2C1810] leading-tight">
      {{ product.name }}
    </h1>

    <!-- Preço -->
    <div class="flex flex-col gap-0.5">
      <p class="font-body text-[11px] font-semibold text-[#9A8070] tracking-widest uppercase">Preço</p>
      <p class="font-display font-bold text-4xl text-[#2F5946] leading-none">
        {{ product.priceDisplay }}
      </p>
    </div>

    <!-- Descrição curta -->
    <p class="font-body text-base text-[#3D2B1F]/75 leading-relaxed border-t border-[#E7D7BC]/80 pt-5">
      {{ product.description }}
    </p>

  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/composables/useProduct'

defineProps<{
  product: ProductDetail
}>()
</script>
