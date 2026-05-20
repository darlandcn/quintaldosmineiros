<script setup lang="ts">
const { items, isOpen, totalItems, totalPriceDisplay, removeItem, decrementItem, addItem } = useCart()

function goToCheckout() {
  isOpen.value = false
  navigateTo('/checkout')
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop escurecido -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        @click="isOpen = false"
        aria-hidden="true"
      />
    </Transition>

    <!-- Painel deslizante -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="isOpen"
        class="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md
               bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Sua cesta"
        aria-modal="true"
      >
        <!-- ─── Cabeçalho do Drawer ─── -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-[#E7D7BC]/60">
          <div class="flex items-center gap-3">
            <span class="text-2xl" aria-hidden="true">🧺</span>
            <div>
              <h2 class="font-display font-bold text-[#2C1810] text-xl leading-none">
                Minha Cesta
              </h2>
              <p class="font-body text-xs text-[#7A6355] mt-0.5">
                {{ totalItems }} {{ totalItems === 1 ? 'item' : 'itens' }}
              </p>
            </div>
          </div>

          <button
            @click="isOpen = false"
            class="p-2 rounded-full hover:bg-[#F3EBDD] transition-colors text-[#7A6355] hover:text-[#2C1810]"
            aria-label="Fechar cesta"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- ─── Lista de Itens ─── -->
        <div class="flex-1 overflow-y-auto px-6 py-5">

          <!-- Estado vazio -->
          <div
            v-if="items.length === 0"
            class="flex flex-col items-center justify-center h-full gap-4 text-center py-16"
          >
            <span class="text-5xl opacity-30" aria-hidden="true">🧺</span>
            <p class="font-body text-[#7A6355] text-sm leading-relaxed">
              Sua cesta está vazia.<br />Adicione produtos para começar.
            </p>
            <button
              @click="isOpen = false"
              class="font-body text-sm font-semibold text-[#2F5946] hover:underline"
            >
              Ver produtos →
            </button>
          </div>

          <!-- Itens adicionados -->
          <TransitionGroup
            tag="ul"
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 translate-x-4"
            enter-to-class="opacity-100 translate-x-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 translate-x-4"
            class="flex flex-col divide-y divide-[#E7D7BC]/40"
          >
            <li
              v-for="item in items"
              :key="item.id"
              class="py-4 flex items-center gap-4"
            >
              <!-- Miniatura ou ícone -->
              <div class="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3EBDD] flex items-center justify-center">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-2xl" aria-hidden="true">{{ item.icon ?? '🛒' }}</span>
              </div>

              <!-- Nome e preço -->
              <div class="flex-1 min-w-0">
                <p class="font-body text-sm font-semibold text-[#2C1810] truncate">
                  {{ item.name }}
                </p>
                <p class="font-body text-xs text-[#2F5946] font-semibold mt-0.5">
                  {{ item.priceDisplay }}
                </p>
              </div>

              <!-- Controles de quantidade -->
              <div class="flex flex-col items-end gap-1 flex-shrink-0">
                <div class="flex items-center gap-2">
                  <button
                    @click="decrementItem(item.id)"
                    class="w-7 h-7 rounded-full border border-[#E7D7BC] flex items-center justify-center
                           text-[#7A6355] hover:border-[#2F5946] hover:text-[#2F5946] transition-colors"
                    :aria-label="`Remover um ${item.name}`"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4"/>
                    </svg>
                  </button>

                  <span class="font-body text-sm font-semibold text-[#2C1810] w-4 text-center">
                    {{ item.quantity }}
                  </span>

                  <button
                    @click="addItem({ id: item.id, name: item.name, price: item.price, priceDisplay: item.priceDisplay, stock: item.stock, image: item.image, icon: item.icon })"
                    class="w-7 h-7 rounded-full border border-[#E7D7BC] flex items-center justify-center
                           text-[#7A6355] transition-colors
                           disabled:opacity-30 disabled:cursor-not-allowed
                           hover:enabled:border-[#2F5946] hover:enabled:text-[#2F5946]"
                    :disabled="item.stock !== undefined && item.quantity >= item.stock"
                    :aria-label="`Adicionar mais ${item.name}`"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                  </button>
                </div>
                <p
                  v-if="item.stock !== undefined && item.quantity >= item.stock"
                  class="font-body text-[10px] text-[#7A6355]"
                >
                  Limite atingido
                </p>
              </div>
            </li>
          </TransitionGroup>
        </div>

        <!-- ─── Rodapé com Total e CTA ─── -->
        <div
          v-if="items.length > 0"
          class="px-6 py-5 border-t border-[#E7D7BC]/60 bg-[#FAF6EE]"
        >
          <!-- Total -->
          <div class="flex items-center justify-between mb-5">
            <span class="font-body text-sm font-semibold text-[#2C1810]">Total estimado</span>
            <span class="font-display font-bold text-2xl text-[#2F5946]">
              {{ totalPriceDisplay }}
            </span>
          </div>

          <!-- CTA Checkout -->
          <button
            class="flex items-center justify-center gap-2.5 w-full
                   bg-[#2F5946] hover:bg-[#254637] text-white
                   px-6 py-4 rounded-2xl font-body font-semibold text-base
                   transition-all duration-300 shadow-md hover:shadow-lg"
            @click="goToCheckout"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Finalizar Pedido
          </button>

          <p class="font-body text-xs text-[#7A6355] text-center mt-3">
            Preencha seus dados e confirme o pedido.
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
