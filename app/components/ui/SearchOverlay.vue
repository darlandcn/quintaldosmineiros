<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[96px] px-4"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div v-if="isOpen" class="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">

            <!-- Input -->
            <div class="flex items-center gap-3 px-4 py-3.5 border-b border-[#E7D7BC]/60">
              <svg class="w-5 h-5 text-[#9A8070] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                placeholder="Buscar produtos..."
                class="flex-1 font-body text-sm text-[#2C1810] placeholder-[#C0AA94] bg-transparent outline-none"
              />
              <button
                @click="emit('close')"
                class="text-[#9A8070] hover:text-[#2C1810] transition-colors ml-1"
                aria-label="Fechar busca"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Resultados -->
            <div class="max-h-[420px] overflow-y-auto">

              <!-- Carregando -->
              <div v-if="loading" class="flex items-center justify-center py-10 gap-2 text-[#9A8070]">
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                </svg>
                <span class="font-body text-sm">Buscando...</span>
              </div>

              <!-- Sem resultados -->
              <div v-else-if="query && results.length === 0" class="py-10 text-center">
                <p class="font-body text-sm text-[#9A8070]">Nenhum produto encontrado para "<strong class="text-[#2C1810]">{{ query }}</strong>"</p>
              </div>

              <!-- Estado inicial -->
              <div v-else-if="!query" class="py-8 text-center">
                <p class="font-body text-sm text-[#9A8070]">Digite para buscar produtos</p>
              </div>

              <!-- Lista de resultados -->
              <ul v-else class="divide-y divide-[#E7D7BC]/40">
                <li v-for="product in results" :key="product.id">
                  <NuxtLink
                    :to="`/produto/${product.id}`"
                    @click="emit('close')"
                    class="flex items-center gap-4 px-4 py-3.5 hover:bg-[#F5EFE6] transition-colors duration-150"
                  >
                    <!-- Miniatura -->
                    <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3EBDD]">
                      <img
                        v-if="product.image"
                        :src="product.image"
                        :alt="product.name"
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                      <p class="font-body text-sm font-semibold text-[#2C1810] truncate">{{ product.name }}</p>
                      <p class="font-body text-xs text-[#9A8070] truncate mt-0.5">{{ product.description }}</p>
                    </div>

                    <!-- Preço -->
                    <p class="font-display text-sm font-bold text-[#2F5946] flex-shrink-0">{{ product.price }}</p>
                  </NuxtLink>
                </li>
              </ul>

            </div>

          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useProducts } from '~/composables/useProducts'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ close: [] }>()

const query = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const { products, loading, fetchProducts } = useProducts()

const results = computed(() => {
  if (!query.value.trim()) return []
  const q = query.value.toLowerCase()
  return products.value.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  ).slice(0, 8)
})

watch(() => props.isOpen, async (open) => {
  if (open) {
    query.value = ''
    if (products.value.length === 0) fetchProducts()
    await nextTick()
    inputRef.value?.focus()
  }
})

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) emit('close')
  }
  window.addEventListener('keydown', onKey)
  onUnmounted(() => window.removeEventListener('keydown', onKey))
})
</script>
