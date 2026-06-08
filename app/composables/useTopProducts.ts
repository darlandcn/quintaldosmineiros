import type { TopProduct } from '~/shared/types'
import { formatBRL } from '~/utils/formatters'
import { CONFIRMED_STATUSES } from '~/shared/constants'


interface OrderItemRow {
  product_id: string
  quantity: number
  unit_price: number
  products: { name: string; images: string[] | string }
}

export function useTopProducts() {
  const supabase = useSupabase()

  const products = ref<TopProduct[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTopProducts() {
    loading.value = true
    error.value = null
    products.value = []

    try {
      const { data, error: err } = await supabase
        .from('order_items')
        .select('product_id, quantity, unit_price, orders!inner(status), products!inner(name, images)')
        .in('orders.status', CONFIRMED_STATUSES)

      if (err) throw err

      const map = new Map<string, { name: string; image: string; qty: number; revenue: number }>()

      for (const item of (data ?? []) as unknown as OrderItemRow[]) {
        const qty = Number(item.quantity) || 0
        const price = Number(item.unit_price) || 0
        const p = item.products
        const name: string = p?.name ?? '—'
        const imgs = p?.images
        const image: string = Array.isArray(imgs) ? (imgs[0] ?? '') : (imgs ?? '')

        const existing = map.get(item.product_id)
        if (existing) {
          existing.qty += qty
          existing.revenue += qty * price
        } else {
          map.set(item.product_id, { name, image, qty, revenue: qty * price })
        }
      }

      products.value = [...map.values()]
        .sort((a, b) => b.qty - a.qty)
        .slice(0, 5)
        .map(p => ({ name: p.name, qty: p.qty, revenue: formatBRL(p.revenue), image: p.image }))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Erro ao buscar top produtos'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchTopProducts }
}
