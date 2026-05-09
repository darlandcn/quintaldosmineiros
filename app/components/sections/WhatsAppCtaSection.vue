<script setup lang="ts">
// ─── WhatsAppCtaSection Component ───
// CTA final — convite humano e acolhedor para pedido via WhatsApp
// Tom pessoal e artesanal: como falar com um produtor de confiança

// ─── Diferenciais para Reforçar no CTA ───
const highlights = [
  { icon: '⚡', text: 'Resposta em minutos'     },
  { icon: '🎁', text: 'Embalagem personalizada' },
  { icon: '🚚', text: 'Entrega em todo o Brasil'},
  { icon: '❤️', text: 'Atendimento com carinho' },
]

// ─── Número do WhatsApp ───
const whatsappUrl = 'https://wa.me/5531999999999?text=Olá! Gostaria de fazer meu pedido no Quintal dos Mineiros.'
</script>

<template>
  <!-- CTA final — fundo escuro quente (marrom terra) para contraste e urgência suave -->
  <section class="relative bg-[#2C1810] py-24 md:py-32 overflow-hidden">

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

      <!-- ─── Título Principal do CTA ─── -->
      <h2 class="font-display font-bold text-white leading-tight mb-6">
        <span class="block text-3xl md:text-4xl lg:text-5xl">
          Pronto para provar
        </span>
        <span class="block text-4xl md:text-5xl lg:text-6xl italic text-[#2F5946] mt-1">
          o sabor de Minas?
        </span>
      </h2>

      <!-- ─── Texto Humano e Acolhedor ─── -->
      <p class="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
        Fale diretamente com a gente pelo WhatsApp. Sem burocracia, sem formulário complicado.
        Só você, nós e os melhores sabores de Minas Gerais.
      </p>

      <!-- ─── Grid de Diferenciais ─── -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
        <div
          v-for="highlight in highlights"
          :key="highlight.text"
          class="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/8 border border-white/10"
        >
          <span class="text-2xl" aria-hidden="true">{{ highlight.icon }}</span>
          <span class="font-body text-xs text-white/70 text-center leading-snug">
            {{ highlight.text }}
          </span>
        </div>
      </div>

      <!-- ─── Botão WhatsApp Principal ─── -->
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-3
               bg-[#25D366] text-white
               px-10 py-5 rounded-full
               font-body font-bold text-lg
               hover:bg-[#22c55e] hover:-translate-y-1
               transition-all duration-300
               shadow-xl hover:shadow-2xl shadow-[#25D366]/30"
      >
        <!-- Ícone WhatsApp -->
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Fazer Meu Pedido
      </a>

      <!-- ─── Número de Contato ─── -->
      <p class="font-body text-sm text-white/40 mt-5">
        (31) 9 9999-9999 · Seg a Sáb, 8h às 20h
      </p>
    </div>
  </section>
</template>
