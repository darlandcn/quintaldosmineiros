<template>
  <form class="space-y-4" @submit.prevent="submit">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          @input="form.name = capitalizeFirst(form.name)"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
          @input="form.description = capitalizeFirst(form.description)"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
        <input
          v-model.number="form.stock"
          type="number"
          min="0"
          required
          class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">Imagem</label>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onFileChange"
        />

        <!-- Preview -->
        <div v-if="previewUrl" class="relative mb-3 w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
          <img :src="previewUrl" class="w-full h-full object-cover" alt="preview" />
          <button
            type="button"
            class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium"
            @click="fileInput?.click()"
          >
            Trocar imagem
          </button>
        </div>

        <!-- Dropzone -->
        <div
          v-else
          class="flex flex-col items-center justify-center w-full h-36 rounded-lg border-2 border-dashed transition-colors cursor-pointer"
          :class="isDragging ? 'border-gray-500 bg-gray-100' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'"
          @click="fileInput?.click()"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="onDrop"
        >
          <svg class="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <p class="text-sm text-gray-500">
            {{ isDragging ? 'Solte a imagem aqui' : 'Arraste ou clique para selecionar' }}
          </p>
          <p class="text-xs text-gray-400 mt-1">PNG, JPG, WEBP</p>
        </div>
      </div>
    </div>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

    <div class="flex gap-3 pt-1">
      <button
        type="submit"
        :disabled="saving"
        class="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 transition-colors"
      >
        {{ saving ? 'Salvando...' : 'Salvar' }}
      </button>
      <button
        type="button"
        class="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
        @click="$emit('cancel')"
      >
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { AdminProduct, NewProduct } from '~/composables/useAdminProducts'

const props = defineProps<{
  product?: AdminProduct
}>()

const emit = defineEmits<{
  saved: []
  cancel: []
}>()

const { createProduct, updateProduct, uploadImage } = useAdminProducts()

const saving = ref(false)
const error = ref('')
const isDragging = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string>(props.product?.images?.[0] ?? '')

const form = reactive<NewProduct>({
  name: props.product?.name ?? '',
  description: props.product?.description ?? '',
  price: props.product?.price ?? 0,
  stock: props.product?.stock ?? 0,
  images: props.product?.images ?? [],
})

function capitalizeFirst(val: string) {
  return val ? val.charAt(0).toUpperCase() + val.slice(1) : val
}

function setFile(file: File) {
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) setFile(file)
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file && file.type.startsWith('image/')) setFile(file)
}

async function submit() {
  saving.value = true
  error.value = ''
  try {
    if (selectedFile.value) {
      const url = await uploadImage(selectedFile.value)
      form.images = [url]
    }

    if (props.product) {
      await updateProduct(props.product.id, { ...form })
    } else {
      await createProduct({ ...form })
    }

    emit('saved')
  } catch (e: any) {
    error.value = e?.message ?? 'Erro ao salvar produto.'
  } finally {
    saving.value = false
  }
}
</script>
