<template>
  <div class="flex flex-col gap-5">

    <!-- Sem estoque -->
    <div v-if="outOfStock" class="flex items-center gap-3 py-3.5 px-4 bg-[#F3EBDD] border border-[#E7D7BC] rounded-xl">
      <svg class="w-4 h-4 text-[#7A6355] shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p class="font-body text-sm text-[#7A6355]">
        Este produto está <span class="font-semibold text-[#2C1810]">esgotado</span> no momento.
      </p>
    </div>

    <!-- Seletor de quantidade -->
    <div v-if="!outOfStock">
      <p class="font-body text-[11px] font-semibold text-[#9A8070] tracking-widest uppercase mb-3">Quantidade</p>
      <div class="flex items-center gap-4">
        <div class="flex items-center border border-[#E7D7BC] rounded-xl overflow-hidden w-fit">
          <button
            class="w-11 h-11 flex items-center justify-center text-[#2C1810] hover:bg-[#F5EFE6] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="qty <= 1"
            @click="qty--"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <span class="w-12 text-center font-body font-bold text-[#2C1810] text-base tabular-nums border-x border-[#E7D7BC]">
            {{ qty }}
          </span>
          <button
            class="w-11 h-11 flex items-center justify-center text-[#2C1810] hover:bg-[#F5EFE6] transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            :disabled="qty >= product.stock"
            @click="qty++"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <p v-if="qty >= product.stock" class="font-body text-xs text-[#9A8070]">
          Limite de estoque ({{ product.stock }} un.)
        </p>
      </div>
    </div>

    <!-- Botões de ação -->
    <div class="flex flex-col sm:flex-row gap-3 pt-1">

      <!-- Adicionar ao Carrinho -->
      <button
        class="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl
               font-body font-semibold text-sm tracking-wide transition-all duration-300
               bg-[#2F5946] text-white
               shadow-[0_4px_20px_rgba(47,89,70,0.22)]
               disabled:bg-[#2F5946]/30 disabled:shadow-none disabled:cursor-not-allowed
               hover:enabled:bg-[#254637] hover:enabled:shadow-[0_6px_28px_rgba(47,89,70,0.32)] hover:enabled:-translate-y-px active:translate-y-0"
        :disabled="outOfStock"
        @click="addToCart"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2.048 18.566A2 2 0 004 21h16a2 2 0 001.952-2.434l-2-9A2 2 0 0018 8H6a2 2 0 00-1.952 1.566z"/>
          <path d="M8 11V6a4 4 0 018 0v5"/>
        </svg>
        Adicionar ao Carrinho
      </button>

      <!-- Comprar Agora -->
      <button
        class="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl
               font-body font-semibold text-sm tracking-wide transition-all duration-300
               border-2 border-[#2F5946] text-[#2F5946] bg-white
               disabled:border-[#2F5946]/30 disabled:text-[#2F5946]/30 disabled:cursor-not-allowed
               hover:enabled:bg-[#2F5946]/5 hover:enabled:-translate-y-px active:translate-y-0"
        :disabled="outOfStock"
        @click="buyNow"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Comprar Agora
      </button>
    </div>

    <!-- Diferenciais com SVG -->
    <div class="grid grid-cols-2 gap-3 border-t border-[#E7D7BC] pt-5">

      <!-- Produção Artesanal -->
      <div class="flex items-start gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#2F5946]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <p class="font-body font-semibold text-xs text-[#2C1810]">Produção Artesanal</p>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Feito em pequenos lotes</p>
        </div>
      </div>

      <!-- Entrega para todo Brasil -->
      <div class="flex items-start gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#2F5946]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2M15 18H9m10 0h2a1 1 0 001-1v-3.65a1 1 0 00-.22-.624l-3.48-4.35A1 1 0 0017.52 8H14M17 18a2 2 0 100 4 2 2 0 000-4zm-10 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <div>
          <p class="font-body font-semibold text-xs text-[#2C1810]">Entrega para todo Brasil</p>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Embalagem especial</p>
        </div>
      </div>

      <!-- 100% Natural -->
      <div class="flex items-start gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#2F5946]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div>
          <p class="font-body font-semibold text-xs text-[#2C1810]">100% Natural</p>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Sem conservantes</p>
        </div>
      </div>

      <!-- Garantia de Qualidade -->
      <div class="flex items-start gap-2.5">
        <div class="w-8 h-8 rounded-full bg-[#2F5946]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <div>
          <p class="font-body font-semibold text-xs text-[#2C1810]">Garantia de Qualidade</p>
          <p class="font-body text-[11px] text-[#9A8070] mt-0.5">Satisfação garantida</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/shared/types'

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
</script>
