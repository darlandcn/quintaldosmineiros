<template>
  <div class="min-h-screen bg-[#FDFAF6] flex flex-col">
    <!-- Header minimalista -->
    <div class="border-b border-[#E7D7BC]/60">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
        <NuxtLink
          to="/"
          class="font-display text-base font-semibold text-[#2C1810]"
        >
          Quintal dos Mineiros
        </NuxtLink>
      </div>
    </div>

    <!-- Conteúdo central -->
    <div class="flex-1 flex items-center justify-center px-4 py-16">
      <div class="w-full max-w-md text-center">

        <!-- Ícone de sucesso -->
        <div class="w-20 h-20 rounded-full bg-[#2F5946]/10 flex items-center justify-center mx-auto mb-8">
          <svg class="w-10 h-10 text-[#2F5946]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <!-- Título -->
        <h1 class="font-display text-3xl font-semibold text-[#2C1810] mb-3">
          Pedido recebido!
        </h1>

        <!-- Saudação -->
        <p v-if="nome" class="font-body text-[#7A6355] text-base leading-relaxed mb-2">
          Obrigado, <strong class="text-[#2C1810] font-semibold">{{ nome }}</strong>!
        </p>
        <p class="font-body text-[#7A6355] text-sm leading-relaxed mb-8">
          Seu pedido foi registrado com sucesso. Entraremos em contato em breve para confirmar os detalhes e combinar a entrega.
        </p>

        <!-- Separador decorativo -->
        <div class="separator-gold mb-8" />

        <!-- Informações de próximos passos -->
        <div class="bg-white border border-[#E7D7BC]/60 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div class="flex items-start gap-3">
            <span class="text-lg mt-0.5">📞</span>
            <div>
              <p class="font-body text-sm font-semibold text-[#2C1810]">Confirmação em breve</p>
              <p class="font-body text-xs text-[#7A6355] mt-0.5">Você receberá um contato por WhatsApp ou e-mail.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-lg mt-0.5">🚚</span>
            <div>
              <p class="font-body text-sm font-semibold text-[#2C1810]">Entrega combinada</p>
              <p class="font-body text-xs text-[#7A6355] mt-0.5">O frete será acordado no momento da confirmação.</p>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <span class="text-lg mt-0.5">🌿</span>
            <div>
              <p class="font-body text-sm font-semibold text-[#2C1810]">Produção artesanal</p>
              <p class="font-body text-xs text-[#7A6355] mt-0.5">Seus produtos são preparados com cuidado especial.</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <NuxtLink
          to="/catalogo"
          class="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#2F5946] hover:bg-[#254637] text-white font-body text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mb-3"
        >
          Continuar comprando
        </NuxtLink>
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center gap-2 w-full py-3.5 border border-[#E7D7BC] text-[#7A6355] hover:text-[#2C1810] hover:border-[#2C1810]/20 font-body text-sm font-medium rounded-xl transition-all duration-200"
        >
          Voltar para a loja
        </NuxtLink>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const nome = computed(() => {
  const n = route.query.nome
  return typeof n === 'string' ? n : ''
})

useHead({
  title: 'Pedido Confirmado — Quintal dos Mineiros',
})
</script>
