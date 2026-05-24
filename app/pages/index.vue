<script setup lang="ts">
definePageMeta({ layout: false })

// ─── Página Inicial — Quintal dos Mineiros ───
// Assembly de todas as seções na ordem narrativa planejada
// Cada seção conta uma parte da experiência da marca

// ─── SEO / Meta Tags ───
useSeoMeta({
  title: 'Quintal dos Mineiros | Sabores Artesanais de Minas Gerais',
  description:
    'Queijos artesanais, doce de leite, café especial e os melhores sabores de Minas Gerais. Cestas gourmet e presentes para momentos especiais.',
  ogTitle: 'Quintal dos Mineiros',
  ogDescription:
    'Uma experiência sofisticada de mesa mineira. Cestas artesanais, produtos selecionados e presentes inesquecíveis.',
  ogImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <!-- ─── Shell da Página Principal ─── -->
  <div class="min-h-screen">

    <!-- ─── Navegação Global Fixa ─── -->
    <AppHeader />

    <!-- ─── Conteúdo Principal ─── -->
    <main>

      <!-- 1. Hero — impacto emocional inicial -->
      <!-- "O melhor de Minas na sua mesa" com CTA para cestas -->
      <HeroSection />

<!-- 2. Catálogo de Produtos — exploração curada -->
      <!-- Filtro por categoria + grade de produtos artesanais -->
      <CatalogSection />

      <!-- 4. Nossa História — narrativa emocional da marca -->
      <!-- Origem, valores, pilares e imagem editorial -->
      <BrandStorySection />

      <!-- 6. Depoimentos — prova social elegante -->
      <!-- Cartões de clientes reais com avaliação e ocasião -->
      <TestimonialsSection />

    </main>

    <!-- ─── Rodapé Global ─── -->
    <AppFooter />
  </div>
</template>
