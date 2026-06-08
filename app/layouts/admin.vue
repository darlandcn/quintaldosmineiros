<template>
  <div class="flex h-screen w-screen overflow-hidden bg-[#f8faf8]">
    <!-- Sidebar desktop -->
    <AdminSidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header mobile -->
      <header class="flex md:hidden items-center justify-between px-4 py-2 bg-[#2F5946] shrink-0">
        <!-- Logo vira link para a loja -->
        <NuxtLink to="/" class="flex items-center gap-1">
          <img src="/images/logo_passarinho_2.png" alt="" class="h-9 w-auto" />
          <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-8 w-auto" />
        </NuxtLink>

        <!-- Botão Sair -->
        <button
          class="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors"
          @click="logout"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </header>

      <!-- Conteúdo principal -->
      <main class="flex-1 overflow-y-auto flex flex-col pb-16 md:pb-0">
        <slot />
      </main>
    </div>

    <!-- Bottom nav mobile -->
    <nav class="fixed bottom-0 left-0 right-0 z-50 bg-[#2F5946] border-t border-white/10 flex md:hidden">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-xs transition-colors"
        :class="isActive(item.to) ? 'text-white' : 'text-white/50'"
      >
        <component :is="item.icon" class="w-5 h-5" :stroke-width="isActive(item.to) ? 2.25 : 1.75" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { LayoutGrid, ClipboardList, ShoppingBag, Users, DollarSign } from 'lucide-vue-next'

const route = useRoute()
const { logout } = useAuth()

const navItems = [
  { to: '/admin',            label: 'Dashboard',  icon: LayoutGrid },
  { to: '/admin/pedidos',    label: 'Pedidos',    icon: ClipboardList },
  { to: '/admin/produtos',   label: 'Produtos',   icon: ShoppingBag },
  { to: '/admin/clientes',   label: 'Clientes',   icon: Users },
  { to: '/admin/financeiro', label: 'Financeiro', icon: DollarSign },
]

function isActive(path: string) {
  return route.path === path
}
</script>
