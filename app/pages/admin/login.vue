<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-[#2F5946]/5 flex items-center justify-center px-4 relative overflow-hidden">

    <!-- Background shapes -->
    <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#2F5946]/5 blur-3xl pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 w-[28rem] h-[28rem] rounded-full bg-[#2F5946]/5 blur-3xl pointer-events-none" />

    <!-- Card -->
    <div class="relative bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-gray-100 w-full max-w-md px-10 py-10">

      <!-- Icon + Title -->
      <div class="flex flex-col items-center gap-4 mb-8">
        <div class="w-12 h-12 rounded-xl bg-[#2F5946]/10 flex items-center justify-center">
          <svg class="w-6 h-6 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <div class="text-center space-y-1">
          <h1 class="text-2xl font-bold text-gray-900 tracking-tight leading-none">Painel Administrativo</h1>
          <p class="text-sm text-gray-400">Entre com sua conta para continuar</p>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-5" @submit.prevent="submit">

        <!-- Email -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-widest">Email</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              v-model="email"
              type="email"
              required
              autocomplete="email"
              placeholder="seu@email.com"
              class="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all"
            />
          </div>
        </div>

        <!-- Senha -->
        <div class="space-y-1.5">
          <label class="block text-xs font-semibold text-gray-500 uppercase tracking-widest">Senha</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
              <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-3.5 flex items-center text-gray-300 hover:text-gray-500 transition-colors"
              @click="showPassword = !showPassword"
            >
              <!-- Olho aberto -->
              <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <!-- Olho fechado -->
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Erro -->
        <div v-if="error" class="flex items-center gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg class="w-4 h-4 text-red-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <p class="text-sm text-red-500">{{ error }}</p>
        </div>

        <!-- Botão -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-2 bg-[#2F5946] hover:bg-[#264a3b] disabled:opacity-60 text-white rounded-xl py-3 text-sm font-semibold tracking-wide transition-colors mt-2"
        >
          <svg
            v-if="loading"
            class="w-4 h-4 animate-spin"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>

      </form>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    await navigateTo('/admin')
  } catch {
    error.value = 'Email ou senha inválidos.'
  } finally {
    loading.value = false
  }
}
</script>
