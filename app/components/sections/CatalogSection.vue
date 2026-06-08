<script setup lang="ts">
const { products, loading, error, fetchProducts } = useProducts()

onMounted(fetchProducts)
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

      <!-- ─── Loading ─── -->
      <div v-if="loading" class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="i in 8"
          :key="i"
          class="animate-pulse bg-white border border-[#2F5946]/20 shadow-xl shadow-[#2F5946]/10"
        >
          <div class="aspect-square bg-[#E7D7BC]/50" />
          <div class="p-6 space-y-3">
            <div class="h-4 bg-[#E7D7BC]/60 rounded w-3/4 mx-auto" />
            <div class="h-px bg-[#E7D7BC]/60" />
            <div class="flex justify-between">
              <div class="h-4 bg-[#E7D7BC]/60 rounded w-1/4" />
              <div class="h-9 bg-[#2F5946]/20 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Erro ─── -->
      <div v-else-if="error" class="text-center py-20">
        <p class="font-display italic text-2xl text-[#7A6355]">Não foi possível carregar os produtos.</p>
        <button
          class="mt-6 font-body text-sm font-semibold text-[#2F5946] hover:underline"
          @click="fetchProducts"
        >
          Tentar novamente
        </button>
      </div>

      <!-- ─── Grade de Produtos ─── -->
      <template v-else>
        <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- ─── Estado Vazio ─── -->
        <div v-if="products.length === 0" class="text-center py-20">
          <p class="font-display italic text-2xl text-[#7A6355]">
            Nenhum produto disponível no momento
          </p>
        </div>
      </template>

    </div>
  </section>
</template>
