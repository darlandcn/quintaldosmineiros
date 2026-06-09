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
            class="relative z-10 w-full max-w-[900px] bg-[#F8F5EF] rounded-2xl shadow-2xl overflow-hidden"
          >
            <!-- Botão fechar -->
            <button
              class="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-[#2C1810]/8 hover:bg-[#2C1810]/15 text-[#3D2B1F] transition-colors duration-200"
              aria-label="Fechar"
              @click="$emit('update:modelValue', false)"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div class="p-5 sm:p-7 lg:p-8">

              <!-- ─── HERO: título + benefícios ─── -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4">

                <!-- Título -->
                <div class="flex flex-col justify-center gap-2">
                  <p class="font-body text-[9px] font-semibold text-[#2F5946] tracking-[0.18em] uppercase">
                    Quintal dos Mineiros · Curadoria Especial
                  </p>
                  <h2 class="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[#2C1810] leading-[1.15]">
                    Torresmo Crocante em 5 Minutos.<br>
                    <span class="text-[#8C3B2A]">Sem Estouros. Sem Sujeira.</span>
                  </h2>
                  <p class="font-body text-xs text-[#3D2B1F]/80 leading-relaxed">
                    A crocância de Minas na sua casa com a praticidade que faltava. Você só faz a melhor parte: a pururuca perfeita, com total segurança.
                  </p>
                </div>

                <!-- Benefícios -->
                <div class="flex flex-col gap-2 justify-center">
                  <div
                    v-for="benefit in benefits"
                    :key="benefit.title"
                    class="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#F3EBDD]/60 border border-[#E7D7BC]/50"
                  >
                    <div class="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#E7D7BC]">
                      <svg class="w-3.5 h-3.5 text-[#2F5946]" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
                        <path v-for="(d, i) in benefit.paths" :key="i" :d="d" stroke-linecap="round" stroke-linejoin="round" />
                        <circle v-if="benefit.circle" cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div>
                      <p class="font-body text-[9px] font-bold text-[#2F5946] tracking-widest uppercase">{{ benefit.title }}</p>
                      <p class="font-body text-[11px] text-[#3D2B1F]/70 mt-0.5">{{ benefit.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ─── DIVIDER ─── -->
              <div class="relative flex items-center gap-4 mb-4">
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7D7BC] to-transparent" />
                <div class="w-1.5 h-1.5 rounded-full bg-[#D88A1C] shrink-0" />
                <div class="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7D7BC] to-transparent" />
              </div>

              <!-- ─── FAQ ─── -->
              <div>
                <p class="font-display font-bold text-base sm:text-lg text-[#2C1810] text-center mb-3">
                  Perguntas frequentes
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div
                    v-for="faq in faqs"
                    :key="faq.q"
                    class="p-3 rounded-xl bg-white/70 border border-[#E7D7BC]/60"
                  >
                    <p class="font-body text-xs font-bold text-[#2C1810] mb-1">{{ faq.q }}</p>
                    <p class="font-body text-[11px] text-[#3D2B1F]/70 leading-relaxed">{{ faq.a }}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { ProductDetail } from '~/shared/types'

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

const faqs = [
  {
    q: 'Como preparo?',
    a: 'Aqueça uma panela em fogo médio, despeje o conteúdo e mexa por cerca de 5 minutos até atingir a pururuca dourada. Sem óleo, sem complicação.',
  },
  {
    q: 'Precisa de geladeira?',
    a: 'Antes de abrir, não — fica tranquilo na despensa em temperatura ambiente. Depois de aberto, conserve na geladeira.',
  },
  {
    q: 'Qual a validade do produto?',
    a: 'Nossos lotes têm validade de 6 meses (fechados). Após aberto, recomendamos o consumo imediato para garantir a máxima crocância.',
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
