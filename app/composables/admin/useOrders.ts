import type { AdminOrder, AdminOrderItem, AdminOrderDetails, OrderStatus } from '~/shared/types'
import { formatDate, formatBRL, shortId } from '~/utils/formatters'


interface OrderItemRow {
  quantity: number
  unit_price: number
  products: { name: string; images: string[] | string }
}

export function useOrders() {
  const orders = ref<AdminOrder[]>([])
  const loading = ref(false)
  const fetchError = ref<string | null>(null)

  const searchQuery = ref('')
  const filterStatus = ref('')
  const filterDate = ref('')

  const showDrawer = ref(false)
  const selectedOrder = ref<AdminOrder | null>(null)
  const draftStatus = ref<OrderStatus>('pending')
  const drawerLoading = ref(false)
  const drawerError = ref<string | null>(null)
  const drawerItems = ref<AdminOrderItem[]>([])
  const savingStatus = ref(false)
  const saveError = ref<string | null>(null)
  const saveSuccess = ref(false)

  const filteredOrders = computed(() => {
    return orders.value.filter(order => {
      const q = searchQuery.value.trim().toLowerCase()
      if (q && !order.id.toLowerCase().includes(q) && !order.client.toLowerCase().includes(q) && !(order.email ?? '').toLowerCase().includes(q)) {
        return false
      }
      if (filterStatus.value && order.status !== filterStatus.value) {
        return false
      }
      if (filterDate.value) {
        const [d, m, y] = order.date.split('/')
        if (`${y}-${m}-${d}` !== filterDate.value) return false
      }
      return true
    })
  })

  async function fetchOrders() {
    const supabase = useSupabase()
    loading.value = true
    fetchError.value = null
    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, customer_phone, customer_address, notes, created_at, total_price, status')
        .order('created_at', { ascending: false })
      if (err) throw err
      orders.value = (data ?? []).map(o => ({
        id: shortId(o.id),
        rawId: o.id,
        client: o.customer_name ?? '—',
        date: formatDate(o.created_at),
        amount: formatBRL(Number(o.total_price) || 0),
        status: (['pending', 'paid', 'shipped', 'invoiced', 'delivered', 'cancelled'].includes(o.status) ? o.status : 'pending') as OrderStatus,
        email: o.customer_email ?? undefined,
        phone: o.customer_phone ?? undefined,
        address: o.customer_address ?? undefined,
        notes: o.notes ?? undefined,
      }))
    } catch (e: unknown) {
      fetchError.value = (e as Error)?.message ?? 'Erro ao buscar pedidos'
    } finally {
      loading.value = false
    }
  }

  async function openDrawer(order: AdminOrder) {
    selectedOrder.value = order
    draftStatus.value = order.status
    drawerItems.value = []
    drawerError.value = null
    showDrawer.value = true

    const supabase = useSupabase()
    drawerLoading.value = true
    try {
      const { data, error: err } = await supabase
        .from('order_items')
        .select('quantity, unit_price, products!inner(name, images)')
        .eq('order_id', order.rawId)
      if (err) throw err
      drawerItems.value = ((data ?? []) as unknown as OrderItemRow[]).map((item) => {
        const qty = Number(item.quantity) || 0
        const unitPrice = Number(item.unit_price) || 0
        const p = item.products
        const images = p?.images
        return {
          name: p?.name ?? '—',
          image: Array.isArray(images) ? (images[0] ?? '') : (images ?? ''),
          qty,
          unitPrice: formatBRL(unitPrice),
          subtotal: formatBRL(qty * unitPrice),
        }
      })
    } catch (e: unknown) {
      drawerError.value = (e as Error)?.message ?? 'Erro ao carregar itens do pedido'
    } finally {
      drawerLoading.value = false
    }
  }

  function closeDrawer() {
    showDrawer.value = false
    selectedOrder.value = null
    drawerItems.value = []
    drawerError.value = null
  }

  async function saveStatus() {
    if (!selectedOrder.value) return
    const supabase = useSupabase()
    savingStatus.value = true
    saveError.value = null
    saveSuccess.value = false
    try {
      const { error: err } = await supabase
        .from('orders')
        .update({ status: draftStatus.value })
        .eq('id', selectedOrder.value.rawId)
      if (err) throw err
      const order = orders.value.find(o => o.id === selectedOrder.value!.id)
      if (order) order.status = draftStatus.value
      selectedOrder.value = { ...selectedOrder.value, status: draftStatus.value }
      saveSuccess.value = true
      setTimeout(() => { saveSuccess.value = false }, 3000)
    } catch (e: unknown) {
      saveError.value = (e as Error)?.message ?? 'Erro ao atualizar status'
    } finally {
      savingStatus.value = false
    }
  }

  function clearFilters() {
    searchQuery.value = ''
    filterStatus.value = ''
    filterDate.value = ''
  }

  function countByStatus(status: OrderStatus): number {
    return filteredOrders.value.filter(o => o.status === status).length
  }

  return {
    orders,
    loading,
    fetchError,
    searchQuery,
    filterStatus,
    filterDate,
    showDrawer,
    selectedOrder,
    draftStatus,
    drawerLoading,
    drawerError,
    drawerItems,
    savingStatus,
    saveError,
    saveSuccess,
    filteredOrders,
    fetchOrders,
    openDrawer,
    closeDrawer,
    saveStatus,
    clearFilters,
    countByStatus,
  }
}
