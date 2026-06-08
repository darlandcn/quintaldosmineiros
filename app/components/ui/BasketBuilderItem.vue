<script setup lang="ts">
// ─── BasketBuilderItem Component ───
// Item selecionável do montador de cestas personalizado

import type { BuilderItem } from '~/shared/types'

interface Props {
  item: BuilderItem
  selected?: boolean
}

withDefaults(defineProps<Props>(), { selected: false })

const emit = defineEmits<{ toggle: [id: number] }>()
</script>

<template>
  <!-- Cartão de item selecionável — borda dourada quando ativo -->
  <button
    @click="emit('toggle', item.id)"
    :class="[
      'relative w-full text-left p-4',
      'border transition-all duration-200 cursor-pointer focus:outline-none',
      selected
        ? 'border-[#2F5946] bg-[#2F5946]/5 shadow-md'
        : 'border-[#2F5946]/50 bg-white hover:border-[#2F5946] hover:bg-[#FAF6EE]',
    ]"
    :aria-pressed="selected"
  >
    <!-- ─── Ícone de Selecionado ─── -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-50"
      enter-to-class="opacity-100 scale-100"
    >
      <div
        v-if="selected"
        class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#2F5946]
               flex items-center justify-center shadow-sm"
        aria-hidden="true"
      >
        <!-- Checkmark SVG -->
        <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </Transition>

    <!-- Emoji/ícone do item -->
    <span class="text-2xl block mb-1.5" aria-hidden="true">{{ item.icon }}</span>

    <!-- Nome do item -->
    <p class="font-body font-semibold text-sm text-[#2C1810] pr-6 leading-snug">
      {{ item.name }}
    </p>

    <!-- Descrição resumida -->
    <p class="font-body text-xs text-[#7A6355] mt-0.5 leading-snug">
      {{ item.description }}
    </p>

    <!-- Preço incremental do item -->
    <p class="font-display text-sm font-bold text-[#2F5946] mt-2">
      {{ item.priceDisplay }}
    </p>
  </button>
</template>
