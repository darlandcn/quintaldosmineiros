<template>
  <form
    class="space-y-4"
    @submit.prevent="submit"
    @dragover.prevent="isDragging = true"
    @dragleave.prevent="isDragging = false"
    @drop.prevent="onDrop"
  >
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

      <!-- ─── Imagens ─── -->
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">Imagens</label>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          class="hidden"
          @change="onFileChange"
        />

        <div
          class="grid grid-cols-3 gap-2 transition-all"
          :class="isDragging ? 'ring-2 ring-gray-400 ring-offset-2 rounded-lg' : ''"
        >
          <!-- Thumbs existentes -->
          <div
            v-for="(item, i) in imageItems"
            :key="i"
            class="relative aspect-square rounded-lg border border-gray-200 bg-gray-50 overflow-hidden"
          >
            <img :src="getThumbUrl(item)" class="w-full h-full object-cover" alt="" />

            <!-- Overlay de loading para arquivos novos -->
            <div
              v-if="typeof item !== 'string'"
              class="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <svg class="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>

            <!-- Badge Principal -->
            <span
              v-if="i === 0"
              class="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none"
            >
              Principal
            </span>

            <!-- Botão remover -->
            <button
              type="button"
              class="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              @click="removeImage(i)"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Botão adicionar -->
          <button
            v-if="imageItems.length < 6"
            type="button"
            class="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-1 transition-colors"
            :class="imageItems.length >= 6 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:border-gray-400'"
            :disabled="imageItems.length >= 6"
            @click="fileInput?.click()"
          >
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span class="text-[11px] text-gray-400 font-medium">Adicionar foto</span>
          </button>
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
import type { AdminProduct, NewProduct } from '~/shared/types'

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

const imageItems = ref<(string | File)[]>(props.product?.images ?? [])

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

function getThumbUrl(item: string | File): string {
  return typeof item === 'string' ? item : URL.createObjectURL(item)
}

function removeImage(index: number) {
  imageItems.value.splice(index, 1)
}

function onFilesSelected(files: FileList | null) {
  if (!files) return
  const remaining = 6 - imageItems.value.length
  const toAdd = Array.from(files).slice(0, remaining)
  imageItems.value.push(...toAdd)
}

function onFileChange(e: Event) {
  onFilesSelected((e.target as HTMLInputElement).files)
  if (fileInput.value) fileInput.value.value = ''
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  onFilesSelected(e.dataTransfer?.files ?? null)
}

async function submit() {
  saving.value = true
  error.value = ''
  try {
    const finalImages: string[] = []
    for (const item of imageItems.value) {
      if (typeof item === 'string') {
        finalImages.push(item)
      } else {
        const url = await uploadImage(item)
        finalImages.push(url)
      }
    }
    form.images = finalImages

    if (props.product) {
      await updateProduct(props.product.id, { ...form })
    } else {
      await createProduct({ ...form })
    }

    emit('saved')
  } catch (e: unknown) {
    error.value = (e as Error)?.message ?? 'Erro ao salvar produto.'
  } finally {
    saving.value = false
  }
}
</script>
