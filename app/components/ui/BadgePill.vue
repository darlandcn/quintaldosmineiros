<script setup lang="ts">
// ─── BadgePill Component ───
// Pílula de badge para sinalizar status, origem ou destaque de produto

interface Props {
  text: string
  color?: 'primary' | 'forest' | 'wine' | 'neutral' | 'white'
}

const props = withDefaults(defineProps<Props>(), { color: 'primary' })

// ─── Mapeamento de Cores ───
const colorMap: Record<NonNullable<Props['color']>, string> = {
  primary: 'bg-[#2F5946]/15 text-[#3F6B56]',
  forest:  'bg-[#2F5946]/15 text-[#2F5946]',
  wine:    'bg-[#8C3B2A]/15 text-[#8C3B2A]',
  neutral: 'bg-[#E7D7BC]/50 text-[#7A6355]',
  white:   'bg-white/20 text-white backdrop-blur-sm',
}
</script>

<template>
  <!-- Badge pill com variantes de cor para contextos diferentes -->
  <span
    :class="[
      'inline-flex items-center px-3 py-1 rounded-full',
      'font-body text-xs font-semibold tracking-wide',
      colorMap[color],
    ]"
  >
    {{ text }}
  </span>
</template>
