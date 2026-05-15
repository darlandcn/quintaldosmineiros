<script setup lang="ts">
const whatsappUrl = 'https://wa.me/5531999999999?text=Olá! Gostaria de fazer meu pedido no Quintal dos Mineiros.'
</script>

<template>
  <!-- CTA final — fundo escuro quente (marrom terra) para contraste e urgência suave -->
  <section class="relative bg-[#2F5946] py-14 md:py-20 overflow-hidden">

    <!-- ─── Decoração de Fundo: círculos suaves ─── -->
    <div
      class="absolute top-0 left-1/4 w-96 h-96 rounded-full
             bg-[#2F5946]/10 blur-3xl -translate-y-1/2"
      aria-hidden="true"
    />
    <div
      class="absolute bottom-0 right-1/4 w-72 h-72 rounded-full
             bg-[#3F6B56]/15 blur-3xl translate-y-1/2"
      aria-hidden="true"
    />

    <div class="relative max-w-4xl mx-auto px-5 md:px-8 text-center">

      <!-- ─── Eyebrow ─── -->
      <div class="flex items-center justify-center gap-3 mb-7">
        <div class="h-px w-8 bg-[#2F5946]/60" aria-hidden="true" />
        <span class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946]">
          Atendimento Personalizado
        </span>
        <div class="h-px w-8 bg-[#2F5946]/60" aria-hidden="true" />
      </div>

      <!-- Título -->
      <h2 class="font-display font-bold text-white leading-tight mb-6">
        <span class="block text-3xl md:text-4xl lg:text-5xl">
          Seu próximo café merece
        </span>
        <span class="block text-4xl md:text-5xl lg:text-6xl italic text-[#E7D7BC] mt-1">
          sabores de Minas.
        </span>
      </h2>

      <!-- Subtítulo -->
      <p class="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
        Cada cesta é montada com cuidado para transformar pequenos momentos em memórias especiais.
      </p>

      <!-- Botão -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center px-6 py-2
               bg-transparent hover:bg-white/10 text-white
               font-body text-xs font-semibold tracking-[0.15em] uppercase
               transition-all duration-300 border border-white/40 hover:border-white/70"
      >
        Atendimento personalizado
      </a>
    </div>
  </section>
</template>
