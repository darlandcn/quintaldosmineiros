<script setup lang="ts">
// ─── TestimonialsSection Component ───
// Seção de depoimentos — prova social elegante com cartões editoriais
// Exibe o amor dos clientes em formato empático e autêntico

// ─── Depoimentos via Composable ───
const { testimonials } = useTestimonials()
</script>

<template>
  <!-- Seção de depoimentos — fundo creme quente -->
  <section id="depoimentos" class="bg-[#F3EBDD] py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho da Seção ─── -->
      <div class="mb-14 md:mb-16">
        <SectionHeader
          eyebrow="O que dizem nossos clientes"
          title="Histórias de quem<br /><em>já provou de Minas</em>"
          subtitle="Mais de 2.000 cestas entregues. Cada uma com uma história de carinho por trás."
          align="center"
        />
      </div>

      <!-- ─── Grade de Depoimentos ─── -->
      <!-- 1 coluna mobile → 2 colunas tablet → 4 colunas desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>

      <!-- ─── Indicador de Confiança Agregado ─── -->
      <!-- Barra de estrelas e contagem total -->
      <div class="mt-14 flex flex-col items-center gap-4">
        <div class="flex items-center gap-1.5" aria-label="Avaliação média: 5 estrelas">
          <span
            v-for="i in 5"
            :key="i"
            class="text-[#2F5946] text-2xl"
            aria-hidden="true"
          >★</span>
        </div>
        <p class="font-display italic text-lg text-[#7A6355]">
          Avaliação 5.0 com mais de 500 avaliações verificadas
        </p>
      </div>
    </div>
  </section>
</template>
