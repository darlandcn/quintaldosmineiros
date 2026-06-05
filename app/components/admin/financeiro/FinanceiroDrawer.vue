<template>
  <Transition name="drawer">
    <div v-if="showDrawer" class="fixed inset-0 z-40 flex justify-end">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]" @click="emit('close')" />

      <!-- Panel -->
      <div class="drawer-panel relative w-full max-w-[480px] bg-white shadow-2xl flex flex-col">

        <!-- Header -->
        <div class="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              :class="parceiro?.cor"
            >
              <span class="text-xs font-bold" :class="parceiro?.corTexto">{{ parceiro?.sigla }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-800">{{ parceiro?.nome }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ parceiro?.categoria }}</p>
            </div>
          </div>
          <button
            class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            @click="emit('close')"
          >
            <X class="w-4 h-4" />
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto">
          <slot />
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Parceiro } from '~/composables/admin/useFinanceiro'

defineProps<{
  showDrawer: boolean
  parceiro: Parceiro | null
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<style scoped>
.drawer-enter-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active .drawer-panel {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active {
  transition: opacity 0.15s ease;
}
.drawer-leave-active .drawer-panel {
  transition: transform 0.2s ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
