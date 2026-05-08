<script setup lang="ts">
// ─── BuildYourBasketSection Component ───
// Experiência interativa de montagem de cesta personalizada
// O cliente seleciona itens, vê o total e envia diretamente pelo WhatsApp

// ─── Estado do Montador via Composable ───
const {
  builderCategories,
  builderItems,
  selectedItems,
  selectedCount,
  totalPriceDisplay,
  whatsappMessage,
  toggleItem,
} = useBasketBuilder()

// ─── Categoria ativa no montador ───
const activeCategory = ref('queijos')

// ─── Itens filtrados pela categoria ativa ───
const visibleItems = computed(() =>
  builderItems.filter((item) => item.category === activeCategory.value),
)

// ─── Número de WhatsApp para pedido ───
const whatsappNumber = '5531999999999'
</script>

<template>
  <!-- Seção do montador — fundo creme claro para leveza -->
  <section id="monte" class="bg-[#FAF6EE] py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho da Seção ─── -->
      <div class="mb-14">
        <SectionHeader
          eyebrow="Personalização Premium"
          title="Monte a sua cesta<br /><em>do seu jeito</em>"
          subtitle="Escolha cada item com cuidado. Nós montamos, embalamos com carinho e entregamos para quem você ama."
          align="center"
        />
      </div>

      <!-- ─── Layout Principal do Montador ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">

        <!-- ─── Coluna de Seleção de Itens (2/3 da largura) ─── -->
        <div class="lg:col-span-2">

          <!-- Abas de categorias do montador -->
          <div class="flex flex-wrap gap-2 mb-7">
            <button
              v-for="cat in builderCategories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="[
                'flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium',
                'transition-all duration-200 cursor-pointer border focus:outline-none',
                activeCategory === cat.id
                  ? 'bg-[#DE8402] text-white border-[#DE8402] shadow-sm'
                  : 'bg-white text-[#7A6355] border-[#E6CDA1] hover:border-[#DE8402] hover:text-[#DE8402]',
              ]"
            >
              <span aria-hidden="true">{{ cat.icon }}</span>
              {{ cat.label }}
            </button>
          </div>

          <!-- Grade de itens da categoria ativa -->
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-250 ease-out"
            enter-from-class="opacity-0 translate-y-3"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <div
              :key="activeCategory"
              class="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              <BasketBuilderItem
                v-for="item in visibleItems"
                :key="item.id"
                :item="item"
                :selected="selectedItems.has(item.id)"
                @toggle="toggleItem"
              />
            </div>
          </Transition>
        </div>

        <!-- ─── Painel de Resumo da Cesta (1/3 da largura) ─── -->
        <!-- Posição sticky no desktop para acompanhar o scroll -->
        <aside class="lg:sticky lg:top-28">
          <div class="bg-white rounded-3xl p-7 border border-[#E6CDA1]/50 shadow-md">

            <!-- Título do resumo -->
            <div class="flex items-center gap-3 mb-6">
              <span class="text-2xl" aria-hidden="true">🧺</span>
              <div>
                <h3 class="font-display font-bold text-[#2C1810] text-lg leading-none">
                  Sua Cesta
                </h3>
                <p class="font-body text-xs text-[#7A6355] mt-0.5">
                  {{ selectedCount }} {{ selectedCount === 1 ? 'item' : 'itens' }} selecionados
                </p>
              </div>
            </div>

            <GoldDivider :opacity="30" />

            <!-- ─── Lista de Itens Selecionados ─── -->
            <div class="mt-5 min-h-[100px]">

              <!-- Estado vazio — convite à seleção -->
              <p
                v-if="selectedCount === 0"
                class="font-body text-sm text-[#7A6355] italic text-center py-4"
              >
                Selecione os itens ao lado para começar...
              </p>

              <!-- Itens selecionados listados -->
              <TransitionGroup
                tag="ul"
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
                class="flex flex-col gap-2"
              >
                <li
                  v-for="itemId in selectedItems"
                  :key="itemId"
                  class="flex items-center justify-between gap-2"
                >
                  <!-- Ícone e nome do item -->
                  <div class="flex items-center gap-2 min-w-0">
                    <span class="text-base flex-shrink-0" aria-hidden="true">
                      {{ builderItems.find(i => i.id === itemId)?.icon }}
                    </span>
                    <span class="font-body text-sm text-[#3D2B1F] truncate">
                      {{ builderItems.find(i => i.id === itemId)?.name }}
                    </span>
                  </div>
                  <!-- Preço do item -->
                  <span class="font-body text-xs font-semibold text-[#DE8402] flex-shrink-0">
                    {{ builderItems.find(i => i.id === itemId)?.priceDisplay }}
                  </span>
                </li>
              </TransitionGroup>
            </div>

            <!-- ─── Separador e Total ─── -->
            <GoldDivider :opacity="30" class="mt-5 mb-5" />

            <!-- Preço base da cesta (embalagem) -->
            <div class="flex justify-between text-xs font-body text-[#7A6355] mb-2">
              <span>Cesta + embalagem + fita</span>
              <span>R$ 39,90</span>
            </div>

            <!-- Total calculado em destaque -->
            <div class="flex justify-between items-end">
              <span class="font-body text-sm font-semibold text-[#2C1810]">Total estimado</span>
              <span class="font-display font-bold text-2xl text-[#DE8402]">
                {{ totalPriceDisplay }}
              </span>
            </div>

            <!-- CTA para finalizar pelo WhatsApp -->
            <a
              :href="`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2.5 mt-6
                     bg-[#DE8402] text-white px-6 py-4 rounded-2xl w-full
                     font-body font-semibold text-base
                     hover:bg-[#C47502] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <!-- Ícone WhatsApp -->
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Montar Minha Cesta
            </a>

            <!-- Nota tranquilizadora -->
            <p class="font-body text-xs text-[#7A6355] text-center mt-3 leading-relaxed">
              Valores estimados. Confirmação e pagamento via WhatsApp.
            </p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
