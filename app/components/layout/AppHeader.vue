<script setup lang="ts">
// ─── AppHeader Component ───
// Header fixo na cor primária com logo centralizada
// Estado hero (grande, 144px) → estado compacto (72px) ao rolar além do hero

// ─── Links de Navegação ───
const navLinks = [
  { label: 'Kits',            href: '#kits'     },
  { label: 'Produtos',        href: '#produtos'  },
  { label: 'Monte seu Kit',   href: '#monte'     },
  { label: 'Nossa História',  href: '#historia'  },
]

// ─── Detecção do Hero Section ───
const isHero = ref(true)
const mobileOpen = ref(false)

onMounted(() => {
  const onScroll = () => {
    isHero.value = window.scrollY < 10
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})

// ─── Cesta de Compras ───
const { totalItems, isOpen: cartOpen } = useCart()
</script>

<template>
  <!-- Header fixo — cor primária sólida, altura animada entre hero e compacto -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 bg-[#DE8402]',
      'transition-[height] duration-500 ease-in-out overflow-hidden',
      'shadow-[0_2px_20px_rgba(44,24,16,0.2)]',
      isHero ? 'h-36' : 'h-[72px]',
    ]"
  >

    <!-- ─── Logo Centralizada (sempre presente, tamanho animado) ─── -->
    <!-- Posicionada absolutamente para garantir centralização real -->
    <a
      href="#"
      class="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center
             transition-all duration-500 ease-in-out"
      :class="isHero ? 'top-1/2 -translate-y-[calc(50%+16px)]' : 'top-1/2 -translate-y-1/2'"
    >
      <!-- Passarinho — ícone da marca -->
      <img
        src="/images/logo_passarinho.png"
        alt="Quintal dos Mineiros"
        class="object-contain transition-all duration-500 ease-in-out"
        :class="isHero ? 'h-[42px] w-[42px]' : 'h-[29px] w-[29px]'"
      />
      <!-- Nome da marca -->
      <img
        src="/images/logo_nome_2.png"
        alt="Quintal dos Mineiros"
        class="object-contain transition-all duration-500 ease-in-out"
        :class="isHero ? 'h-[43px] -mt-1' : 'h-[26px] -mt-0.5'"
      />
    </a>

    <!-- ─── Nav Links do Estado Hero (centralizados abaixo da logo) ─── -->
    <!-- Desaparecem suavemente ao compactar -->
    <nav
      class="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-8 pb-3.5
             transition-all duration-300"
      :class="isHero ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-label="Navegação principal"
    >
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        class="font-body text-sm font-medium text-white/85 hover:text-white
               transition-colors duration-200 tracking-wide uppercase"
      >
        {{ link.label }}
      </a>
    </nav>

    <!-- ─── Ações fixas no lado direito (WhatsApp + cesta — ambos os estados) ─── -->
    <!-- z-10 garante que fica acima do div da nav compacta (absolute inset-0) -->
    <div
      class="absolute right-5 md:right-8 z-10
             hidden md:flex items-center gap-3 transition-all duration-300"
      :class="isHero ? 'top-1/2 -translate-y-[calc(50%+16px)]' : 'top-1/2 -translate-y-1/2'"
    >
      <!-- CTA WhatsApp -->
      <a
        href="https://wa.me/5531999999999?text=Olá! Gostaria de conhecer as cestas do Quintal dos Mineiros."
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white
               px-5 py-2 rounded-lg font-body text-sm font-semibold
               transition-all duration-200 border border-white/30"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Fazer Pedido
      </a>

      <!-- Ícone da cesta com badge de contagem -->
      <button
        @click="cartOpen = true"
        class="relative p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
        aria-label="Abrir cesta de compras"
      >
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 10C8.5 7 10 4.5 12 4.5S15.5 7 15.5 10"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18v5.5A5.5 5.5 0 0 1 15.5 21h-7A5.5 5.5 0 0 1 3 15.5V10z"/>
        </svg>
        <span
          v-if="totalItems > 0"
          class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                 bg-white text-[#DE8402] font-body font-bold text-[10px]
                 rounded-full flex items-center justify-center leading-none"
        >
          {{ totalItems > 99 ? '99+' : totalItems }}
        </span>
      </button>
    </div>

    <!-- ─── Nav Compacta (lateral esquerda + direita) ─── -->
    <!-- Aparece quando sai do hero — logo permanece centralizada via absolute -->
    <div
      class="absolute inset-0 max-w-7xl mx-auto px-5 md:px-8
             flex items-center justify-between
             transition-all duration-300"
      :class="isHero ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <!-- Barra de pesquisa — lado esquerdo do header compacto -->
      <div class="hidden md:flex items-center">
        <div class="flex items-center gap-2 bg-white/15 hover:bg-white/20 focus-within:bg-white/25
                    border border-white/25 focus-within:border-white/50
                    rounded-lg px-4 py-2 transition-all duration-200 w-52">
          <svg class="w-4 h-4 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
          </svg>
          <input
            type="search"
            placeholder="Buscar produtos"
            class="bg-transparent font-body text-sm text-white placeholder-white/50
                   outline-none w-full"
            aria-label="Buscar produtos"
          />
        </div>
      </div>

      <!-- Espaçador central (logo fica em absolute) -->
      <div class="flex-1" aria-hidden="true" />

    </div>

    <!-- ─── Menu Mobile Dropdown ─── -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="absolute top-full left-0 right-0 md:hidden
               bg-[#C47502] border-t border-white/20 shadow-lg"
      >
        <ul class="flex flex-col divide-y divide-white/10">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              @click="mobileOpen = false"
              class="block px-6 py-4 font-body text-sm font-medium text-white
                     hover:bg-white/10 transition-colors uppercase"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="p-4">
            <a
              href="https://wa.me/5531999999999?text=Olá! Gostaria de conhecer as cestas do Quintal dos Mineiros."
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 bg-white/20 text-white
                     px-5 py-3 rounded-lg font-body text-sm font-semibold w-full
                     border border-white/30"
            >
              Fazer Pedido pelo WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
