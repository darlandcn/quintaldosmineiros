<template>
  <aside class="w-48 h-screen bg-[#2F5946] text-white flex flex-col shrink-0">

    <!-- Brand -->
    <div class="px-4 py-4 border-b border-white/10 flex items-center justify-center gap-0">
      <img src="/images/logo_passarinho_2.png" alt="" class="h-12 w-auto" />
      <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-11 w-auto" />
    </div>

    <!-- Ver loja -->
    <div class="px-2.5 py-3">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm text-white/70 hover:bg-white/15 hover:text-white transition-colors"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Ver loja
      </NuxtLink>
    </div>

    <div class="border-t border-white/10" />

    <!-- Nav -->
    <nav class="flex-1 px-2.5 py-3 space-y-0.5">
      <NuxtLink
        to="/admin"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors"
        :class="isActive('/admin')
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:bg-white/15 hover:text-white'"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
        Dashboard
      </NuxtLink>

      <NuxtLink
        to="/admin/pedidos"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors"
        :class="isActive('/admin/pedidos')
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:bg-white/15 hover:text-white'"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0M3.75 9h16.5" />
        </svg>
        Pedidos
      </NuxtLink>

      <NuxtLink
        to="/admin/produtos"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors"
        :class="isActive('/admin/produtos')
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:bg-white/15 hover:text-white'"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 3H8L6 7h12l-2-4z" />
        </svg>
        Produtos
      </NuxtLink>

      <NuxtLink
        to="/admin/clientes"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors"
        :class="isActive('/admin/clientes')
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:bg-white/15 hover:text-white'"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        Clientes
      </NuxtLink>

      <NuxtLink
        to="/admin/financeiro"
        class="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-colors"
        :class="isActive('/admin/financeiro')
          ? 'bg-white/20 text-white'
          : 'text-white/70 hover:bg-white/15 hover:text-white'"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
        Financeiro
      </NuxtLink>
    </nav>

    <!-- Logout -->
    <div class="px-2.5 py-3 border-t border-white/10">
      <button
        class="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm text-white/60 hover:bg-white/15 hover:text-white transition-colors"
        @click="logout"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Sair
      </button>
    </div>

  </aside>
</template>

<script setup lang="ts">
const route = useRoute()
const { logout } = useAuth()

function isActive(path: string) {
  return route.path === path
}
</script>
