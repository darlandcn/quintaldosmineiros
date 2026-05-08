<script setup lang="ts">
// ─── FeaturedBasketsSection Component ───
// Seção principal de cestas de presente — foco comercial número 1 da homepage
// Layout editorial em grade com cartões premium e cesta destacada

// ─── Dados das Cestas via Composable ───
const { baskets } = useBaskets()
</script>

<template>
  <!-- Seção de cestas — fundo creme claro para leveza visual -->
  <section id="kits" class="bg-[#FAF6EE] py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho da Seção ─── -->
      <div class="mb-14 md:mb-16">
        <SectionHeader
          eyebrow="Presentes Inesquecíveis"
          title="Cestas que contam<br /><em>histórias mineiras</em>"
          subtitle="Cada cesta é montada com carinho, selecionando os melhores produtos artesanais de Minas Gerais para criar um presente verdadeiramente especial."
          align="center"
        />
      </div>

      <!-- ─── Grade de Cestas ─── -->
      <!-- Layout responsivo: 1 coluna mobile → 3 colunas desktop -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
        <BasketCard
          v-for="basket in baskets"
          :key="basket.id"
          :basket="basket"
          :featured="basket.highlight"
        />
      </div>

      <!-- ─── CTA Secundário após as cestas ─── -->
      <!-- Convite para personalização -->
      <div class="mt-14 text-center">
        <p class="font-body text-base text-[#7A6355] mb-5">
          Não encontrou o que procura? Monte a sua cesta personalizada.
        </p>
        <a
          href="#monte"
          class="inline-flex items-center gap-2 border-2 border-[#DE8402] text-[#DE8402]
                 px-8 py-3.5 rounded-full font-body font-semibold text-base
                 hover:bg-[#DE8402] hover:text-white transition-all duration-300"
        >
          Montar Minha Cesta →
        </a>
      </div>
    </div>
  </section>
</template>
