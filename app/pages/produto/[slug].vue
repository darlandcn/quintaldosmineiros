<template>
  <div class="min-h-screen bg-[#FDFAF6]">
    <AppHeader compact />

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- Breadcrumb -->
      <nav class="mb-8 flex items-center gap-2 font-body text-sm text-[#3D2B1F]/50">
        <NuxtLink to="/" class="hover:text-[#2F5946] transition-colors">Início</NuxtLink>
        <span>/</span>
        <span class="text-[#2C1810]">{{ product?.name ?? 'Produto' }}</span>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-32 gap-3 text-[#2F5946]/60">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span class="font-body text-sm">Carregando produto...</span>
      </div>

      <!-- Produto não encontrado -->
      <div v-else-if="error || !product" class="flex flex-col items-center justify-center py-32 gap-4 text-center">
        <p class="font-display text-2xl font-bold text-[#2C1810]">Produto não encontrado</p>
        <p class="font-body text-sm text-[#3D2B1F]/60">O produto que você procura não está disponível.</p>
        <!-- diagnóstico — remover após corrigir -->
        <p v-if="error" class="font-body text-xs text-red-400 max-w-sm break-all">{{ error }}</p>
        <NuxtLink
          to="/"
          class="mt-2 px-6 py-3 font-body font-semibold text-sm bg-[#2F5946] text-white hover:bg-[#254637] transition-colors"
        >
          Voltar ao início
        </NuxtLink>
      </div>

      <!-- Conteúdo do produto -->
      <template v-else>

        <!-- Grid principal: galeria + info -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery :images="product.images" :name="product.name" />
          <div class="flex flex-col gap-8">
            <ProductInfo :product="product" />
            <ProductActions :product="product" />
          </div>
        </div>

        <!-- Você também pode gostar -->
        <section class="mt-20 border-t border-[#E7D7BC] pt-12">
          <div class="mb-8">
            <p class="font-body text-xs font-semibold text-[#2F5946] tracking-[0.15em] uppercase mb-1">
              Curadoria Especial
            </p>
            <h2 class="font-display font-bold text-2xl text-[#2C1810]">
              Você também pode gostar
            </h2>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <ProductCard
              v-for="p in suggestions"
              :key="p.id"
              :product="p"
            />
          </div>
        </section>

      </template>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useProduct } from '~/composables/useProduct'
import { useProducts } from '~/composables/useProducts'

definePageMeta({ layout: false })

const route = useRoute()
const productId = route.params.slug as string

const { product, loading, error, fetchProduct } = useProduct(productId)

const { products, fetchProducts: fetchSuggestions } = useProducts()
const suggestions = computed(() =>
  products.value.filter(p => p.id !== productId).slice(0, 4)
)

useSeoMeta({
  title: computed(() => product.value ? `${product.value.name} | Quintal dos Mineiros` : 'Quintal dos Mineiros'),
  description: computed(() => product.value?.description ?? ''),
})

onMounted(() => {
  fetchProduct()
  fetchSuggestions()
})
</script>
