import type { Ref } from 'vue'
import type { RecentOrder } from '~/shared/types'
import { formatDate, formatBRL, shortId } from '~/utils/formatters'


export function useRecentOrders() {
  const supabase = useSupabase()

  const orders: Ref<RecentOrder[]> = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchRecentOrders() {
    loading.value = true
    error.value = null
    orders.value = []

    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, created_at, total_price, status')
        .order('created_at', { ascending: false })
        .limit(5)

      if (err) throw err

      orders.value = (data ?? []).map(o => ({
        id: shortId(o.id),
        client: o.customer_name ?? '—',
        date: formatDate(o.created_at),
        amount: formatBRL(Number(o.total_price) || 0),
        status: o.status as RecentOrder['status'],
      }))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Erro ao buscar pedidos recentes'
    } finally {
      loading.value = false
    }
  }

  return { orders, loading, error, fetchRecentOrders }
}
