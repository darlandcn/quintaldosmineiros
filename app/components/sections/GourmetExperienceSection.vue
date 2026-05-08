<script setup lang="ts">
// ─── GourmetExperienceSection Component ───
// Seção de storytelling visual — momentos gourmet de uma tarde mineira
// Três cards editoriais com composições cinematográficas

// ─── Momentos da Experiência Mineira ───
const moments = [
  {
    id: 1,
    title: 'A Tarde do Café',
    description:
      'Uma xícara de café especial do Sul de Minas, biscoitos amanteigados e o silêncio agradável de uma tarde de domingo.',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    tag: 'Café & Biscoitos',
  },
  {
    id: 2,
    title: 'A Mesa de Queijos',
    description:
      'Queijo Canastra meia-cura, goiabada cascão, mel orgânico e a conversa que só acontece quando a mesa está farta.',
    image:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
    tag: 'Queijos & Doces',
  },
  {
    id: 3,
    title: 'O Presente Perfeito',
    description:
      'Uma cesta cuidadosamente montada que diz mais do que qualquer cartão. O sabor de Minas como gesto de carinho.',
    image:
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    tag: 'Cestas & Presentes',
  },
]
</script>

<template>
  <!-- Seção de experiência — fundo verde floresta para contraste atmosférico -->
  <section class="bg-[#2F5946] py-24 md:py-32 overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho da Seção (texto claro) ─── -->
      <div class="mb-14 md:mb-16">
        <SectionHeader
          eyebrow="Experiências Gourmet"
          title="Uma tarde mineira<br /><em>para sempre lembrar</em>"
          subtitle="Cada produto carrega a tradição, o cuidado e o calor de Minas Gerais. Não vendemos apenas itens — criamos momentos."
          align="center"
          :light="true"
        />
      </div>

      <!-- ─── Grade de Momentos Editoriais ─── -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="moment in moments"
          :key="moment.id"
          class="group relative rounded-3xl overflow-hidden cursor-pointer card-hover aspect-[3/4]"
        >
          <!-- Imagem do momento -->
          <img
            :src="moment.image"
            :alt="moment.title"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          <!-- Gradiente de fundo para leitura do texto -->
          <div
            class="absolute inset-0 bg-gradient-to-t
                   from-[#2C1810]/90 via-[#2C1810]/30 to-transparent"
          />

          <!-- Conteúdo sobre a imagem -->
          <div class="absolute bottom-0 left-0 right-0 p-7">

            <!-- Tag da categoria -->
            <BadgePill :text="moment.tag" color="white" class="mb-4" />

            <!-- Título do momento -->
            <h3 class="font-display font-bold text-white text-2xl leading-snug mb-2">
              {{ moment.title }}
            </h3>

            <!-- Descrição evocativa -->
            <p class="font-body text-sm text-white/75 leading-relaxed">
              {{ moment.description }}
            </p>
          </div>
        </article>
      </div>

      <!-- ─── Frase de Marca Central ─── -->
      <!-- Quote emocional que reforça o posicionamento -->
      <div class="mt-16 text-center">
        <GoldDivider width="md" :opacity="40" />
        <blockquote class="font-display italic text-2xl md:text-3xl text-white/80 mt-8 max-w-2xl mx-auto leading-relaxed">
          "Uma experiência sofisticada de mesa mineira, entregue onde você estiver."
        </blockquote>
        <GoldDivider width="md" :opacity="40" class="mt-8" />
      </div>
    </div>
  </section>
</template>
