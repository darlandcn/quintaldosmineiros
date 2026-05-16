import type { Ref } from 'vue'

type OrderStatus = 'pending' | 'paid' | 'shipped'

export interface RecentOrder {
  id: string
  client: string
  date: string
  amount: string
  status: OrderStatus
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function shortId(uuid: string): string {
  const num = parseInt(uuid.replace(/-/g, '').slice(-8), 16) % 10000
  return '#' + String(num).padStart(4, '0')
}

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
        status: o.status as OrderStatus,
      }))
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao buscar pedidos recentes'
    } finally {
      loading.value = false
    }
  }

  return { orders, loading, error, fetchRecentOrders }
}
