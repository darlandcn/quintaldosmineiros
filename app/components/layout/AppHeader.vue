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
const props = defineProps<{ compact?: boolean }>()
const isHero = ref(!props.compact)
const mobileOpen = ref(false)

onMounted(() => {
  if (props.compact) return
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
      <!-- Ícone da cesta com badge de contagem -->
      <button
        @click="cartOpen = true"
        class="relative p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
        aria-label="Abrir cesta de compras"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"/>
          <path d="M8 11V6a4 4 0 0 1 8 0v5"/>
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

    <!-- ─── Nav Compacta — hamburger à esquerda, cesta à direita (mobile) ─── -->
    <div
      class="absolute inset-0 px-5 md:px-8 flex items-center justify-between
             transition-all duration-300"
      :class="isHero ? 'opacity-0 pointer-events-none' : 'opacity-100'"
    >
      <!-- Botão hamburger / fechar -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="p-2 text-white hover:bg-white/10 transition-colors rounded"
        :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
      >
        <div class="relative w-6 h-6">
          <!-- Ícone menu -->
          <svg
            class="absolute inset-0 w-6 h-6 transition-all duration-300"
            :class="mobileOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
          >
            <path d="M4 5h16"/>
            <path d="M4 12h16"/>
            <path d="M4 19h16"/>
          </svg>
          <!-- Ícone X -->
          <svg
            class="absolute inset-0 w-6 h-6 transition-all duration-300"
            :class="mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
          >
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </div>
      </button>

      <!-- Cesta de compras — visível só no mobile -->
      <button
        @click="cartOpen = true"
        class="relative md:hidden p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
        aria-label="Abrir cesta de compras"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"/>
          <path d="M8 11V6a4 4 0 0 1 8 0v5"/>
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

  </header>

  <!-- ─── Drawer de Navegação Mobile ─── -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        @click="mobileOpen = false"
        aria-hidden="true"
      />
    </Transition>

    <!-- Painel deslizante da esquerda -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="mobileOpen"
        class="fixed top-0 left-0 bottom-0 z-[70] w-72
               bg-[#2F5946] shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Menu de navegação"
        aria-modal="true"
      >
        <!-- Cabeçalho do drawer com logo e fechar -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div class="flex flex-col items-start">
            <img src="/images/logo_passarinho_2.png" alt="Quintal dos Mineiros" class="h-8 w-8 object-contain" />
            <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-7 object-contain -mt-0.5" />
          </div>
          <button
            @click="mobileOpen = false"
            class="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            aria-label="Fechar menu"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <!-- Links de navegação -->
        <nav class="flex-1 flex flex-col px-4 py-6 gap-1">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="mobileOpen = false"
            class="px-4 py-3.5 font-body text-sm font-medium tracking-[0.12em] uppercase
                   text-white/80 hover:text-white hover:bg-white/10
                   transition-colors rounded-lg"
          >
            {{ link.label }}
          </a>
        </nav>

      </aside>
    </Transition>
  </Teleport>
</template>
