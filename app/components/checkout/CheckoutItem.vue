<template>
  <div class="flex items-center gap-4 py-4">
    <!-- Imagem -->
    <div class="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#F5EFE6] border border-[#E7D7BC]/60">
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
      <p class="font-body text-sm font-medium text-[#2C1810] leading-snug truncate">
        {{ item.name }}
      </p>
      <p class="font-body text-xs text-[#7A6355] mt-0.5">
        Qtd: {{ item.quantity }}
      </p>
    </div>

    <!-- Preço -->
    <div class="text-right flex-shrink-0">
      <p class="font-body text-sm font-semibold text-[#2F5946]">
        {{ itemTotalDisplay }}
      </p>
      <p v-if="item.quantity > 1" class="font-body text-xs text-[#7A6355] mt-0.5">
        {{ item.priceDisplay }} / un
      </p>
    </div>
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
