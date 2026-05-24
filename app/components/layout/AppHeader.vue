<script setup lang="ts">
// ─── AppHeader Component ───
// Header fixo na cor primária com logo centralizada
// Estado hero (grande, 144px) → estado compacto (72px) ao rolar além do hero

// ─── Links de Navegação ───
const navLinks = [
  { label: 'Produtos',        href: '#produtos'  },
  { label: 'Nossa História',  href: '#historia'  },
  { label: 'Contatos',        href: '#footer'    },
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

// ─── Busca ───
const searchOpen = ref(false)
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
      :class="isHero ? 'top-1/2 -translate-y-1/2 md:-translate-y-[calc(50%+16px)]' : 'top-1/2 -translate-y-1/2'"
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

    <!-- ─── Nav Links do Estado Hero (centralizados abaixo da logo, só desktop) ─── -->
    <!-- Desaparecem suavemente ao compactar -->
    <nav
      class="absolute bottom-0 left-0 right-0 hidden md:flex items-center justify-center gap-8 pb-3.5
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

    <!-- ─── Ações direita — desktop (lupa + pedidos + cesta) ─── -->
    <div class="absolute right-5 md:right-8 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center gap-3">

      <AppTooltip label="Buscar">
        <button
          @click="searchOpen = true"
          class="p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
          aria-label="Buscar"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </button>
      </AppTooltip>

      <AppTooltip label="Acompanhar pedido">
        <NuxtLink
          to="/meus-pedidos"
          class="p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
          aria-label="Acompanhar pedido"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22V12"/><path d="M20.27 18.27 22 20"/><path d="M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559"/><path d="M3.29 7 12 12l8.71-5"/><path d="m7.5 4.27 8.997 5.148"/><circle cx="18.5" cy="16.5" r="2.5"/>
          </svg>
        </NuxtLink>
      </AppTooltip>

      <AppTooltip label="Carrinho">
        <button
          @click="cartOpen = true"
          class="relative p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200"
          aria-label="Carrinho"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"/>
            <path d="M8 11V6a4 4 0 0 1 8 0v5"/>
          </svg>
          <span v-if="totalItems > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-white text-[#2F5946] font-body font-bold text-[10px] rounded-full flex items-center justify-center leading-none">
            {{ totalItems > 99 ? '99+' : totalItems }}
          </span>
        </button>
      </AppTooltip>

    </div>

    <!-- ─── Hamburger — mobile sempre + desktop no compacto ─── -->
    <div
      class="absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-all duration-300"
      :class="isHero ? 'md:opacity-0 md:pointer-events-none' : 'md:opacity-100 md:pointer-events-auto'"
    >
      <button @click="mobileOpen = !mobileOpen" class="p-2 text-white hover:bg-white/10 transition-colors rounded" :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'">
        <div class="relative w-6 h-6">
          <svg class="absolute inset-0 w-6 h-6 transition-all duration-300" :class="mobileOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/>
          </svg>
          <svg class="absolute inset-0 w-6 h-6 transition-all duration-300" :class="mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
          </svg>
        </div>
      </button>
    </div>

    <!-- ─── Ações direita — mobile (lupa + pedidos + cesta, sempre visíveis) ─── -->
    <div class="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex md:hidden items-center gap-1">
      <button @click="searchOpen = true" class="p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200" aria-label="Pesquisar">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </button>
      <NuxtLink to="/meus-pedidos" class="p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200" aria-label="Meus pedidos">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 22V12"/><path d="M20.27 18.27 22 20"/><path d="M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559"/><path d="M3.29 7 12 12l8.71-5"/><path d="m7.5 4.27 8.997 5.148"/><circle cx="18.5" cy="16.5" r="2.5"/>
        </svg>
      </NuxtLink>
      <button @click="cartOpen = true" class="relative p-2 text-white hover:bg-white/15 rounded-lg transition-colors duration-200" aria-label="Abrir cesta de compras">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z"/>
          <path d="M8 11V6a4 4 0 0 1 8 0v5"/>
        </svg>
        <span v-if="totalItems > 0" class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-white text-[#2F5946] font-body font-bold text-[10px] rounded-full flex items-center justify-center leading-none">
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
          <div class="flex flex-col items-center">
            <img src="/images/logo_passarinho_2.png" alt="Quintal dos Mineiros" class="h-[29px] w-[29px] object-contain" />
            <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-[26px] object-contain -mt-0.5" />
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

        <!-- Ícones de contato -->
        <div class="px-6 py-5 border-t border-white/10 flex items-center justify-center gap-6">

          <!-- WhatsApp -->
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/60 hover:text-white transition-colors duration-200"
            aria-label="WhatsApp"
          >
            <svg style="width:20px;height:20px" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a
            href="https://instagram.com/quintaldosmineiros"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white/60 hover:text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg style="width:20px;height:20px" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>

          <!-- Email -->
          <a
            href="mailto:contato@quintaldosmineiros.com.br"
            class="text-white/60 hover:text-white transition-colors duration-200"
            aria-label="E-mail"
          >
            <svg style="width:20px;height:20px" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>

        </div>

      </aside>
    </Transition>
  </Teleport>

  <!-- ─── Overlay de Busca ─── -->
  <SearchOverlay :is-open="searchOpen" @close="searchOpen = false" />
</template>
