<template>
  <span
    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
    :class="statusClass[status] ?? 'bg-zinc-100 text-zinc-500'"
  >
    {{ statusLabel[status] ?? status ?? '—' }}
  </span>
</template>

<script setup lang="ts">
import type { OrderStatus } from '~/shared/types'

defineProps<{ status: OrderStatus }>()

const statusLabel: Record<string, string> = {
  pending:   'Pendente',
  paid:      'Pago',
  shipped:   'Enviado',
  cancelled: 'Cancelado',
}

const statusClass: Record<string, string> = {
  pending:   'bg-amber-50 text-amber-600',
  paid:      'bg-green-50 text-green-700',
  shipped:   'bg-indigo-50 text-indigo-600',
  cancelled: 'bg-red-50 text-red-500',
}
</script>
