<template>
  <div class="flex flex-col h-full">

    <!-- Page Header -->
    <div class="sticky top-0 z-10 bg-white border-b border-[#2F5946]/20 px-8 py-4">
      <div class="space-y-0.5">
        <h1 class="text-xl font-bold text-gray-900 tracking-tight leading-none">Produtos</h1>
        <p class="text-xs text-gray-400 font-normal">Gerencie o catálogo de produtos da loja</p>
      </div>
    </div>

    <!-- Page Body -->
    <div class="flex flex-col px-6 py-3 gap-2.5 flex-1 min-h-0">

      <!-- Stats Cards -->
      <div class="shrink-0 grid grid-cols-1 sm:grid-cols-3 gap-2.5">

        <!-- Total de produtos -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 3H8L6 7h12l-2-4z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Total de produtos</p>
            <div v-if="loading" class="mt-1.5 h-5 w-10 rounded bg-gray-100 animate-pulse" />
            <p v-else class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">
              {{ products.length }}
            </p>
          </div>
        </div>

        <!-- Estoque total -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Estoque total</p>
            <div v-if="loading" class="mt-1.5 h-5 w-14 rounded bg-gray-100 animate-pulse" />
            <p v-else class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">
              {{ products.reduce((sum, p) => sum + p.stock, 0) }}
              <span class="text-sm font-medium text-gray-400 ml-0.5">un.</span>
            </p>
          </div>
        </div>

        <!-- Valor médio -->
        <div class="bg-white rounded-xl border border-[#2F5946]/20 px-4 py-3 h-[76px] flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#2F5946]/10 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest leading-none">Valor médio</p>
            <div v-if="loading" class="mt-1.5 h-5 w-16 rounded bg-gray-100 animate-pulse" />
            <p v-else class="text-xl font-bold text-gray-900 mt-1 tabular-nums leading-none">
              {{ avgPrice }}
            </p>
          </div>
        </div>

      </div>

      <!-- Search + Filters -->
      <div class="shrink-0 flex items-center gap-3">

        <!-- Search -->
        <div class="flex-1 bg-white rounded-lg border border-[#2F5946]/20 px-4 py-2.5 flex items-center gap-3 focus-within:border-[#2F5946]/50 focus-within:ring-2 focus-within:ring-[#2F5946]/10 transition-all">
          <svg class="w-4 h-4 text-gray-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar por nome..."
            class="flex-1 text-sm text-gray-700 placeholder-gray-300 bg-transparent outline-none"
          />
          <button
            v-if="search"
            class="text-gray-300 hover:text-gray-500 transition-colors"
            @click="search = ''"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Stock Filter -->
        <div class="flex items-center bg-white rounded-lg border border-[#2F5946]/20 p-1 gap-0.5">
          <button
            v-for="opt in stockOptions"
            :key="opt.value"
            class="px-3.5 py-1.5 rounded-md text-xs font-medium transition-all"
            :class="stockFilter === opt.value
              ? 'bg-[#2F5946] text-white shadow-sm'
              : 'text-gray-400 hover:text-gray-700'"
            @click="stockFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>

        <!-- Novo Produto -->
        <button
          class="group flex items-center gap-2 bg-[#2F5946] text-white pl-4 pr-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#254637] active:scale-[0.98] transition-all shadow-sm shrink-0"
          @click="openCreate"
        >
          <span class="flex items-center justify-center w-4 h-4 rounded bg-white/20 group-hover:bg-white/30 transition-colors">
            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
          Novo Produto
        </button>

      </div>

      <!-- Área da tabela (scroll interno) -->
      <div class="flex flex-col min-h-0 flex-1">

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="flex items-center gap-2 text-sm text-gray-400">
          <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Carregando...
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="bg-red-50 border border-red-100 rounded-lg px-5 py-4 text-sm text-red-500">
        {{ error }}
      </div>

      <!-- Empty: sem produtos -->
      <div v-else-if="products.length === 0" class="bg-white rounded-xl border border-[#2F5946]/20 flex flex-col items-center justify-center py-16 text-center">
        <div class="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-3">
          <svg class="w-5 h-5 text-zinc-300" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z" />
          </svg>
        </div>
        <p class="text-sm font-semibold text-zinc-600">Nenhum produto cadastrado</p>
        <p class="text-xs text-zinc-400 mt-1">Clique em "Novo Produto" para começar.</p>
      </div>

      <!-- Table -->
      <div v-else class="flex flex-col flex-1 min-h-0 bg-white rounded-xl border border-[#2F5946]/20 overflow-hidden">
        <div class="overflow-x-auto overflow-y-auto flex-1 min-h-0">
        <table class="w-full">
          <thead class="sticky top-0 bg-white z-10">
            <tr class="border-b border-zinc-100">
              <th class="text-left px-5 py-3 text-xs font-medium text-zinc-500 w-[45%]">Produto</th>
              <th class="text-left px-5 py-3 text-xs font-medium text-zinc-500">Preço</th>
              <th class="text-left px-5 py-3 text-xs font-medium text-zinc-500">Estoque</th>
              <th class="text-right px-5 py-3 text-xs font-medium text-zinc-500">Ações</th>
            </tr>
          </thead>
          <tbody>

            <!-- Sem resultados (filtro) -->
            <tr v-if="filteredProducts.length === 0">
              <td colspan="4" class="px-5 py-12 text-center">
                <p class="text-sm text-zinc-400">Nenhum produto encontrado para os filtros aplicados.</p>
                <button
                  class="mt-2 text-xs text-[#2F5946] font-medium hover:underline"
                  @click="search = ''; stockFilter = 'all'"
                >
                  Limpar filtros
                </button>
              </td>
            </tr>

            <!-- Linhas -->
            <tr
              v-for="product in paginatedProducts"
              :key="product.id"
              class="group border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-all duration-200 cursor-pointer"
              @dblclick="openEdit(product)"
            >
              <!-- Produto -->
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-14 h-14 rounded-lg bg-zinc-100 border border-zinc-100 overflow-hidden shrink-0">
                    <img
                      v-if="product.images?.[0]"
                      :src="product.images[0]"
                      class="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div class="min-w-0">
                    <p class="text-sm font-semibold text-zinc-800 truncate">{{ product.name }}</p>
                    <p v-if="product.description" class="text-xs text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Preço -->
              <td class="px-5 py-3">
                <span class="text-sm font-medium text-zinc-700 tabular-nums">
                  {{ formatPrice(product.price) }}
                </span>
              </td>

              <!-- Estoque -->
              <td class="px-5 py-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                  :class="product.stock === 0
                    ? 'bg-red-50 text-red-500'
                    : product.stock <= 10
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'"
                >
                  {{ product.stock === 0 ? 'Esgotado' : product.stock + ' un.' }}
                </span>
              </td>

              <!-- Ações -->
              <td class="px-5 py-3">
                <div class="flex items-center justify-end gap-2">
                  <button
                    class="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-[#2F5946] hover:border-[#2F5946]/30 hover:bg-[#2F5946]/5 transition-all duration-200"
                    title="Editar"
                    @click="openEdit(product)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                  </button>
                  <button
                    class="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
                    title="Excluir"
                    @click="confirmDelete(product)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
        </div>

        <!-- Rodapé com paginação -->
        <div class="shrink-0 px-5 py-2.5 border-t border-zinc-100 flex items-center justify-between gap-4">
          <p class="text-xs text-zinc-400">
            {{ filteredProducts.length }}
            {{ filteredProducts.length === 1 ? 'produto' : 'produtos' }}
            <span v-if="filteredProducts.length !== products.length" class="text-zinc-300">
              de {{ products.length }} no total
            </span>
          </p>
          <div v-if="totalPages > 1" class="flex items-center gap-2">
            <button
              class="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span class="text-xs text-zinc-500 tabular-nums">{{ currentPage }} / {{ totalPages }}</span>
            <button
              class="w-7 h-7 flex items-center justify-center rounded-md border border-zinc-200 text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-all"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>

      </div> <!-- /área da tabela -->

    </div>

    <!-- Drawer Lateral -->
    <Transition name="drawer">
      <div v-if="showForm" class="fixed inset-0 z-40 flex justify-end">
        <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]" @click="closeForm" />
        <div class="drawer-panel relative w-full max-w-[420px] bg-white shadow-2xl flex flex-col">

          <!-- Drawer Header -->
          <div class="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
            <div>
              <p class="text-sm font-semibold text-gray-800">
                {{ selectedProduct ? 'Editar Produto' : 'Novo Produto' }}
              </p>
              <p class="text-xs text-gray-400 mt-0.5">
                {{ selectedProduct ? 'Atualize as informações do produto' : 'Preencha os dados do novo produto' }}
              </p>
            </div>
            <button
              class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              @click="closeForm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto px-5 py-4">
            <ProductForm
              :product="selectedProduct ?? undefined"
              @saved="onSaved"
              @cancel="closeForm"
            />
          </div>

        </div>
      </div>
    </Transition>

    <!-- Confirm Delete -->
    <ConfirmDialog
      v-if="productToDelete"
      :title="`Excluir &quot;${productToDelete.name}&quot;?`"
      description="Esta ação não pode ser desfeita."
      @confirm="handleDelete"
      @cancel="productToDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminProduct } from '~/composables/useAdminProducts'

