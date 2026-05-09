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
      'fixed top-0 left-0 right-0 z-50 bg-[#2F5946]',
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
        src="/images/logo_passarinho_2.png"
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
        class="inline-flex items-center justify-center px-6 py-2
               bg-transparent hover:bg-white/10 text-white
               font-subheadline text-xs font-semibold tracking-[0.15em] uppercase
               transition-all duration-300 border border-white/40 hover:border-white/70"
      >
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
                 bg-white text-[#2F5946] font-body font-bold text-[10px]
                 rounded-full flex items-center justify-center leading-none"
        >
          {{ totalItems > 99 ? '99+' : totalItems }}
        </span>
      </button>
    </div>

    <!-- ─── Nav Compacta — hamburger à esquerda ─── -->
    <div
      class="absolute inset-0 px-5 md:px-8 flex items-center
             transition-all duration-300"
      :class="isHero ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <!-- Botão hamburger -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="flex flex-col justify-center gap-[5px] p-2 text-white
               hover:bg-white/10 transition-colors rounded"
        aria-label="Abrir menu"
      >
        <span class="block w-5 h-[2.5px] bg-white transition-all duration-300"
              :class="mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''" />
        <span class="block w-5 h-[2.5px] bg-white transition-all duration-300"
              :class="mobileOpen ? 'opacity-0' : ''" />
        <span class="block w-5 h-[2.5px] bg-white transition-all duration-300"
              :class="mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''" />
      </button>
    </div>

    <!-- ─── Dropdown do Menu ─── -->
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen && !isHero"
        class="absolute top-full left-0 right-0
               bg-[#254637] border-t border-white/20 shadow-lg"
      >
        <ul class="flex flex-col divide-y divide-white/10">
          <li v-for="link in navLinks" :key="link.href">
            <a
              :href="link.href"
              @click="mobileOpen = false"
              class="block px-8 py-4 font-subheadline text-xs font-semibold
                     tracking-[0.15em] uppercase text-white/85
                     hover:text-white hover:bg-white/10 transition-colors"
            >
              {{ link.label }}
            </a>
          </li>
          <li class="px-8 py-5">
            <a
              href="https://wa.me/5531999999999?text=Olá! Gostaria de conhecer as cestas do Quintal dos Mineiros."
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-full px-6 py-2.5
                     bg-transparent hover:bg-white/10 text-white
                     font-subheadline text-xs font-semibold tracking-[0.15em] uppercase
                     transition-all duration-300 border border-white/40 hover:border-white/70"
              @click="mobileOpen = false"
            >
              Fazer Pedido
            </a>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
