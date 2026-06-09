<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

interface Props {
  title: string
  backTo?: RouteLocationRaw
}

const props = defineProps<Props>()
const emit = defineEmits<{ back: [] }>()

const router = useRouter()

function handleBack() {
  if (props.backTo) {
    router.push(props.backTo)
  } else {
    emit('back')
  }
}
</script>

<template>
  <div class="bg-[#2F5946] sticky top-0 z-10 shadow-[0_2px_20px_rgba(44,24,16,0.2)]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center relative">

      <NuxtLink to="/" class="absolute left-4 sm:left-6">
        <img src="/images/logo_passarinho_2.png" alt="Quintal dos Mineiros" class="h-10 w-auto" />
      </NuxtLink>

      <span class="font-display text-base font-semibold text-white">{{ title }}</span>

      <button
        class="absolute right-4 sm:right-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 font-body text-sm group"
        @click="handleBack"
      >
        <svg class="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </button>

    </div>
  </div>
</template>
