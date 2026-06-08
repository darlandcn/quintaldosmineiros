<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="!loading && $emit('cancel')" />

    <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
      <p class="text-sm text-gray-800 font-medium mb-1">{{ title }}</p>
      <p
        v-if="description"
        class="text-sm mb-5"
        :class="error ? 'text-red-500' : 'text-gray-500'"
      >
        {{ description }}
      </p>

      <div class="flex gap-3 justify-end">
        <button
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-40"
          :disabled="loading"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-60 flex items-center gap-2"
          :disabled="loading"
          @click="$emit('confirm')"
        >
          <svg v-if="loading" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {{ loading ? 'Excluindo...' : 'Excluir' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  loading?: boolean
  error?: boolean
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>
