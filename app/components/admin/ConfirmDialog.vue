<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="$emit('cancel')" />

    <div class="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-4">
      <p class="text-sm text-gray-800 font-medium mb-1">{{ title }}</p>
      <p v-if="description" class="text-sm text-gray-500 mb-5">{{ description }}</p>

      <div class="flex gap-3 justify-end">
        <button
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          @click="$emit('confirm')"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>
