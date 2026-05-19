<template>
  <div class="flex flex-col gap-6">

    <!-- Seletor de quantidade -->
    <div>
      <p class="font-body text-xs font-semibold text-[#2F5946] tracking-[0.15em] uppercase mb-3">
        Quantidade
      </p>
      <div class="flex items-center gap-0 w-fit border border-[#2F5946]/30">
        <button
          class="w-10 h-10 flex items-center justify-center text-[#2C1810] hover:bg-[#2F5946]/5 transition-colors font-body font-semibold"
          :disabled="qty <= 1"
          @click="qty--"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <span class="w-12 text-center font-body font-semibold text-[#2C1810] text-sm tabular-nums">
          {{ qty }}
        </span>
        <button
          class="w-10 h-10 flex items-center justify-center text-[#2C1810] hover:bg-[#2F5946]/5 transition-colors font-body font-semibold"
          @click="qty++"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row gap-3">
      <button
        class="flex-1 px-6 py-3.5 font-body font-semibold text-sm tracking-wide transition-all duration-300
               bg-[#2F5946] text-white hover:bg-[#254637] shadow-md hover:shadow-lg"
        @click="addToCart"
      >
        Adicionar ao Carrinho
      </button>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-body font-semibold text-sm tracking-wide
               border border-[#2F5946] text-[#2F5946] hover:bg-[#2F5946]/5 transition-all duration-300"
      >
        Comprar Agora
      </a>
    </div>

    <!-- Diferenciais artesanais -->
    <div class="grid grid-cols-2 gap-3 border-t border-[#E7D7BC] pt-5">
      <div v-for="item in differentials" :key="item.label" class="flex items-start gap-2.5">
        <span class="text-lg leading-none mt-0.5">{{ item.icon }}</span>
        <div>
          <p class="font-body font-semibold text-xs text-[#2C1810]">{{ item.label }}</p>
          <p class="font-body text-xs text-[#3D2B1F]/60 mt-0.5">{{ item.description }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/composables/useProduct'

const props = defineProps<{
  product: ProductDetail
}>()

const qty = ref(1)
const { addItem } = useCart()

const whatsappUrl = computed(() => {
  const text = encodeURIComponent(
    `Olá! Quero fazer um pedido: ${qty.value}x ${props.product.name}. Total: ${props.product.priceDisplay}.`
  )
  return `https://wa.me/5531999999999?text=${text}`
})

function addToCart() {
  for (let i = 0; i < qty.value; i++) {
    addItem({
      id: String(props.product.id),
      name: props.product.name,
      price: props.product.price,
      priceDisplay: props.product.priceDisplay,
      image: props.product.images[0] ?? undefined,
    })
  }
}

const differentials = [
  { icon: '🧺', label: 'Produção Artesanal', description: 'Feito em pequenos lotes com cuidado' },
  { icon: '🚚', label: 'Entrega para todo Brasil', description: 'Enviamos com embalagem especial' },
  { icon: '🌿', label: '100% Natural', description: 'Sem conservantes artificiais' },
  { icon: '⭐', label: 'Garantia de Qualidade', description: 'Satisfação garantida ou devolvemos' },
]
</script>
