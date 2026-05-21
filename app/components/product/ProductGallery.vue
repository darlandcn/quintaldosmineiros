<template>
  <div class="flex flex-col gap-3">

    <!-- Imagem principal -->
    <div class="relative overflow-hidden rounded-2xl aspect-square bg-[#F5EFE6] border border-[#E7D7BC]/60 shadow-sm">
      <img
        :src="activeImage || '/images/placeholder.jpg'"
        :alt="name"
        class="w-full h-full object-cover transition-all duration-500"
      />
    </div>

    <!-- Miniaturas -->
    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="(img, i) in images"
        :key="i"
        class="shrink-0 w-[72px] h-[72px] overflow-hidden rounded-xl border-2 transition-all duration-200"
        :class="activeIndex === i
          ? 'border-[#2F5946] shadow-sm ring-2 ring-[#2F5946]/10'
          : 'border-[#E7D7BC] hover:border-[#2F5946]/40'"
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
