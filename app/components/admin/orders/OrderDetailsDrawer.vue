<template>
  <Transition name="drawer">
    <div v-if="showDrawer" class="fixed inset-0 z-40 flex justify-end">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]" @click="emit('close')" />

      <!-- Panel -->
      <div class="drawer-panel relative w-full max-w-[480px] bg-white shadow-2xl flex flex-col">

        <!-- Header -->
        <div class="shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <p class="text-sm font-semibold text-gray-800">Detalhes do Pedido</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ selectedOrder?.id }} · {{ selectedOrder?.date }}</p>
          </div>
          <button
            class="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            @click="emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Body (scrollável) -->
        <div class="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          <!-- Status badge -->
          <div class="flex items-center justify-between">
            <AdminOrdersOrderStatusBadge v-if="selectedOrder" :status="selectedOrder.status" />
            <span class="text-xs text-zinc-400">{{ selectedOrder?.payment ?? '—' }}</span>
          </div>

          <!-- Informações do pedido -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Pedido</p>
            <div class="bg-zinc-50 rounded-xl p-4 grid grid-cols-2 gap-3">
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">ID</p>
                <p class="text-sm font-semibold text-zinc-800">{{ selectedOrder?.id }}</p>
              </div>
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Data</p>
                <p class="text-sm font-semibold text-zinc-800">{{ selectedOrder?.date }}</p>
              </div>
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Pagamento</p>
                <p class="text-sm font-semibold text-zinc-800">{{ selectedOrder?.payment ?? '—' }}</p>
              </div>
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Total</p>
                <p class="text-sm font-semibold text-zinc-800">{{ selectedOrder?.amount }}</p>
              </div>
            </div>
          </section>

          <!-- Cliente -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Cliente</p>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-[#2F5946]/10 flex items-center justify-center shrink-0">
                <span class="text-sm font-bold text-[#2F5946]">{{ selectedOrder?.client[0] }}</span>
              </div>
              <div>
                <p class="text-sm font-semibold text-zinc-800">{{ selectedOrder?.client }}</p>
                <p class="text-xs text-zinc-400">{{ selectedOrder?.email ?? '—' }}</p>
              </div>
            </div>
            <div v-if="selectedOrder?.details" class="bg-zinc-50 rounded-xl p-4 space-y-2">
              <div class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span class="text-sm text-zinc-600">{{ selectedOrder.details.phone }}</span>
              </div>
            </div>
          </section>

          <!-- Endereço -->
          <section v-if="selectedOrder?.details">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Endereço de entrega</p>
            <div class="bg-zinc-50 rounded-xl p-4 space-y-1.5">
              <p class="text-sm text-zinc-700">
                {{ selectedOrder.details.address.street }}, {{ selectedOrder.details.address.number }}
              </p>
              <p class="text-sm text-zinc-500">
                {{ selectedOrder.details.address.city }} – {{ selectedOrder.details.address.state }}
              </p>
              <p class="text-sm text-zinc-400">CEP {{ selectedOrder.details.address.zip }}</p>
            </div>
          </section>

          <!-- Produtos -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Produtos</p>

            <!-- Skeleton -->
            <div v-if="drawerLoading" class="space-y-2">
              <div v-for="i in 3" :key="i" class="flex items-center gap-3 bg-zinc-50 rounded-xl p-3 animate-pulse">
                <div class="w-12 h-12 rounded-lg bg-zinc-200 shrink-0" />
                <div class="flex-1 space-y-2">
                  <div class="h-3 bg-zinc-200 rounded w-3/4" />
                  <div class="h-3 bg-zinc-200 rounded w-1/2" />
                </div>
                <div class="h-3 bg-zinc-200 rounded w-14" />
              </div>
            </div>

            <!-- Erro -->
            <div v-else-if="drawerError" class="bg-red-50 rounded-xl p-4 text-center">
              <p class="text-sm text-red-500">{{ drawerError }}</p>
            </div>

            <!-- Lista real -->
            <div v-else class="space-y-2">
              <div
                v-for="item in drawerItems"
                :key="item.name"
                class="flex items-center gap-3 bg-zinc-50 rounded-xl p-3"
              >
                <div class="w-12 h-12 rounded-lg bg-zinc-200 overflow-hidden shrink-0">
                  <img v-if="item.image" :src="item.image" class="w-full h-full object-cover" alt="" />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z" />
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-zinc-800 truncate">{{ item.name }}</p>
                  <p class="text-xs text-zinc-400 mt-0.5">{{ item.qty }}x · {{ item.unitPrice }}</p>
                </div>
                <span class="text-sm font-semibold text-zinc-700 tabular-nums shrink-0">{{ item.subtotal }}</span>
              </div>
            </div>
          </section>

          <!-- Resumo financeiro -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Resumo</p>
            <div class="bg-zinc-50 rounded-xl p-4 space-y-2">
              <div class="flex justify-between text-sm font-bold text-zinc-900">
                <span>Total</span>
                <span class="tabular-nums">{{ selectedOrder?.amount }}</span>
              </div>
            </div>
          </section>

        </div>

        <!-- Footer: alterar status -->
        <div class="shrink-0 px-6 py-4 border-t border-gray-100 space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Alterar status</p>
            <Transition name="fade">
              <span v-if="saveSuccess" class="flex items-center gap-1 text-[11px] font-medium text-green-600">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Status atualizado
              </span>
            </Transition>
          </div>
          <div v-if="saveError" class="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{{ saveError }}</div>
          <div class="flex gap-2">
            <div class="relative flex-1">
              <select
                :value="draftStatus"
                :disabled="savingStatus"
                class="w-full appearance-none border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#2F5946]/40 focus:ring-2 focus:ring-[#2F5946]/10 transition-all bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                @change="emit('update:draftStatus', ($event.target as HTMLSelectElement).value as OrderStatus)"
              >
                <option value="pending">Pendente</option>
                <option value="paid">Pago</option>
                <option value="shipped">Enviado</option>
                <option value="cancelled">Cancelado</option>
              </select>
              <span class="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <button
              :disabled="savingStatus"
              class="flex items-center gap-1.5 bg-[#2F5946] hover:bg-[#264a3b] text-white text-sm font-semibold px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              @click="emit('save')"
            >
              <svg v-if="savingStatus" class="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              {{ savingStatus ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Order, OrderItem, OrderStatus } from '~/composables/admin/useOrders'

defineProps<{
  showDrawer: boolean
  selectedOrder: Order | null
  draftStatus: OrderStatus
  drawerLoading: boolean
  drawerError: string | null
  drawerItems: OrderItem[]
  savingStatus: boolean
  saveError: string | null
  saveSuccess: boolean
}>()

const emit = defineEmits<{
  'update:draftStatus': [value: OrderStatus]
  close: []
  save: []
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.drawer-enter-active {
  transition: opacity 0.2s ease;
}
.drawer-enter-active .drawer-panel {
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active {
  transition: opacity 0.15s ease;
}
.drawer-leave-active .drawer-panel {
  transition: transform 0.2s ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>
