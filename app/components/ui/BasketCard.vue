<script setup lang="ts">
// ─── BasketCard Component ───
// Cartão editorial de cesta-presente — foco comercial principal da página

import type { Basket } from '~/composables/useBaskets'

interface Props {
  basket: Basket
  featured?: boolean  // Destaca a cesta mais pedida com borda dourada
}

const props = withDefaults(defineProps<Props>(), { featured: false })
</script>

<template>
  <!-- Cartão editorial de cesta — variante featured com borda dourada -->
  <article
    :class="[
      'group relative rounded-3xl overflow-hidden card-hover cursor-pointer flex flex-col bg-white border',
      props.featured
        ? 'border-[#DE8402]/50 shadow-xl shadow-[#DE8402]/10'
        : 'border-[#E6CDA1]/40 shadow-sm',
    ]"
  >
    <!-- ─── Badge "Mais Pedida" ─── -->
    <div
      v-if="props.featured"
      class="absolute top-4 right-4 z-10 bg-[#DE8402] text-white
             text-xs font-body font-bold px-3 py-1.5 rounded-full
             uppercase tracking-wider shadow-md"
    >
      Mais Pedida
    </div>

    <!-- ─── Imagem da Cesta ─── -->
    <div class="relative overflow-hidden aspect-[16/10] flex-shrink-0">

      <!-- Foto editorial da cesta -->
      <img
        :src="basket.image"
        :alt="basket.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      <!-- Gradiente inferior para legibilidade -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent"
      />

      <!-- Badge de ocasião (ex: Natal, Aniversário) -->
      <BadgePill
        v-if="basket.occasion"
        :text="basket.occasion"
        color="white"
        class="absolute bottom-4 left-4"
      />
    </div>

    <!-- ─── Conteúdo da Cesta ─── -->
    <div class="p-6 flex flex-col flex-1">

      <!-- Tagline da cesta -->
      <span class="font-body text-xs font-semibold text-[#DE8402] tracking-[0.15em] uppercase">
        {{ basket.tagline }}
      </span>

      <!-- Nome da cesta — serif editorial -->
      <h3 class="font-display font-bold text-2xl text-[#2C1810] mt-2 leading-snug">
        {{ basket.name }}
      </h3>

      <!-- Descrição da cesta -->
      <p class="font-body text-sm text-[#7A6355] mt-3 leading-relaxed flex-1">
        {{ basket.description }}
      </p>

      <!-- ─── Tags dos Itens Inclusos ─── -->
      <!-- Mostra até 4 itens + contador do restante -->
      <div class="mt-4 flex flex-wrap gap-1.5">
        <span
          v-for="item in basket.items.slice(0, 4)"
          :key="item.name"
          class="font-body text-xs text-[#5C3D2E] bg-[#F5EDD8] px-3 py-1 rounded-full"
        >
          {{ item.icon }} {{ item.name }}
        </span>
        <span
          v-if="basket.items.length > 4"
          class="font-body text-xs text-[#7A6355] px-2 py-1 self-center"
        >
          +{{ basket.items.length - 4 }} itens
        </span>
      </div>

      <!-- ─── Preço e CTA ─── -->
      <div class="mt-5 pt-5 border-t border-[#E6CDA1]/60 flex items-center justify-between gap-4">

        <!-- Precificação com "a partir de" -->
        <div>
          <span class="font-body text-xs text-[#7A6355]">a partir de</span>
          <p class="font-display font-bold text-2xl text-[#DE8402] leading-none mt-0.5">
            {{ basket.price }}
          </p>
        </div>

        <!-- Botão de ação — variante destaque para cesta featured -->
        <button
          :class="[
            'flex-shrink-0 px-6 py-3 rounded-full font-body font-semibold text-sm',
            'transition-all duration-300 cursor-pointer',
            props.featured
              ? 'bg-[#DE8402] text-white hover:bg-[#C47502] shadow-md hover:shadow-lg'
              : 'border-2 border-[#DE8402] text-[#DE8402] hover:bg-[#DE8402] hover:text-white',
          ]"
        >
          Conhecer Kit
        </button>
      </div>
    </div>
  </article>
</template>
