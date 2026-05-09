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
      'inline-flex items-center gap-2 px-5 py-2.5',
      'font-subheadline text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer',
      'border focus:outline-none',
      active
        ? 'bg-[#2F5946] text-white border-[#2F5946]'
        : 'bg-transparent text-[#2F5946] border-[#2F5946] hover:bg-[#2F5946] hover:text-white',
    ]"
  >
    {{ label }}
  </button>
</template>
