<template>
  <div id="error-page" class="min-h-screen flex flex-col items-center justify-center bg-[#FAF6EE] px-6">
    <div class="text-center max-w-md">
      <p class="font-editorial text-8xl font-light text-[#D88A1C] mb-4">
        {{ error.statusCode || '?' }}
      </p>
      <h1 class="font-display text-2xl font-bold text-[#2C1810] mb-3">
        {{ title }}
      </h1>
      <p class="font-body text-[#7A6355] mb-8">
        {{ error.message || 'Algo inesperado aconteceu. Tente novamente.' }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          class="px-6 py-3 bg-[#2F5946] text-white font-body font-medium rounded-xl hover:bg-[#254637] transition-colors"
          @click="handleError"
        >
          Voltar ao início
        </button>
        <button
          class="px-6 py-3 border border-[#D88A1C] text-[#D88A1C] font-body font-medium rounded-xl hover:bg-[#D88A1C]/10 transition-colors"
          @click="clearError({ redirect: '/admin' })"
        >
          Área admin
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useError, clearError } from '#app'

const error = useError()

const title = computed(() => {
  switch (error.value?.statusCode) {
    case 404: return 'Página não encontrada'
    case 403: return 'Acesso negado'
    case 500: return 'Erro interno'
    default:  return 'Algo deu errado'
  }
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>
