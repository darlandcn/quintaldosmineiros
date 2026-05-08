<script setup lang="ts">
// ─── GoldDivider Component ───
// Separador decorativo dourado para divisões entre seções ou conteúdo

interface Props {
  width?: 'full' | 'sm' | 'md' | 'lg'
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 'full',
  opacity: 100,
})

// ─── Larguras Pré-definidas ───
const widthMap: Record<NonNullable<Props['width']>, string> = {
  full: 'w-full',
  sm:   'w-16',
  md:   'w-24',
  lg:   'w-40',
}
</script>

<template>
  <!-- Linha divisória com gradiente dourado da marca -->
  <div
    :class="['separator-gold my-2 mx-auto', widthMap[width]]"
    :style="{ opacity: opacity / 100 }"
    role="separator"
    aria-hidden="true"
  />
</template>
