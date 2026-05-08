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
  primary: 'bg-[#DE8402]/15 text-[#B95B27]',
  forest:  'bg-[#2F5946]/15 text-[#2F5946]',
  wine:    'bg-[#962D20]/15 text-[#962D20]',
  neutral: 'bg-[#E6CDA1]/50 text-[#7A6355]',
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
