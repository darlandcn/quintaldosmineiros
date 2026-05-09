<script setup lang="ts">
// ─── BasketCard Component ───
// Cartão editorial de cesta-presente — foco comercial principal da página

import type { Basket } from '~/composables/useBaskets'

interface Props {
  basket: Basket
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), { featured: false })

const showModal = ref(false)
</script>

<template>
  <article
    class="group relative overflow-hidden card-hover cursor-pointer flex flex-col bg-white border
           border-[#2F5946]/50 shadow-xl shadow-[#2F5946]/10"
    @click="showModal = true"
  >

    <!-- ─── Imagem da Cesta ─── -->
    <div class="relative overflow-hidden flex-shrink-0 aspect-square">
      <img
        :src="basket.image"
        :alt="basket.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#2C1810]/60 via-transparent to-transparent" />
    </div>

    <!-- ─── Conteúdo da Cesta ─── -->
    <div class="p-6 flex flex-col">

      <!-- Nome da cesta — serif editorial -->
      <h3 class="font-display font-bold text-2xl text-[#2C1810] mt-2 leading-snug text-center">
        {{ basket.name }}
      </h3>

      <!-- ─── Preço e CTA ─── -->
      <div class="mt-5 pt-5 border-t border-[#E7D7BC]/60 flex items-center justify-between gap-4">
        <p class="font-display font-bold text-2xl text-[#2F5946] leading-none">
          {{ basket.price }}
        </p>
        <button
          class="flex-shrink-0 px-6 py-3 font-body font-semibold text-sm
                 transition-all duration-300 cursor-pointer
                 bg-[#2F5946] text-white hover:bg-[#254637] shadow-md hover:shadow-lg"
          @click="showModal = true"
        >
          Conhecer Kit
        </button>
      </div>
    </div>
  </article>

  <!-- ─── Modal do Kit ─── -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2C1810]/60 backdrop-blur-sm"
        @click.self="showModal = false"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            v-if="showModal"
            class="relative bg-white w-full max-w-4xl flex overflow-hidden border border-[#2F5946]/50 shadow-xl shadow-[#2F5946]/10"
            style="height: 480px"
          >
            <!-- Botão fechar -->
            <button
              @click="showModal = false"
              class="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center
                     bg-white/90 hover:bg-white text-[#2C1810] transition-colors"
              aria-label="Fechar"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Esquerda: imagem -->
            <div class="w-1/2 flex-shrink-0 overflow-hidden">
              <img :src="basket.image" :alt="basket.name" class="w-full h-full object-cover" />
            </div>

            <!-- Divisória vertical -->
            <div class="w-px bg-[#2F5946]/20 flex-shrink-0" />

            <!-- Direita: conteúdo -->
            <div class="flex-1 flex flex-col p-8">

              <!-- Nome -->
              <h2 class="font-display font-bold text-2xl text-[#2C1810] leading-snug mb-6">
                {{ basket.name }}
              </h2>

              <!-- Itens inclusos -->
              <div class="flex-1">
                <span class="font-body text-xs font-semibold text-[#2F5946] tracking-[0.15em] uppercase">
                  O que está incluso
                </span>
                <ul class="mt-4 flex flex-col gap-2.5">
                  <li
                    v-for="item in basket.items"
                    :key="item.name"
                    class="font-body text-sm text-[#3D2B1F] flex items-center gap-2"
                  >
                    <span>{{ item.icon }}</span>
                    <span>{{ item.name }}</span>
                  </li>
                </ul>
              </div>

              <!-- Preço e CTA -->
              <div class="pt-6 border-t border-[#2F5946]/20">
                <p class="font-display font-bold text-3xl text-[#2F5946] leading-none mb-4">
                  {{ basket.price }}
                </p>
                <a
                  :href="`https://wa.me/5531999999999?text=Olá! Tenho interesse no kit ${basket.name}.`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center w-full px-8 py-3.5
                         bg-[#2F5946] hover:bg-[#254637] text-white
                         font-body font-semibold text-sm tracking-wide
                         transition-all duration-300"
                >
                  Fazer Pedido
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
