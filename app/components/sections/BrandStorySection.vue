<script setup lang="ts">
import { Leaf, BadgeCheck, Package, Heart } from 'lucide-vue-next'

const highlights = [
  { icon: Leaf,       label: 'Origem artesanal' },
  { icon: BadgeCheck, label: 'Curadoria cuidadosa' },
  { icon: Package,    label: 'Feito para presentear' },
  { icon: Heart,      label: 'Minas em cada detalhe' },
]
</script>

<template>
  <!-- Seção de história da marca — fundo creme quente e atmosfera acolhedora -->
  <section id="historia" class="bg-[#FAF6EE] py-14 md:py-20 overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 md:px-8">

      <!-- ─── Layout de Duas Colunas ─── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <!-- ─── Coluna de Texto ─── -->
        <div class="order-2 lg:order-1">

          <!-- Eyebrow -->
          <div class="flex items-center gap-3 mb-6">
            <div class="h-px w-8 bg-[#2F5946]/60" aria-hidden="true" />
            <span class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946]">
              Nossa História
            </span>
          </div>

          <!-- Headline -->
          <h2 class="font-display font-semibold text-[#2C1810] text-3xl md:text-4xl lg:text-[2.6rem] leading-tight mb-6">
            Sabores que carregam histórias.
          </h2>

          <!-- Texto narrativo -->
          <div class="space-y-5 mb-8">
            <p class="font-body text-base md:text-lg text-[#7A6355] leading-relaxed">
              Entre cafés passados sem pressa, receitas de família e mesas cheias de afeto,
              nasceu o Quintal dos Mineiros.
            </p>
            <p class="font-body text-base md:text-lg text-[#7A6355] leading-relaxed">
              Selecionamos sabores artesanais que carregam o verdadeiro espírito de Minas —
              queijos curados, doces feitos no tacho e tradições que transformam qualquer
              encontro em memória.
            </p>
            <p class="font-body text-base md:text-lg text-[#7A6355] leading-relaxed">
              Porque alguns sabores não alimentam apenas a mesa. Permanecem na lembrança.
            </p>
          </div>

          <!-- Frase de fechamento -->
          <p class="font-body text-base text-[#7A6355] italic mb-8 leading-relaxed">
            Feito com o tempo, o cuidado e os sabores que fazem parte da tradição mineira.
          </p>

          <!-- Highlights em linha -->
          <div class="flex flex-wrap gap-x-7 gap-y-3 mb-8">
            <span
              v-for="h in highlights"
              :key="h.label"
              class="flex items-center gap-2 text-[#7A6355]/80"
            >
              <component
                :is="h.icon"
                :size="15"
                :stroke-width="1.5"
                class="flex-shrink-0 text-[#2F5946]/70"
                aria-hidden="true"
              />
              <span class="font-body text-[0.8rem] tracking-wide text-[#7A6355]">{{ h.label }}</span>
            </span>
          </div>

          <!-- CTA textual -->
          <a
            href="#produtos"
            class="font-body text-sm font-semibold text-[#2F5946] hover:text-[#254637] transition-colors duration-200 inline-flex items-center gap-1"
          >
            Explorar nossa curadoria →
          </a>
        </div>

        <!-- ─── Coluna de Imagem Editorial ─── -->
        <div class="order-1 lg:order-2 relative">

          <!-- Imagem principal -->
          <div class="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl scale-[1.12]">
            <img
              src="/images/story_image.png"
              alt="Mesa mineira com queijo, doce de leite, pão e café sendo servido"
              class="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
