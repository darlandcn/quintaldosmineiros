<template>
  <div class="bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden flex flex-col h-full min-h-0">

    <!-- Card Header -->
    <div class="px-5 py-3 border-b border-zinc-100 flex items-center justify-between shrink-0">
      <div class="space-y-0.5">
        <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Produtos</p>
        <p class="text-sm font-bold text-gray-900 leading-none">Mais vendidos</p>
      </div>
      <span class="text-[11px] text-zinc-400 font-medium">Top 5</span>
    </div>

    <!-- List -->
    <div class="flex-1 overflow-y-auto min-h-[260px] divide-y divide-zinc-50">

      <!-- Loading skeleton -->
      <div v-if="loading" class="divide-y divide-zinc-50 animate-pulse">
        <div v-for="i in 5" :key="i" class="flex items-center gap-3 px-5 py-2.5">
          <div class="h-3 w-4 bg-gray-100 rounded" />
          <div class="w-8 h-8 rounded-lg bg-gray-100 shrink-0" />
          <div class="flex-1 min-w-0 space-y-1.5">
            <div class="h-3 w-32 bg-gray-100 rounded" />
            <div class="h-2.5 w-16 bg-gray-100 rounded" />
          </div>
          <div class="h-3 w-16 bg-gray-100 rounded shrink-0" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex items-center justify-center h-full min-h-[120px]">
        <span class="text-sm text-red-400">{{ error }}</span>
      </div>

      <!-- Empty -->
      <div v-else-if="products.length === 0" class="flex items-center justify-center h-full min-h-[120px]">
        <span class="text-sm text-zinc-400">Nenhum produto vendido ainda</span>
      </div>

      <div
        v-else
        v-for="(product, i) in products"
        :key="product.name"
        class="flex items-center gap-3 px-5 py-2.5 hover:bg-zinc-50 transition-all duration-200 group"
      >
        <!-- Rank -->
        <span
          class="text-[11px] font-bold tabular-nums w-4 shrink-0 text-center"
          :class="i === 0 ? 'text-amber-500' : 'text-zinc-300'"
        >#{{ i + 1 }}</span>

        <!-- Image -->
        <div class="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-100 overflow-hidden shrink-0">
          <img
            v-if="product.image"
            :src="product.image"
            class="w-full h-full object-cover"
            alt=""
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-3.5 h-3.5 text-zinc-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z" />
            </svg>
          </div>
        </div>

        <!-- Name + qty -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-zinc-800 truncate">{{ product.name }}</p>
          <p class="text-xs text-zinc-400 mt-0.5 tabular-nums">{{ product.qty }} vendas</p>
        </div>

        <!-- Revenue -->
        <span class="text-sm font-semibold text-zinc-700 tabular-nums shrink-0">{{ product.revenue }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="px-5 py-2.5 border-t border-zinc-100 shrink-0">
      <p class="text-xs text-zinc-400">Baseado nos últimos 30 dias</p>
    </div>

  </div>
</template>

<script setup lang="ts">
const { products, loading, error, fetchTopProducts } = useTopProducts()

onMounted(() => fetchTopProducts())
</script>
