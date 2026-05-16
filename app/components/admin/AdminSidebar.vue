<template>
  <aside class="w-56 h-screen bg-[#2F5946] text-white flex flex-col shrink-0">

    <!-- Brand -->
    <div class="px-5 py-5 border-b border-white/10 flex items-center justify-center gap-0">
      <img src="/images/logo_passarinho_2.png" alt="" class="h-15 w-auto" />
      <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-14 w-auto" />
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-3 py-4 space-y-0.5">
      <NuxtLink
        to="/admin"
        class="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors"
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
        class="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors"
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
        class="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors"
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
    </nav>

    <!-- Logout -->
    <div class="px-3 py-4 border-t border-white/10">
      <button
        class="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-white/60 hover:bg-white/15 hover:text-white transition-colors"
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