definePageMeta({ layout: 'admin' })

const { products, loading, error, fetchProducts, deleteProduct } = useAdminProducts()

const avgPrice = computed(() => {
  if (!products.value.length) return '—'
  const avg = products.value.reduce((sum, p) => sum + p.price, 0) / products.value.length
  return avg.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
})

const search = ref('')
const stockFilter = ref<'all' | 'in' | 'out'>('all')

const stockOptions = [
  { label: 'Todos',      value: 'all' as const },
  { label: 'Em estoque', value: 'in'  as const },
  { label: 'Esgotados',  value: 'out' as const },
]

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase().trim())
    const matchesStock =
      stockFilter.value === 'all' ? true :
      stockFilter.value === 'in'  ? p.stock > 0 :
                                    p.stock === 0
    return matchesSearch && matchesStock
  })
})

const PAGE_SIZE = 20
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PAGE_SIZE)))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

watch([search, stockFilter], () => { currentPage.value = 1 })

const showForm = ref(false)
const selectedProduct = ref<AdminProduct | null>(null)
const productToDelete = ref<AdminProduct | null>(null)

function openCreate() {
  selectedProduct.value = null
  showForm.value = true
}

function openEdit(product: AdminProduct) {
  selectedProduct.value = product
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  selectedProduct.value = null
}

async function onSaved() {
  closeForm()
  await fetchProducts()
}

function confirmDelete(product: AdminProduct) {
  productToDelete.value = product
}

async function handleDelete() {
  if (!productToDelete.value) return
  await deleteProduct(productToDelete.value.id)
  productToDelete.value = null
  await fetchProducts()
}

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

onMounted(fetchProducts)
</script>

<style scoped>
.drawer-enter-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active .drawer-panel {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active {
  transition: opacity 0.15s ease;
}
.drawer-leave-active .drawer-panel {
  transition: transform 0.2s ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
