<script setup lang="ts">
// ─── CartDrawer Component ───
// Painel lateral deslizante da direita com resumo da cesta e CTA WhatsApp

const { items, isOpen, totalItems, totalPriceDisplay, whatsappMessage, removeItem, decrementItem, addItem } = useCart()

const whatsappNumber = '5531999999999'
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
        <div class="flex items-center justify-between px-6 py-5 border-b border-[#E6CDA1]/60">
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
            class="p-2 rounded-full hover:bg-[#F5EDD8] transition-colors text-[#7A6355] hover:text-[#2C1810]"
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
              class="font-body text-sm font-semibold text-[#DE8402] hover:underline"
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
            class="flex flex-col divide-y divide-[#E6CDA1]/40"
          >
            <li
              v-for="item in items"
              :key="item.id"
              class="py-4 flex items-center gap-4"
            >
              <!-- Miniatura ou ícone -->
              <div class="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EDD8] flex items-center justify-center">
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
                <p class="font-body text-xs text-[#DE8402] font-semibold mt-0.5">
                  {{ item.priceDisplay }}
                </p>
              </div>

              <!-- Controles de quantidade -->
              <div class="flex items-center gap-2 flex-shrink-0">
                <button
                  @click="decrementItem(item.id)"
                  class="w-7 h-7 rounded-full border border-[#E6CDA1] flex items-center justify-center
                         text-[#7A6355] hover:border-[#DE8402] hover:text-[#DE8402] transition-colors"
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
                  @click="addItem({ id: item.id, name: item.name, price: item.price, priceDisplay: item.priceDisplay, image: item.image, icon: item.icon })"
                  class="w-7 h-7 rounded-full border border-[#E6CDA1] flex items-center justify-center
                         text-[#7A6355] hover:border-[#DE8402] hover:text-[#DE8402] transition-colors"
                  :aria-label="`Adicionar mais ${item.name}`"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </li>
          </TransitionGroup>
        </div>

        <!-- ─── Rodapé com Total e CTA ─── -->
        <div
          v-if="items.length > 0"
          class="px-6 py-5 border-t border-[#E6CDA1]/60 bg-[#FAF6EE]"
        >
          <!-- Total -->
          <div class="flex items-center justify-between mb-5">
            <span class="font-body text-sm font-semibold text-[#2C1810]">Total estimado</span>
            <span class="font-display font-bold text-2xl text-[#DE8402]">
              {{ totalPriceDisplay }}
            </span>
          </div>

          <!-- CTA WhatsApp -->
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2.5 w-full
                   bg-[#DE8402] hover:bg-[#C47502] text-white
                   px-6 py-4 rounded-2xl font-body font-semibold text-base
                   transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Finalizar pelo WhatsApp
          </a>

          <p class="font-body text-xs text-[#7A6355] text-center mt-3">
            Confirmação e pagamento via WhatsApp.
          </p>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
