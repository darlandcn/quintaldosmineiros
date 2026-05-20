// ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  stock: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

// ─── Composable ──────────────────────────────────────────────────────────────

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
    } catch (e: any) {
      error.value = e?.message ?? 'Erro ao carregar produtos'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
  }
}
