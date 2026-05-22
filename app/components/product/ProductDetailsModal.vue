<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Overlay -->
        <div class="absolute inset-0 bg-[#2C1810]/60 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />

        <!-- Modal panel -->
        <Transition
          enter-active-class="transition-all duration-250 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-3"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
          appear
        >
          <div
            v-if="modelValue"
            role="dialog"
            aria-modal="true"
            :aria-label="product?.name"
            class="relative z-10 w-full max-w-[1100px] bg-[#F8F5EF] rounded-3xl shadow-2xl overflow-hidden"
          >
            <!-- Botão fechar -->
            <button
              class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#2C1810]/8 hover:bg-[#2C1810]/15 text-[#3D2B1F] transition-colors duration-200"
              @click="$emit('update:modelValue', false)"
              aria-label="Fechar"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="p-6 sm:p-8 lg:p-10">

              <!-- ─── SEÇÃO HERO: título + benefícios ─── -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-5">

                <!-- Lado esquerdo: título editorial -->
                <div class="flex flex-col justify-center gap-3">
                  <p class="font-body text-[10px] font-semibold text-[#2F5946] tracking-[0.18em] uppercase">
                    Quintal dos Mineiros · Curadoria Especial
                  </p>

                  <h2 class="font-display font-bold text-3xl sm:text-4xl text-[#2C1810] leading-[1.1]">
                    Torresmo Crocante em 5 Minutos.<br>
                    <span class="text-[#8C3B2A]">Sem Estouros. Sem Sujeira.</span>
                  </h2>

                  <p class="font-body text-sm text-[#3D2B1F]/80 leading-relaxed">
                    A crocância de Minas na sua casa com a praticidade que faltava. Nossa curadoria encontrou uma receita de família muito especial — você só faz a melhor parte: a pururuca perfeita, com total segurança.
                  </p>
                </div>

                <!-- Lado direito: benefícios -->
                <div class="flex flex-col gap-3 justify-center">

                  <div
                    v-for="benefit in benefits"
                    :key="benefit.title"
                    class="flex items-center gap-3 p-3.5 rounded-xl bg-[#F3EBDD]/60 border border-[#E7D7BC]/50"
                  >
                    <div class="shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-[#E7D7BC]">
                      <svg class="w-4 h-4 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                        <path v-for="(d, i) in benefit.paths" :key="i" :d="d" stroke-linecap="round" stroke-linejoin="round" />
                        <circle v-if="benefit.circle" cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-body text-[10px] font-bold text-[#2F5946] tracking-widest uppercase">{{ benefit.title }}</p>
                      <p class="font-body text-xs text-[#3D2B1F]/70 mt-0.5">{{ benefit.desc }}</p>
                    </div>
                  </div>

                </div>
              </div>

              <!-- ─── DIVIDER ─── -->
              <div class="relative flex items-center gap-4 mb-5">
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7D7BC] to-transparent" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#D88A1C] shrink-0" />
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7D7BC] to-transparent" />
              </div>

              <!-- ─── SEÇÃO: Ocasiões ─── -->
              <div>
                <p class="font-display font-bold text-xl text-[#2C1810] text-center mb-4">
                  Perfeito para Todas as Ocasiões:
                </p>

                <div class="grid grid-cols-3 gap-3">
                  <div
                    v-for="occasion in occasions"
                    :key="occasion.title"
                    class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/70 border border-[#E7D7BC]/60 text-center hover:-translate-y-0.5 transition-transform duration-200"
                  >
                    <div class="w-9 h-9 flex items-center justify-center rounded-full bg-[#F3EBDD] border border-[#E7D7BC]">
                      <svg class="w-4.5 h-4.5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.6" viewBox="0 0 24 24">
                        <path v-for="(d, i) in occasion.paths" :key="i" :d="d" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p class="font-body text-[10px] font-bold text-[#2F5946] tracking-widest uppercase">{{ occasion.title }}</p>
                    <p class="font-body text-xs text-[#3D2B1F]/70 leading-snug">{{ occasion.desc }}</p>
                  </div>
                </div>

                <p class="mt-4 font-body text-[11px] text-[#7A6355] text-center">
                  Snack naturalmente <strong class="font-semibold text-[#3D2B1F]">rico em creatina e proteínas</strong>, em especial o colágeno
                </p>
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/composables/useProduct'

const props = defineProps<{
  modelValue: boolean
  product?: ProductDetail | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const benefits = [
  {
    title: '5 Minutos e Tá na Mesa:',
    desc: 'É só levar à panela. Incrivelmente rápido.',
    circle: true,
    paths: ['M12 6v6l4 2'],
  },
  {
    title: 'Sua Cozinha Fica Limpa:',
    desc: 'Sem fumaça, sem respingos. É quase mágica.',
    circle: false,
    paths: ['M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'],
  },
  {
    title: 'Sempre à Mão na Despensa:',
    desc: 'Não precisa de geladeira. É a sua arma secreta.',
    circle: false,
    paths: ['M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z', 'M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z'],
  },
]

const occasions = [
  {
    title: 'Tira-Gosto',
    desc: 'Ideal para a cerveja com os amigos.',
    paths: ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
  },
  {
    title: 'Toque Crocante',
    desc: 'Em caldos e no feijão tropeiro.',
    paths: ['M12 6v6m0 0v6m0-6h6m-6 0H6', 'M21 12a9 9 0 11-18 0 9 9 0 0118 0z'],
  },
  {
    title: 'Snack Proteico',
    desc: 'Para qualquer hora do dia.',
    paths: ['M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z', 'M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z', 'M8 13h.01M12 13h.01M16 13h.01'],
  },
]

function close() {
  emit('update:modelValue', false)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(() => props.modelValue, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
  } else {
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>
