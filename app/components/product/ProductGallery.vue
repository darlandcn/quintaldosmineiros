<template>
  <div class="flex flex-col gap-3">

    <!-- Imagem principal -->
    <div
      class="relative overflow-hidden rounded-2xl aspect-square bg-[#F5EFE6] border border-[#E7D7BC]/60 shadow-sm"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <img
        :src="activeImage || '/images/placeholder.jpg'"
        :alt="name"
        class="w-full h-full object-cover transition-opacity duration-150"
        :class="{ 'opacity-0': transitioning }"
        @error="(e) => ((e.target as HTMLImageElement).src = '/images/placeholder.jpg')"
      />

      <!-- Setas de navegação -->
      <template v-if="images.length > 1">
        <button
          class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105"
          @click="prevImage"
        >
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105"
          @click="nextImage"
        >
          <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </template>
    </div>

    <!-- Dots — mobile apenas -->
    <div v-if="images.length > 1" class="flex lg:hidden justify-center gap-1.5 mt-2">
      <button
        v-for="(_, i) in images"
        :key="i"
        class="rounded-full transition-all duration-200"
        :class="activeIndex === i ? 'w-4 h-1.5 bg-[#2F5946]' : 'w-1.5 h-1.5 bg-[#2F5946]/25'"
        @click="setActive(i)"
      />
    </div>

    <!-- Miniaturas — desktop apenas -->
    <div
      v-if="images.length > 1"
      ref="thumbsRef"
      class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
    >
      <button
        v-for="(img, i) in images"
        :key="i"
        class="shrink-0 w-[72px] h-[72px] overflow-hidden rounded-xl border-2 transition-all duration-200"
        :class="activeIndex === i
          ? 'border-[#2F5946] shadow-sm ring-2 ring-[#2F5946]/10'
          : 'border-[#E7D7BC] hover:border-[#2F5946]/40'"
        @click="setActive(i)"
      >
        <img
          :src="img"
          :alt="`${name} ${i + 1}`"
          class="w-full h-full object-cover"
          @error="(e) => ((e.target as HTMLImageElement).src = '/images/placeholder.jpg')"
        />
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
const transitioning = ref(false)
const thumbsRef = ref<HTMLElement | null>(null)
const touchStartX = ref(0)

function setActive(index: number) {
  if (index === activeIndex.value) return
  transitioning.value = true
  setTimeout(() => {
    activeIndex.value = index
    transitioning.value = false
  }, 150)
}

function nextImage() {
  setActive((activeIndex.value + 1) % props.images.length)
}

function prevImage() {
  setActive((activeIndex.value - 1 + props.images.length) % props.images.length)
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0]?.clientX ?? 0
}

function onTouchEnd(e: TouchEvent) {
  const diff = touchStartX.value - (e.changedTouches[0]?.clientX ?? touchStartX.value)
  if (Math.abs(diff) < 50) return
  if (diff > 0) nextImage()
  else prevImage()
}

function onKeydown(e: KeyboardEvent) {
  if (props.images.length <= 1) return
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'ArrowLeft') prevImage()
}

watch(activeIndex, (i) => {
  const container = thumbsRef.value
  if (!container) return
  const thumb = container.children[i] as HTMLElement
  if (!thumb) return
  const scrollLeft = thumb.offsetLeft - (container.offsetWidth / 2) + (thumb.offsetWidth / 2)
  container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>
