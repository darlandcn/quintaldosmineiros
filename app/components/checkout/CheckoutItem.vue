<template>
  <div class="flex items-center gap-3 py-3.5">

    <!-- Imagem -->
    <div class="w-[60px] h-[60px] flex-shrink-0 rounded-xl overflow-hidden bg-[#F5EFE6] border border-[#E7D7BC]/60">
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.name"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-2xl">
        {{ item.icon || '🌿' }}
      </div>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <p class="font-body text-sm font-semibold text-[#2C1810] leading-snug">
        {{ item.name }}
      </p>
      <p class="font-body text-xs text-[#9A8070] mt-1">
        Qtd: {{ item.quantity }}
      </p>
    </div>

    <!-- Preço total -->
    <p class="font-body text-sm font-semibold text-[#2C1810] flex-shrink-0">
      {{ itemTotalDisplay }}
    </p>

  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/composables/useCart'

const props = defineProps<{ item: CartItem }>()

const itemTotalDisplay = computed(() => {
  const total = props.item.price * props.item.quantity
  return `R$ ${total.toFixed(2).replace('.', ',')}`
})
</script>
