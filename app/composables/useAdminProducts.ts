export interface AdminProduct {
  id: number
  name: string
  description: string
  price: number
  stock: number
  images: string[]
}

export type NewProduct = Omit<AdminProduct, 'id'>

export function useAdminProducts() {
  const products = ref<AdminProduct[]>([])
  const loading = ref(false)
  const error = ref('')

  async function fetchProducts() {
    loading.value = true
    error.value = ''

    try {
      const supabase = useSupabase()
      const { data, error: err } = await supabase
        .from('products')
        .select('id, name, description, price, stock, images')
        .order('name')

      if (err) {
        error.value = err.message
      } else {
        products.value = data ?? []
      }
    } catch (e: any) {
      error.value = e?.message ?? 'Erro inesperado.'
    } finally {
      loading.value = false
    }
  }

  async function uploadImage(file: File): Promise<string> {
    const supabase = useSupabase()
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`

    const { error: err } = await supabase.storage
      .from('products')
      .upload(path, file, { upsert: true })

    if (err) throw new Error(err.message)

    const { data } = supabase.storage.from('products').getPublicUrl(path)
    return data.publicUrl
  }

  async function createProduct(payload: NewProduct) {
    const supabase = useSupabase()
    const { error: err } = await supabase.from('products').insert(payload)
    if (err) throw new Error(err.message)
  }

  async function updateProduct(id: number, payload: NewProduct) {
    const supabase = useSupabase()
    const { error: err } = await supabase
      .from('products')
      .update(payload)
      .eq('id', id)
    if (err) throw new Error(err.message)
  }

  async function deleteProduct(id: number) {
    const supabase = useSupabase()

    const { count } = await supabase
      .from('order_items')
      .select('id', { count: 'exact', head: true })
      .eq('product_id', id)

    if (count && count > 0) {
      throw new Error(`Este produto está vinculado a ${count} pedido${count > 1 ? 's' : ''} e não pode ser excluído.`)
    }

    const { error: err } = await supabase.from('products').delete().eq('id', id)
    if (err) throw new Error(err.message)
  }

  return { products, loading, error, fetchProducts, uploadImage, createProduct, updateProduct, deleteProduct }
}
