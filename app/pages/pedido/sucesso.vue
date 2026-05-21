<template>
  <div class="min-h-screen bg-[#FDFAF6] flex flex-col">

    <!-- Header — verde, com logo, consistente com checkout -->
    <div class="bg-[#2F5946] shadow-[0_2px_20px_rgba(44,24,16,0.2)]">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-center">
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/logo_passarinho_2.png" alt="" class="h-10 w-auto" />
          <img src="/images/logo_nome_2.png" alt="Quintal dos Mineiros" class="h-9 w-auto" />
        </NuxtLink>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">

      <!-- ─── Hero de confirmação ─── -->
      <div class="text-center mb-12">

        <!-- Ícone premium — três anéis concêntricos -->
        <div class="inline-flex items-center justify-center mb-8">
          <div class="w-24 h-24 rounded-full border border-[#2F5946]/15 flex items-center justify-center">
            <div class="w-[72px] h-[72px] rounded-full bg-[#2F5946]/5 flex items-center justify-center">
              <div class="w-12 h-12 rounded-full bg-[#2F5946] flex items-center justify-center shadow-[0_4px_20px_rgba(47,89,70,0.35)]">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Headline -->
        <h1 class="font-display text-3xl sm:text-4xl font-bold text-[#2C1810] leading-tight mb-4">
          Pedido recebido<br />com sucesso
        </h1>

        <!-- Saudação personalizada -->
        <p v-if="nome" class="font-display text-lg font-semibold text-[#2F5946] mb-3">
          Obrigado, {{ nome }}!
        </p>

        <p class="font-body text-[#7A6355] text-base leading-relaxed max-w-sm mx-auto">
          Recebemos seu pedido e em breve entraremos em contato pelo WhatsApp para confirmar os detalhes da entrega.
        </p>
      </div>

      <!-- ─── Resumo do pedido ─── -->
      <div v-if="snapshot?.items?.length" class="bg-white border border-[#E7D7BC]/70 rounded-2xl overflow-hidden mb-8 shadow-sm">

        <!-- Header do card -->
        <div class="px-6 py-4 border-b border-[#E7D7BC]/60 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <svg class="w-[18px] h-[18px] text-[#2F5946]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.048 18.566A2 2 0 004 21h16a2 2 0 001.952-2.434l-2-9A2 2 0 0018 8H6a2 2 0 00-1.952 1.566zM8 8V6a4 4 0 018 0v2" />
            </svg>
            <h2 class="font-display text-sm font-semibold text-[#2C1810]">Resumo do pedido</h2>
          </div>
          <span class="font-body text-xs text-[#9A8070]">
            {{ snapshot.items.length }} {{ snapshot.items.length === 1 ? 'item' : 'itens' }}
          </span>
        </div>

        <!-- Lista de itens -->
        <div class="divide-y divide-[#E7D7BC]/40">
          <div
            v-for="item in snapshot.items"
            :key="item.id"
            class="px-6 py-4 flex items-center gap-4"
          >
            <!-- Miniatura -->
            <div class="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-[#F3EBDD] flex items-center justify-center">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-xl" aria-hidden="true">{{ item.icon ?? '🌿' }}</span>
            </div>

            <!-- Nome + quantidade -->
            <div class="flex-1 min-w-0">
              <p class="font-body text-sm font-semibold text-[#2C1810] truncate">{{ item.name }}</p>
              <p class="font-body text-xs text-[#9A8070] mt-0.5">Qtd: {{ item.quantity }}</p>
            </div>

            <!-- Subtotal do item -->
            <p class="font-body text-sm font-semibold text-[#2C1810] flex-shrink-0">
              R$ {{ (item.price * item.quantity).toFixed(2).replace('.', ',') }}
            </p>
          </div>
        </div>

        <!-- Totais -->
        <div class="px-6 py-4 bg-[#FAF6EE] border-t border-[#E7D7BC]/60 space-y-2.5">
          <div class="flex justify-between items-center">
            <span class="font-body text-sm text-[#7A6355]">Subtotal</span>
            <span class="font-body text-sm text-[#2C1810]">{{ snapshot.totalDisplay }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-body text-sm text-[#7A6355]">Frete</span>
            <span class="font-body text-sm text-[#2F5946] font-medium">A confirmar</span>
          </div>
          <div class="flex justify-between items-center pt-2.5 border-t border-[#E7D7BC]/60">
            <span class="font-display text-sm font-semibold text-[#2C1810]">Total estimado</span>
            <span class="font-display text-xl font-bold text-[#2F5946]">{{ snapshot.totalDisplay }}</span>
          </div>
        </div>
      </div>

      <!-- ─── Separador decorativo ─── -->
      <div class="separator-gold mb-10 mx-auto w-24" />

      <!-- ─── Timeline de próximos passos ─── -->
      <div class="mb-10">
        <p class="font-body text-[11px] font-semibold text-[#9A8070] uppercase tracking-widest text-center mb-6">
          Próximos passos
        </p>

        <!-- Desktop: horizontal -->
        <div class="hidden sm:flex items-start">
          <template v-for="(step, i) in steps" :key="step.label">
            <div class="flex-1 flex flex-col items-center text-center gap-3">
              <!-- Marcador -->
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                :class="step.done
                  ? 'bg-[#2F5946] shadow-[0_2px_12px_rgba(47,89,70,0.3)]'
                  : 'bg-white border-2 border-[#E7D7BC]'"
              >
                <svg v-if="step.done" class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="font-body text-xs font-bold text-[#B09A80]">{{ i + 1 }}</span>
              </div>
              <div>
                <p class="font-body text-xs font-semibold" :class="step.done ? 'text-[#2F5946]' : 'text-[#7A6355]'">
                  {{ step.label }}
                </p>
                <p class="font-body text-[11px] text-[#9A8070] mt-0.5 leading-snug">{{ step.sub }}</p>
              </div>
            </div>
            <!-- Linha conectora -->
            <div v-if="i < steps.length - 1" class="flex-shrink-0 w-8 mt-5 px-1">
              <div class="h-px" :class="step.done ? 'bg-[#2F5946]/30' : 'bg-[#E7D7BC]'" />
            </div>
          </template>
        </div>

        <!-- Mobile: vertical -->
        <div class="sm:hidden">
          <div v-for="(step, i) in steps" :key="step.label" class="flex gap-4">
            <div class="flex flex-col items-center">
              <div
                class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                :class="step.done
                  ? 'bg-[#2F5946] shadow-[0_2px_10px_rgba(47,89,70,0.25)]'
                  : 'bg-white border-2 border-[#E7D7BC]'"
              >
                <svg v-if="step.done" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="font-body text-xs font-bold text-[#B09A80]">{{ i + 1 }}</span>
              </div>
              <div
                v-if="i < steps.length - 1"
                class="w-px flex-1 my-1 min-h-[28px]"
                :class="step.done ? 'bg-[#2F5946]/25' : 'bg-[#E7D7BC]'"
              />
            </div>
            <div class="pb-6 pt-1.5">
              <p class="font-body text-sm font-semibold" :class="step.done ? 'text-[#2F5946]' : 'text-[#7A6355]'">
                {{ step.label }}
              </p>
              <p class="font-body text-xs text-[#9A8070] mt-0.5">{{ step.sub }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ─── Sinais de confiança ─── -->
      <div class="grid grid-cols-3 gap-3 mb-10">

        <!-- Artesanal -->
        <div class="bg-white border border-[#E7D7BC]/60 rounded-xl p-4 flex flex-col items-center text-center gap-2.5 shadow-sm">
          <div class="w-9 h-9 rounded-full bg-[#2F5946]/10 flex items-center justify-center">
            <svg class="w-4.5 h-4.5 text-[#2F5946]" style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p class="font-body text-xs font-semibold text-[#2C1810] leading-snug">Produção artesanal</p>
            <p class="font-body text-[11px] text-[#9A8070] mt-0.5 leading-snug">Feito com cuidado</p>
          </div>
        </div>

        <!-- Atendimento humanizado -->
        <div class="bg-white border border-[#E7D7BC]/60 rounded-xl p-4 flex flex-col items-center text-center gap-2.5 shadow-sm">
          <div class="w-9 h-9 rounded-full bg-[#2F5946]/10 flex items-center justify-center">
            <svg class="text-[#2F5946]" style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M2.992 16.342a2 2 0 01.094 1.167l-1.065 3.29a1 1 0 001.236 1.168l3.413-.998a2 2 0 011.099.092 10 10 0 104.777-4.719" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M8 12h.01M12 12h.01M16 12h.01" />
            </svg>
          </div>
          <div>
            <p class="font-body text-xs font-semibold text-[#2C1810] leading-snug">Atendimento humano</p>
            <p class="font-body text-[11px] text-[#9A8070] mt-0.5 leading-snug">Via WhatsApp</p>
          </div>
        </div>

        <!-- Entrega segura -->
        <div class="bg-white border border-[#E7D7BC]/60 rounded-xl p-4 flex flex-col items-center text-center gap-2.5 shadow-sm">
          <div class="w-9 h-9 rounded-full bg-[#2F5946]/10 flex items-center justify-center">
            <svg class="text-[#2F5946]" style="width:18px;height:18px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2M15 18H9m10 0h2a1 1 0 001-1v-3.65a1 1 0 00-.22-.624l-3.48-4.35A1 1 0 0017.52 8H14M17 18a2 2 0 100 4 2 2 0 000-4zm-10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </div>
          <div>
            <p class="font-body text-xs font-semibold text-[#2C1810] leading-snug">Entrega segura</p>
            <p class="font-body text-[11px] text-[#9A8070] mt-0.5 leading-snug">Para todo o Brasil</p>
          </div>
        </div>
      </div>

      <!-- ─── CTAs ─── -->
      <div class="space-y-3">
        <NuxtLink
          to="/#produtos"
          class="inline-flex items-center justify-center gap-2 w-full py-4
                 bg-[#2F5946] hover:bg-[#254637] text-white
                 font-body text-sm font-semibold rounded-xl
                 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Continuar comprando
        </NuxtLink>

        <a
          :href="`https://wa.me/5531999999999?text=${whatsappText}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2.5 w-full py-3.5
                 border border-[#E7D7BC] hover:border-[#2F5946]/30
                 text-[#7A6355] hover:text-[#2F5946]
                 font-body text-sm font-medium rounded-xl
                 transition-all duration-200"
        >
          <svg style="width:16px;height:16px" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Falar no WhatsApp
        </a>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
interface OrderSnapshot {
  items: Array<{
    id: string
    name: string
    price: number
    priceDisplay: string
    quantity: number
    image?: string
    icon?: string
  }>
  totalDisplay: string
}

const route = useRoute()

const nome = computed(() => {
  const n = route.query.nome
  return typeof n === 'string' ? n : ''
})

const snapshot = useState<OrderSnapshot | null>('order-snapshot', () => null)

const steps = [
  { label: 'Pedido recebido',      sub: 'Registrado com sucesso',    done: true  },
  { label: 'Confirmação',          sub: 'Contato via WhatsApp',      done: false },
  { label: 'Preparação',           sub: 'Produção artesanal',        done: false },
  { label: 'Entrega',              sub: 'Combinada com você',        done: false },
]

const whatsappText = computed(() =>
  encodeURIComponent(
    nome.value
      ? `Olá! Sou ${nome.value} e acabei de realizar um pedido no Quintal dos Mineiros. Gostaria de confirmar os detalhes da entrega.`
      : 'Olá! Acabei de realizar um pedido no Quintal dos Mineiros e gostaria de confirmar os detalhes da entrega.'
  )
)

useHead({
  title: 'Pedido Confirmado — Quintal dos Mineiros',
})
</script>
