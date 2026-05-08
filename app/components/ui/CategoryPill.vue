<script setup lang="ts">
// ─── CategoryPill Component ───
// Pílula de filtro para navegação de categorias do catálogo

interface Props {
  label: string
  icon?: string
  active?: boolean
}

withDefaults(defineProps<Props>(), { active: false })

const emit = defineEmits<{ click: [] }>()
</script>

<template>
  <!-- Pílula de categoria — estado ativo/inativo com transição suave -->
  <button
    @click="emit('click')"
    :class="[
      'inline-flex items-center gap-2 px-5 py-2.5 rounded-full',
      'font-body text-sm font-medium transition-all duration-200 cursor-pointer',
      'border focus:outline-none focus:ring-2 focus:ring-[#DE8402]/30',
      active
        ? 'bg-[#DE8402] text-white border-[#DE8402] shadow-sm'
        : 'bg-white text-[#7A6355] border-[#E6CDA1] hover:border-[#DE8402] hover:text-[#DE8402]',
    ]"
  >
    <span v-if="icon" aria-hidden="true">{{ icon }}</span>
    {{ label }}
  </button>
</template>
