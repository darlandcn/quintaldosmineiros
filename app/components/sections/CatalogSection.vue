<script setup lang="ts">
// ─── ProductCatalogSection Component ───
// Catálogo curado de produtos individuais com filtro interativo por categoria
// Apresentação editorial com grade responsiva

// ─── Estado do Catálogo via Composable ───
const { categories, filteredProducts, selectedCategory } = useProducts()
</script>

<template>
  <!-- Seção de catálogo — fundo creme quente para atmosfera aconchegante -->
  <section id="produtos" class="bg-[#F3EBDD] py-14 md:py-20">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho do Catálogo ─── -->
      <div class="mb-12 md:mb-14">
        <SectionHeader
          eyebrow="Catálogo Artesanal"
          title="Escolha os seus<br /><em>sabores favoritos</em>"
          subtitle="Cada produto é selecionado diretamente de produtores artesanais de Minas Gerais, garantindo autenticidade, qualidade e sabor genuíno."
          align="center"
        />
      </div>

      <!-- ─── Filtro de Categorias ─── -->
      <!-- Scroll horizontal no mobile para comportar todas as pílulas -->
      <div class="overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 mb-10">
        <div class="flex items-center gap-2.5 min-w-max md:flex-wrap md:min-w-0 md:justify-center">
          <CategoryPill
            v-for="cat in categories"
            :key="cat.id"
            :label="cat.label"
            :icon="cat.icon"
            :active="selectedCategory === cat.id"
            @click="selectedCategory = cat.id"
          />
        </div>
      </div>

      <!-- ─── Grade de Produtos Filtrados ─── -->
      <!-- Transição suave ao mudar de categoria -->
      <Transition
        mode="out-in"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          :key="selectedCategory"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </Transition>

      <!-- ─── Estado Vazio (se categoria não tem produtos) ─── -->
      <div
        v-if="filteredProducts.length === 0"
        class="text-center py-20"
      >
        <p class="font-display italic text-2xl text-[#7A6355]">
          Em breve mais produtos nessa categoria
        </p>
      </div>

    </div>
  </section>
</template>
