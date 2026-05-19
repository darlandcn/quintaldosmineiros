<template>
  <div class="flex flex-col gap-3">

    <!-- Imagem principal -->
    <div class="relative overflow-hidden aspect-square bg-[#F5EFE6] border border-[#2F5946]/20">
      <img
        :src="activeImage || '/images/placeholder.jpg'"
        :alt="name"
        class="w-full h-full object-cover transition-opacity duration-300"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#2C1810]/20 via-transparent to-transparent pointer-events-none" />
    </div>

    <!-- Miniaturas -->
    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="shrink-0 w-16 h-16 overflow-hidden border-2 transition-all duration-200"
        :class="activeIndex === i
          ? 'border-[#2F5946]'
          : 'border-[#2F5946]/20 hover:border-[#2F5946]/50'"
        @click="activeIndex = i"
      >
        <img :src="img" :alt="`${name} ${i + 1}`" class="w-full h-full object-cover" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  name: string
}>()

const activeIndex = ref(0)
const activeImage = computed(() => props.images[activeIndex.value] ?? '')
</script>
