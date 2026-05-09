<script setup lang="ts">
// ─── BrandStorySection Component ───
// Seção de storytelling emocional da marca — tradição, artesanato e hospitalidade mineira
// Layout dividido: texto à esquerda, imagem editorial à direita

// ─── Pilares da Marca ───
// Valores visuais apresentados como cartões compactos
const pillars = [
  {
    icon: '🌿',
    title: 'Origem Rastreada',
    description: 'Cada produto vem diretamente de produtores artesanais certificados de Minas Gerais.',
  },
  {
    icon: '🤝',
    title: 'Seleção Curada',
    description: 'Visitamos feiras, fazendas e cooperativas para escolher apenas o que tem qualidade real.',
  },
  {
    icon: '📦',
    title: 'Entrega com Cuidado',
    description: 'Embalamos cada cesta com carinho, garantindo que o presente chegue perfeito.',
  },
  {
    icon: '💛',
    title: 'Sabor Autêntico',
    description: 'Sem industrialização, sem atalhos. Só o sabor genuíno que Minas sempre soube fazer.',
  },
]
</script>

<template>
  <!-- Seção de história da marca — fundo creme quente e atmosfera acolhedora -->
  <section id="historia" class="bg-[#FAF6EE] py-24 md:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Layout de Duas Colunas ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- ─── Coluna de Texto ─── -->
        <div class="order-2 lg:order-1">

          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-6">
            <div class="h-px w-8 bg-[#2F5946]/60" aria-hidden="true" />
            <span class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946]">
              Nossa História
            </span>
          </div>

          <!-- Título emocional da história -->
          <h2 class="font-display font-semibold text-[#2C1810] text-3xl md:text-4xl lg:text-[2.6rem] leading-tight mb-6">
            Nascemos do amor<br />
            <em>pelos sabores de Minas</em>
          </h2>

          <!-- Texto narrativo da marca — dois parágrafos emocionais -->
          <div class="space-y-5 mb-8">
            <p class="font-body text-base md:text-lg text-[#7A6355] leading-relaxed">
              O Quintal dos Mineiros nasceu de uma mesa — dessas mesas fartas de família mineira,
              com queijo fresco, doce de leite feito em casa, café forte e biscoito de polvilho
              ainda quente. Nasceu do desejo de guardar aquele sabor e compartilhá-lo com o Brasil.
            </p>
            <p class="font-body text-base md:text-lg text-[#7A6355] leading-relaxed">
              Selecionamos diretamente de produtores artesanais que carregam décadas de tradição.
              Cada produto que chega até você passou pela nossa cozinha, nossa prova de sabor e
              nosso coração. Porque acreditamos que um presente verdadeiro tem gosto de história.
            </p>
          </div>

          <!-- ─── Pilares da Marca ─── -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div
              v-for="pillar in pillars"
              :key="pillar.title"
              class="flex items-start gap-3 p-4 rounded-2xl bg-[#F3EBDD]"
            >
              <!-- Ícone do pilar -->
              <span class="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{{ pillar.icon }}</span>
              <div>
                <p class="font-body font-semibold text-sm text-[#2C1810]">{{ pillar.title }}</p>
                <p class="font-body text-xs text-[#7A6355] mt-0.5 leading-relaxed">{{ pillar.description }}</p>
              </div>
            </div>
          </div>

          <!-- CTA da história -->
          <a
            href="https://wa.me/5531999999999?text=Olá! Quero conhecer mais sobre o Quintal dos Mineiros."
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-[#2F5946] text-white
                   px-8 py-4 rounded-full font-body font-semibold text-base
                   hover:bg-[#254637] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Conheça nossa seleção
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </div>

        <!-- ─── Coluna de Imagem Editorial ─── -->
        <div class="order-1 lg:order-2 relative">

          <!-- Imagem principal — composição editorial atmosférica -->
          <div class="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80"
              alt="Produtos artesanais mineiros: queijo, doce de leite e café especial"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <!-- Sobreposição sutil de cor quente -->
            <div
              class="absolute inset-0 bg-gradient-to-br from-[#2F5946]/10 to-transparent mix-blend-multiply"
            />
          </div>

          <!-- Card flutuante de estatísticas da marca -->
          <div
            class="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl
                   border border-[#E7D7BC]/50 hidden sm:block"
          >
            <p class="font-body text-xs text-[#2F5946] font-semibold tracking-wide uppercase mb-3">
              Em números
            </p>
            <div class="flex items-center gap-5">
              <div class="text-center">
                <p class="font-display font-bold text-2xl text-[#2C1810]">+50</p>
                <p class="font-body text-xs text-[#7A6355]">produtores</p>
              </div>
              <div class="w-px h-8 bg-[#E7D7BC]" aria-hidden="true" />
              <div class="text-center">
                <p class="font-display font-bold text-2xl text-[#2C1810]">+200</p>
                <p class="font-body text-xs text-[#7A6355]">produtos</p>
              </div>
              <div class="w-px h-8 bg-[#E7D7BC]" aria-hidden="true" />
              <div class="text-center">
                <p class="font-display font-bold text-2xl text-[#2C1810]">5★</p>
                <p class="font-body text-xs text-[#7A6355]">avaliação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
