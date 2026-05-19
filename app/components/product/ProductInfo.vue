<template>
  <div class="flex flex-col gap-6">

    <!-- Badge -->
    <span
      v-if="product.badge"
      class="self-start px-3 py-1 text-xs font-semibold font-body tracking-widest uppercase bg-[#2F5946]/10 text-[#2F5946]"
    >
      {{ product.badge }}
    </span>

    <!-- Nome e origem -->
    <div>
      <h1 class="font-display font-bold text-3xl md:text-4xl text-[#2C1810] leading-snug">
        {{ product.name }}
      </h1>
      <p v-if="product.origin" class="mt-1 font-body text-sm text-[#2F5946]/70 tracking-wide">
        {{ product.origin }}
      </p>
    </div>

    <!-- Preço -->
    <p class="font-display font-bold text-3xl text-[#2F5946] leading-none">
      {{ product.priceDisplay }}
    </p>

    <!-- Descrição -->
    <p class="font-body text-base text-[#3D2B1F]/80 leading-relaxed border-t border-[#E7D7BC] pt-5">
      {{ product.description }}
    </p>

    <!-- Características -->
    <div v-if="product.characteristics?.length" class="border-t border-[#E7D7BC] pt-5">
      <p class="font-body text-xs font-semibold text-[#2F5946] tracking-[0.15em] uppercase mb-3">
        Características
      </p>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in product.characteristics"
          :key="item"
          class="font-body text-sm text-[#3D2B1F]"
        >
          {{ item }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/composables/useProduct'

defineProps<{
  product: ProductDetail
}>()
</script>
