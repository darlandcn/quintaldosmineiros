<script setup lang="ts">
const headlines = [
  { normal: 'O sabor de Minas', italic: 'servido à mesa.' },
  { normal: 'O jeito mineiro de', italic: 'surpreender quem você ama.' },
]

const current  = ref(0)
const show     = ref(true)
const headline = computed(() => headlines[current.value]!)

onMounted(() => {
  const cycle = setInterval(() => {
    show.value = false
    setTimeout(() => {
      current.value = (current.value + 1) % headlines.length
      show.value = true
    }, 650)
  }, 5000)

  onUnmounted(() => clearInterval(cycle))
})
</script>

<template>
  <section
    class="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
    style="background-image: url('/images/hero_image_2.png')"
  >
    <!-- Overlay atmosférico -->
    <div class="absolute inset-0 hero-overlay" />

    <!-- Conteúdo — posicionado no terço inferior (leitura cinematográfica) -->
    <div class="relative z-10 min-h-screen flex flex-col justify-end
                px-8 md:px-16 lg:px-24 pb-24 md:pb-14 pt-36">

      <!-- Headline rotativa — container de altura fixa para evitar layout shift -->
      <div class="relative h-36 md:h-40 lg:h-48 mb-8">
        <Transition name="headline">
          <h1
            v-if="show"
            :key="current"
            class="absolute font-display text-white text-hero-shadow
                   text-[2.3rem] md:text-[2.7rem] lg:text-[3.35rem]
                   font-light leading-[1.12] tracking-[-0.01em]"
          >
            <span class="block">{{ headline.normal }}</span>
            <em class="block not-italic -mt-1">
              <i>{{ headline.italic }}</i>
            </em>
          </h1>
        </Transition>
      </div>

      <!-- Subheadline fixa -->
      <p class="font-subheadline text-white/90 text-[1.05rem] md:text-lg
                font-light leading-relaxed tracking-wide max-w-md mb-8
                text-hero-shadow -mt-4">
        Queijos artesanais, cafés especiais e sabores preparados para
        transformar pequenos momentos em memórias inesquecíveis.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-3">
        <a
          href="#kits"
          class="inline-flex items-center justify-center px-8 py-3.5
                 bg-[#2F5946] hover:bg-[#254637] text-white
                 font-subheadline text-xs font-semibold tracking-[0.15em] uppercase
                 transition-all duration-300 border border-[#2F5946] hover:border-[#254637]"
        >
          Escolher meu kit
        </a>
        <a
          href="#produtos"
          class="inline-flex items-center justify-center px-8 py-3.5
                 bg-transparent hover:bg-white/10 text-white
                 font-subheadline text-xs font-semibold tracking-[0.15em] uppercase
                 transition-all duration-300 border border-white/40 hover:border-white/70"
        >
          Ver sabores favoritos
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Entrada: sobe suavemente do baixo com blur se dissolvendo */
.headline-enter-active {
  transition:
    opacity  0.95s ease,
    filter   0.95s ease,
    transform 0.95s cubic-bezier(0.16, 1, 0.3, 1);
}
/* Saída: sobe levemente e some com blur */
.headline-leave-active {
  transition:
    opacity  0.5s ease,
    filter   0.5s ease,
    transform 0.5s ease;
}

.headline-enter-from {
  opacity: 0;
  filter: blur(14px);
  transform: translateY(22px);
}
.headline-enter-to {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
.headline-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
.headline-leave-to {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(-12px);
}
</style>
