<script setup lang="ts">
// ─── PremiumButton Component ───
// Botão de marca reutilizável com múltiplas variantes para CTAs comerciais

interface Props {
  variant?: 'primary' | 'outline' | 'ghost' | 'dark' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
  fullWidth?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
  disabled: false,
})

// ─── Mapeamento de Estilos por Variante ───
const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  primary:  'bg-[#DE8402] text-white hover:bg-[#C47502] shadow-sm hover:shadow-md',
  outline:  'border-2 border-[#DE8402] text-[#DE8402] hover:bg-[#DE8402] hover:text-white',
  ghost:    'text-[#DE8402] hover:bg-[#DE8402]/10',
  dark:     'bg-[#2C1810] text-white hover:bg-[#3D2B1F] shadow-sm hover:shadow-md',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#22c55e] shadow-sm hover:shadow-md',
}

// ─── Mapeamento de Tamanhos ───
const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  sm: 'px-5 py-2.5 text-sm gap-1.5',
  md: 'px-7 py-3.5 text-base gap-2',
  lg: 'px-9 py-4 text-lg gap-2.5',
}
</script>

<template>
  <!-- Botão premium — suporta modo link (href) ou botão nativo -->
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center',
      'font-body font-semibold tracking-wide rounded-full',
      'transition-all duration-300 ease-out cursor-pointer',
      'select-none focus:outline-none focus:ring-2 focus:ring-[#DE8402]/40',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
    ]"
  >
    <!-- Slot de ícone à esquerda -->
    <slot name="icon-left" />

    <!-- Label do botão -->
    <slot />

    <!-- Slot de ícone à direita -->
    <slot name="icon-right" />
  </component>
</template>
