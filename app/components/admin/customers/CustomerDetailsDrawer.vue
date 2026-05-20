<template>
  <Transition name="drawer">
    <div v-if="showDrawer" class="fixed inset-0 z-40 flex justify-end">

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20 backdrop-blur-[2px]" @click="emit('close')" />

      <!-- Panel -->
      <div class="drawer-panel relative w-full max-w-[480px] bg-white shadow-2xl flex flex-col">

        <!-- Header -->
        <div class="shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div>
            <p class="text-sm font-semibold text-gray-800">Detalhes do Cliente</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ selectedCustomer?.orderCount }} {{ selectedCustomer?.orderCount === 1 ? 'pedido' : 'pedidos' }} · {{ selectedCustomer?.totalSpent }}</p>
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

        <!-- Body -->
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          <!-- Identidade -->
          <section>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-[#2F5946]/10 flex items-center justify-center shrink-0">
                <span class="text-sm font-bold text-[#2F5946]">{{ selectedCustomer?.name[0]?.toUpperCase() }}</span>
              </div>
              <div>
                <p class="text-base font-semibold text-zinc-800">{{ selectedCustomer?.name }}</p>
                <p v-if="selectedCustomer?.email" class="text-xs text-zinc-400 mt-0.5">{{ selectedCustomer.email }}</p>
              </div>
            </div>

            <div v-if="selectedCustomer?.phone || selectedCustomer?.email" class="bg-zinc-50 rounded-xl p-3 space-y-2">
              <div v-if="selectedCustomer?.phone" class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span class="text-sm text-zinc-600">{{ selectedCustomer.phone }}</span>
              </div>
              <div v-if="selectedCustomer?.email" class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span class="text-sm text-zinc-600">{{ selectedCustomer.email }}</span>
              </div>
            </div>
          </section>

          <!-- Endereço -->
          <section v-if="selectedCustomer?.address">
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Endereço de entrega</p>
            <div class="bg-zinc-50 rounded-xl p-3">
              <div class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="1.75" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p class="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">{{ selectedCustomer.address }}</p>
              </div>
            </div>
          </section>

          <!-- Resumo financeiro -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Resumo</p>
            <div class="bg-zinc-50 rounded-xl p-3 grid grid-cols-3 gap-3">
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Pedidos</p>
                <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ selectedCustomer?.orderCount }}</p>
              </div>
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Total gasto</p>
                <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ selectedCustomer?.totalSpent }}</p>
              </div>
              <div>
                <p class="text-[11px] text-zinc-400 mb-0.5">Último pedido</p>
                <p class="text-sm font-bold text-zinc-800 tabular-nums">{{ selectedCustomer?.lastOrderDate }}</p>
              </div>
            </div>
          </section>

          <!-- Histórico de pedidos -->
          <section>
            <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Histórico de pedidos</p>
            <div class="space-y-2">
              <div
                v-for="order in selectedCustomer?.orders"
                :key="order.id"
                class="flex items-center justify-between bg-zinc-50 rounded-xl px-3 py-2"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="text-sm font-semibold text-zinc-800 tabular-nums shrink-0">{{ order.id }}</span>
                  <span class="text-xs text-zinc-400 shrink-0">{{ order.date }}</span>
                </div>
                <div class="flex items-center gap-3 shrink-0">
                  <span class="text-sm font-semibold text-zinc-700 tabular-nums">{{ order.amount }}</span>
                  <OrderStatusBadge :status="order.status" />
                </div>
              </div>
            </div>

            <!-- Observações de pedidos -->
            <template v-if="ordersWithNotes.length > 0">
              <p class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mt-5 mb-3">Observações</p>
              <div class="space-y-2">
                <div
                  v-for="order in ordersWithNotes"
                  :key="order.id + '-notes'"
                  class="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5"
                >
                  <p class="text-[11px] text-amber-500 font-semibold mb-0.5">{{ order.id }} · {{ order.date }}</p>
                  <p class="text-sm text-amber-800 leading-relaxed">{{ order.notes }}</p>
                </div>
              </div>
            </template>
          </section>

        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { Customer, CustomerOrder } from '~/composables/admin/useCustomers'

const props = defineProps<{
  showDrawer: boolean
  selectedCustomer: Customer | null
}>()

const emit = defineEmits<{
  close: []
}>()

const ordersWithNotes = computed<CustomerOrder[]>(() =>
  (props.selectedCustomer?.orders ?? []).filter(o => o.notes),
)
</script>

<style scoped>
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
