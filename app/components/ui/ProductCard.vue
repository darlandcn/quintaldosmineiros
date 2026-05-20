<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{ product: Product }>()
</script>

<template>
  <NuxtLink
    :to="`/produto/${product.id}`"
    class="group relative overflow-hidden card-hover cursor-pointer flex flex-col bg-white border
           border-[#2F5946]/50 shadow-xl shadow-[#2F5946]/10"
  >

    <!-- ─── Imagem do Produto ─── -->
    <div class="relative overflow-hidden flex-shrink-0 aspect-square">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        :class="product.stock <= 0 ? 'opacity-50' : ''"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent" />
      <div v-if="product.stock <= 0" class="absolute inset-0 flex items-center justify-center">
        <span class="bg-[#2C1810]/80 text-white font-body font-semibold text-xs tracking-widest uppercase px-4 py-1.5">
          Esgotado
        </span>
      </div>
    </div>

    <!-- ─── Conteúdo do Card ─── -->
    <div class="p-6 flex flex-col">

      <h3 class="font-display font-bold text-lg text-[#2C1810] mt-2 leading-snug text-center">
        {{ product.name }}
      </h3>

      <!-- ─── Preço e CTA ─── -->
      <div class="mt-5 pt-5 border-t border-[#E7D7BC]/60 flex items-center justify-between gap-4">
        <p class="font-display font-bold text-lg text-[#2F5946] leading-none">
          {{ product.price }}
        </p>
        <span
          class="flex-shrink-0 px-6 py-3 font-body font-semibold text-sm
                 transition-all duration-300
                 bg-[#2F5946] text-white group-hover:bg-[#254637] shadow-md group-hover:shadow-lg"
        >
          Ver Produto
        </span>
      </div>
    </div>

  </NuxtLink>
</template>
