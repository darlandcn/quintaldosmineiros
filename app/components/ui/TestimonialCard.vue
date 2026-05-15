<script setup lang="ts">
// ─── TestimonialCard Component ───
// Cartão de depoimento elegante com avaliação por estrelas e toque pessoal

import type { Testimonial } from '~/composables/useTestimonials'

interface Props {
  testimonial: Testimonial
}

defineProps<Props>()
</script>

<template>
  <!-- Cartão de depoimento — estilo editorial cálido -->
  <figure
    class="bg-white rounded-2xl p-7 shadow-sm border border-[#2F5946]/30 flex flex-col gap-5 h-full"
  >
    <!-- ─── Avaliação por Estrelas ─── -->
    <div class="flex items-center gap-1" aria-label="Avaliação: 5 de 5 estrelas">
      <span
        v-for="i in 5"
        :key="i"
        :class="i <= testimonial.rating ? 'text-[#2F5946]' : 'text-[#E7D7BC]'"
        aria-hidden="true"
      >★</span>
    </div>

    <!-- Rótulo da ocasião (ex: Natal em Família) -->
    <BadgePill
      v-if="testimonial.occasion"
      :text="testimonial.occasion"
      color="neutral"
      class="-mt-2 self-start"
    />

    <!-- ─── Texto do Depoimento ─── -->
    <!-- Citação em itálico — tipografia serif para elegância -->
    <blockquote class="font-display italic text-lg text-[#3D2B1F] leading-relaxed flex-1">
      "{{ testimonial.text }}"
    </blockquote>

    <!-- ─── Identificação do Autor ─── -->
    <figcaption class="flex items-center gap-3 pt-4 border-t border-[#E7D7BC]/50">

      <!-- Avatar com inicial do nome -->
      <div
        class="w-11 h-11 rounded-full bg-[#F3EBDD] flex items-center justify-center flex-shrink-0"
        aria-hidden="true"
      >
        <span class="font-display font-semibold text-[#2F5946] text-lg">
          {{ testimonial.name.charAt(0) }}
        </span>
      </div>

      <!-- Nome e localização -->
      <div>
        <p class="font-body font-semibold text-[#2C1810] text-sm">{{ testimonial.name }}</p>
        <p class="font-body text-xs text-[#7A6355]">{{ testimonial.location }}</p>
      </div>
    </figcaption>
  </figure>
</template>
