<template>
  <div class="flex flex-col gap-6">

    <!-- Sem estoque -->
    <div v-if="outOfStock" class="flex items-center gap-2.5 py-3 px-4 bg-[#F3EBDD] border border-[#E7D7BC]">
      <svg class="w-4 h-4 text-[#7A6355] shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p class="font-body text-sm text-[#7A6355]">
        Este produto está <span class="font-semibold text-[#2C1810]">esgotado</span> no momento.
      </p>
    </div>

    <!-- Seletor de quantidade -->
    <div v-if="!outOfStock">
      <p class="font-body text-xs font-semibold text-[#2F5946] tracking-[0.15em] uppercase mb-3">
        Quantidade
      </p>
      <div class="flex items-center gap-0 w-fit border border-[#2F5946]/30">
        <button
          class="w-10 h-10 flex items-center justify-center text-[#2C1810] hover:bg-[#2F5946]/5 transition-colors font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
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
          class="w-10 h-10 flex items-center justify-center text-[#2C1810] hover:bg-[#2F5946]/5 transition-colors font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
          :disabled="qty >= product.stock"
          @click="qty++"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <p v-if="qty >= product.stock" class="font-body text-xs text-[#7A6355] mt-2">
        Limite de estoque atingido ({{ product.stock }} un.)
      </p>
    </div>

    <!-- CTAs -->
    <div class="flex flex-col sm:flex-row gap-3">
      <button
        class="flex-1 px-6 py-3.5 font-body font-semibold text-sm tracking-wide transition-all duration-300
               bg-[#2F5946] text-white shadow-md
               disabled:bg-[#2F5946]/30 disabled:shadow-none disabled:cursor-not-allowed
               hover:enabled:bg-[#254637] hover:enabled:shadow-lg"
        :disabled="outOfStock"
        @click="addToCart"
      >
        Adicionar ao Carrinho
      </button>
      <button
        class="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 font-body font-semibold text-sm tracking-wide
               border border-[#2F5946] text-[#2F5946] transition-all duration-300
               disabled:border-[#2F5946]/30 disabled:text-[#2F5946]/30 disabled:cursor-not-allowed
               hover:enabled:bg-[#2F5946]/5"
        :disabled="outOfStock"
        @click="buyNow"
      >
        Comprar Agora
      </button>
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

const outOfStock = computed(() => props.product.stock <= 0)

function addToCart() {
  if (outOfStock.value) return
  addItem({
    id: String(props.product.id),
    name: props.product.name,
    price: props.product.price,
    priceDisplay: props.product.priceDisplay,
    stock: props.product.stock,
    image: props.product.images[0] ?? undefined,
  })
  if (qty.value > 1) {
    const remaining = Math.min(qty.value - 1, props.product.stock - 1)
    for (let i = 0; i < remaining; i++) {
      addItem({
        id: String(props.product.id),
        name: props.product.name,
        price: props.product.price,
        priceDisplay: props.product.priceDisplay,
        stock: props.product.stock,
        image: props.product.images[0] ?? undefined,
      })
    }
  }
}

function buyNow() {
  addToCart()
  navigateTo('/checkout')
}

const differentials = [
  { icon: '🧺', label: 'Produção Artesanal', description: 'Feito em pequenos lotes com cuidado' },
  { icon: '🚚', label: 'Entrega para todo Brasil', description: 'Enviamos com embalagem especial' },
  { icon: '🌿', label: '100% Natural', description: 'Sem conservantes artificiais' },
  { icon: '⭐', label: 'Garantia de Qualidade', description: 'Satisfação garantida ou devolvemos' },
]
</script>
