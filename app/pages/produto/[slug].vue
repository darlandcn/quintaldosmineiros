<template>
  <div class="min-h-screen bg-[#FDFAF6]">
    <AppHeader compact />

    <main class="pt-[72px]">

      <!-- ─── Loading ─── -->
      <div v-if="loading" class="flex items-center justify-center py-40 gap-3 text-[#2F5946]/60">
        <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <span class="font-body text-sm">Carregando produto...</span>
      </div>

      <!-- ─── Produto não encontrado ─── -->
      <div v-else-if="error || !product" class="flex flex-col items-center justify-center py-40 gap-4 text-center px-4">
        <p class="font-display text-2xl font-bold text-[#2C1810]">Produto não encontrado</p>
        <p class="font-body text-sm text-[#3D2B1F]/60">O produto que você procura não está disponível.</p>
        <p v-if="error" class="font-body text-xs text-red-400 max-w-sm break-all">{{ error }}</p>
        <NuxtLink
          to="/"
          class="mt-2 px-6 py-3 rounded-xl font-body font-semibold text-sm bg-[#2F5946] text-white hover:bg-[#254637] transition-colors shadow-md"
        >
          Voltar ao início
        </NuxtLink>
      </div>

      <!-- ─── Conteúdo do produto ─── -->
      <template v-else>

        <!-- Wrapper com max-width -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <!-- Breadcrumb -->
          <nav class="py-5 flex items-center gap-2 font-body text-xs text-[#9A8070]">
            <NuxtLink to="/" class="hover:text-[#2F5946] transition-colors duration-200">Início</NuxtLink>
            <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <NuxtLink to="/#produtos" class="hover:text-[#2F5946] transition-colors duration-200">Produtos</NuxtLink>
            <svg class="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-[#2C1810] font-medium truncate max-w-[180px] sm:max-w-none">{{ product.name }}</span>
          </nav>

          <!-- ─── Grid principal: galeria + info ─── -->
          <div class="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 pb-16 border-b border-[#E7D7BC]">

            <!-- Coluna: galeria -->
            <ProductGallery :images="product.images" :name="product.name" />

            <!-- Coluna: informações + ações -->
            <div class="flex flex-col gap-8">
              <ProductInfo :product="product" @open-details="showDetails = true" />
              <ProductActions :product="product" />
            </div>

          </div>

        </div>

        <ProductDetailsModal v-model="showDetails" :product="product" />

        <!-- ─── Curadoria especial / Produtos relacionados ─── -->
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center mb-8">
            <p class="font-body text-[11px] font-semibold text-[#2F5946] tracking-widest uppercase mb-1">
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

          <!-- Ver todos -->
          <div class="mt-12 text-center">
            <NuxtLink
              to="/#produtos"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body text-sm font-semibold text-[#2F5946] hover:text-[#254637] transition-colors duration-200"
            >
              Ver todos os produtos
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>

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

const showDetails = ref(false)

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
