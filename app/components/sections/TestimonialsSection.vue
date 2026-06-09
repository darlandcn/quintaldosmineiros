<script setup lang="ts">
const { testimonials } = useTestimonials()

const carouselRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function scrollTo(index: number) {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.scrollWidth / testimonials.length
  carouselRef.value.scrollTo({ left: cardWidth * index, behavior: 'smooth' })
  currentIndex.value = index
}

function next() {
  scrollTo((currentIndex.value + 1) % testimonials.length)
}

function onScroll() {
  if (!carouselRef.value) return
  const cardWidth = carouselRef.value.scrollWidth / testimonials.length
  currentIndex.value = Math.round(carouselRef.value.scrollLeft / cardWidth)
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, 3000)
}

function stopAutoplay() {
  if (timer) { clearInterval(timer); timer = null }
}

onMounted(() => {
  startAutoplay()
  carouselRef.value?.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  stopAutoplay()
  carouselRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section id="depoimentos" class="bg-[#F3EBDD] py-14 md:py-20">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Cabeçalho da Seção ─── -->
      <div class="mb-14 md:mb-16">
        <SectionHeader
          eyebrow="Histórias de quem já provou Minas"
          title="Histórias de quem<br /><em>já provou de Minas</em>"
          subtitle="Momentos compartilhados por clientes que levaram o sabor mineiro para a própria mesa."
          align="center"
        />
      </div>

      <!-- ─── Mobile: Carrossel ─── -->
      <div class="sm:hidden">
        <div
          ref="carouselRef"
          class="carousel flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2"
          @touchstart="stopAutoplay"
          @touchend="startAutoplay"
        >
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="snap-center flex-shrink-0 w-[85%]"
          >
            <TestimonialCard :testimonial="testimonial" />
          </div>
        </div>

        <!-- Dots -->
        <div class="flex justify-center gap-2 mt-5">
          <button
            v-for="(_, i) in testimonials"
            :key="i"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="i === currentIndex ? 'bg-[#2F5946] w-4' : 'bg-[#2F5946]/30'"
            @click="scrollTo(i); stopAutoplay()"
          />
        </div>
      </div>

      <!-- ─── Desktop: Grade ─── -->
      <div class="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
        <TestimonialCard
          v-for="testimonial in testimonials"
          :key="testimonial.id"
          :testimonial="testimonial"
        />
      </div>

      <!-- ─── Indicador de Confiança ─── -->
      <div class="mt-14 flex flex-col items-center gap-4">
        <div class="flex items-center gap-1.5" aria-label="Avaliação média: 5 estrelas">
          <span
            v-for="i in 5"
            :key="i"
            class="text-[#2F5946] text-2xl"
            aria-hidden="true"
          >★</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.carousel {
  scrollbar-width: none;
}
.carousel::-webkit-scrollbar {
  display: none;
}
</style>
