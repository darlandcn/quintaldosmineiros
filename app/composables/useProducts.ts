import type { Product } from '~/shared/types'
import { formatBRL } from '~/utils/formatters'


export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProducts() {
    const supabase = useSupabase()
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('products')
        .select('id, name, description, price, stock, images')
        .order('name')
      if (err) throw err
      products.value = (data ?? []).map(p => ({
        id: p.id,
        name: p.name,
        description: p.description ?? '',
        price: formatBRL(Number(p.price) || 0),
        image: Array.isArray(p.images) ? (p.images[0] ?? '') : '',
        stock: Number(p.stock) || 0,
      }))
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Erro ao carregar produtos'
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, fetchProducts }
}
