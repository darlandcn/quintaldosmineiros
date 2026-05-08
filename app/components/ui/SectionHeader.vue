<script setup lang="ts">
// ─── SectionHeader Component ───
// Cabeçalho editorial reutilizável com eyebrow, título e subtítulo

interface Props {
  eyebrow?: string    // Rótulo pequeno acima do título
  title: string       // Título principal (suporta HTML via v-html)
  subtitle?: string   // Texto descritivo opcional
  align?: 'left' | 'center' | 'right'
  light?: boolean     // Modo claro para fundos escuros
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
  light: false,
})

// ─── Classes de Alinhamento ───
const alignClass: Record<NonNullable<Props['align']>, string> = {
  left:   'text-left items-start',
  center: 'text-center items-center',
  right:  'text-right items-end',
}
</script>

<template>
  <!-- Cabeçalho de seção editorial com eyebrow + linha decorativa + título -->
  <div :class="['flex flex-col gap-3', alignClass[align]]">

    <!-- Rótulo eyebrow com linha dourada decorativa -->
    <div v-if="eyebrow" :class="['flex items-center gap-3', align === 'center' ? 'justify-center' : '']">
      <div :class="['h-px w-8 flex-shrink-0', light ? 'bg-[#E6CDA1]/60' : 'bg-[#DE8402]/60']" />
      <span
        :class="[
          'font-body text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap',
          light ? 'text-[#E6CDA1]' : 'text-[#DE8402]',
        ]"
      >
        {{ eyebrow }}
      </span>
      <div :class="['h-px w-8 flex-shrink-0', light ? 'bg-[#E6CDA1]/60' : 'bg-[#DE8402]/60']" />
    </div>

    <!-- Título principal — tipografia serif editorial -->
    <h2
      :class="[
        'font-display font-semibold leading-tight',
        'text-3xl md:text-4xl lg:text-[2.75rem]',
        light ? 'text-white' : 'text-[#2C1810]',
      ]"
      v-html="title"
    />

    <!-- Subtítulo descritivo -->
    <p
      v-if="subtitle"
      :class="[
        'font-body max-w-2xl leading-relaxed mt-1',
        'text-base md:text-lg',
        light ? 'text-[#E6CDA1]/80' : 'text-[#7A6355]',
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
