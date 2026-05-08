<script setup lang="ts">
// ─── ProductCard Component ───
// Cartão editorial premium para o catálogo de produtos individuais

import type { Product } from '~/composables/useProducts'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const { addItem } = useCart()

function addToCart() {
  const numericPrice = parseFloat(
    props.product.price.replace('R$', '').replace(/\s/g, '').replace(',', '.'),
  )
  addItem({
    id: `product-${props.product.id}`,
    name: props.product.name,
    price: numericPrice,
    priceDisplay: props.product.price,
    image: props.product.image,
  })
}
</script>

<template>
  <!-- Cartão de produto — estilo editorial de catálogo gourmet -->
  <article
    class="group bg-white rounded-2xl overflow-hidden card-hover cursor-pointer border border-[#E6CDA1]/40 flex flex-col"
  >
    <!-- ─── Imagem do Produto ─── -->
    <div class="relative overflow-hidden aspect-[4/3] flex-shrink-0">

      <!-- Foto editorial do produto -->
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Sobreposição sutil ao hover -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#2C1810]/20 to-transparent
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <!-- Badge de destaque (ex: Favorito, Novo, Orgânico) -->
      <BadgePill
        v-if="product.badge"
        :text="product.badge"
        color="primary"
        class="absolute top-3 left-3 shadow-sm"
      />
    </div>

    <!-- ─── Informações do Produto ─── -->
    <div class="p-5 flex flex-col flex-1">

      <!-- Origem geográfica do produto -->
      <span
        v-if="product.origin"
        class="font-body text-xs font-semibold text-[#B95B27] tracking-wide uppercase"
      >
        {{ product.origin }}
      </span>

      <!-- Nome do produto — serif editorial -->
      <h3 class="font-display font-semibold text-lg text-[#2C1810] mt-1 leading-snug flex-1">
        {{ product.name }}
      </h3>

      <!-- Descrição breve do produto -->
      <p class="font-body text-sm text-[#7A6355] mt-2 leading-relaxed line-clamp-2">
        {{ product.description }}
      </p>

      <!-- ─── Linha de Preço e CTA ─── -->
      <div class="flex items-center justify-between mt-4 pt-4 border-t border-[#E6CDA1]/50">

        <!-- Preço em destaque -->
        <span class="font-display font-bold text-xl text-[#DE8402]">
          {{ product.price }}
        </span>

        <!-- Botão adicionar à cesta -->
        <button
          @click="addToCart"
          class="flex items-center gap-1.5 font-body text-sm font-semibold
                 text-[#DE8402] hover:text-white hover:bg-[#DE8402]
                 border border-[#DE8402]/40 hover:border-[#DE8402]
                 px-3 py-1.5 rounded-full transition-all duration-200"
          :aria-label="`Adicionar ${product.name} à cesta`"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 10C8.5 7 10 4.5 12 4.5S15.5 7 15.5 10"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18v5.5A5.5 5.5 0 0 1 15.5 21h-7A5.5 5.5 0 0 1 3 15.5V10z"/>
          </svg>
          Adicionar
        </button>
      </div>
    </div>
  </article>
</template>
