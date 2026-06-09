// RLS — A tabela tracking_events precisa de uma policy de SELECT para anon antes de usar em produção:
// CREATE POLICY "anon_select_tracking_events" ON tracking_events
//   FOR SELECT TO anon USING (true);

import { ref } from 'vue'
import type { TrackingOrder, TrackingEvent } from '~/shared/types'


export function useOrderTracking() {
  const supabase = useSupabase()

  const step = ref<'form' | 'list' | 'tracking'>('form')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const orders = ref<TrackingOrder[]>([])
  const selectedOrder = ref<TrackingOrder | null>(null)
  const trackingEvents = ref<TrackingEvent[]>([])

  async function searchOrders(name: string, email: string) {
    loading.value = true
    error.value = null
    orders.value = []

    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, customer_phone, customer_document, total_price, status, created_at, shipped_at, delivered_at, tracking_code')
        .ilike('customer_email', email)
        .ilike('customer_name', name)
        .order('created_at', { ascending: false })

      if (err) throw err

      if (!data || data.length === 0) {
        error.value = 'Nenhum pedido encontrado com esses dados. Verifique o nome e e-mail informados.'
        return
      }

      orders.value = data as TrackingOrder[]
      step.value = 'list'
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Erro ao buscar pedidos. Tente novamente.'
    } finally {
      loading.value = false
    }
  }

  async function selectOrder(order: TrackingOrder) {
    selectedOrder.value = order
    await loadTrackingEvents(order.id)
    step.value = 'tracking'
  }

  async function loadTrackingEvents(orderId: string) {
    trackingEvents.value = []

    try {
      const { data, error: err } = await supabase
        .from('tracking_events')
        .select('id, order_id, status, description, event_at')
        .eq('order_id', orderId)
        .order('event_at', { ascending: false })

      if (err) throw err
      trackingEvents.value = (data ?? []) as TrackingEvent[]
    } catch {
      // Timeline fica vazia — a UI trata o estado vazio adequadamente
    }
  }

  function reset() {
    step.value = 'form'
    loading.value = false
    error.value = null
    orders.value = []
    selectedOrder.value = null
    trackingEvents.value = []
  }

  return {
    step,
    loading,
    error,
    orders,
    selectedOrder,
    trackingEvents,
    searchOrders,
    selectOrder,
    loadTrackingEvents,
    reset,
  }
}
