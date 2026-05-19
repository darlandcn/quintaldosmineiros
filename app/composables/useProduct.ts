// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductDetail {
  id: string
  name: string
  description: string
  price: number
  priceDisplay: string
  images: string[]
  stock: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

// ─── Composable ──────────────────────────────────────────────────────────────

export function useProduct(id: string) {
  const product = ref<ProductDetail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProduct() {
    const supabase = useSupabase()
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('products')
        .select('id, name, description, price, stock, images')
        .eq('id', id)
        .single()

      if (err) throw err
      if (!data) throw new Error('Produto não encontrado')
      product.value = {
        ...data,
        images: Array.isArray(data.images) ? data.images : [],
        priceDisplay: formatBRL(Number(data.price) || 0),
      }
    } catch (e: any) {
      error.value = e?.message ?? 'Produto não encontrado'
    } finally {
      loading.value = false
    }
  }

  return { product, loading, error, fetchProduct }
}
