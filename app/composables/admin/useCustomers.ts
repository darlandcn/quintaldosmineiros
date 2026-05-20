// ─── Types ───────────────────────────────────────────────────────────────────

import type { OrderStatus } from './useOrders'

export type { OrderStatus }

export interface CustomerOrder {
  id: string
  date: string
  amount: string
  status: OrderStatus
  notes?: string
}

export interface Customer {
  key: string
  name: string
  email?: string
  phone?: string
  address?: string
  orderCount: number
  totalSpent: string
  totalSpentRaw: number
  lastOrderDate: string
  lastStatus: OrderStatus
  orders: CustomerOrder[]
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

function shortId(uuid: string): string {
  const num = parseInt(uuid.replace(/-/g, '').slice(-8), 16) % 10000
  return '#' + String(num).padStart(4, '0')
}

// ─── Composable ──────────────────────────────────────────────────────────────

export function useCustomers() {
  // ── State ──────────────────────────────────────────────────────────────────

  const customers = ref<Customer[]>([])
  const loading = ref(false)
  const fetchError = ref<string | null>(null)

  const searchQuery = ref('')

  const showDrawer = ref(false)
  const selectedCustomer = ref<Customer | null>(null)

  // ── Computed ───────────────────────────────────────────────────────────────

  const filteredCustomers = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return customers.value
    return customers.value.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.email ?? '').toLowerCase().includes(q) ||
      (c.phone ?? '').includes(q),
    )
  })

  const totalRevenue = computed(() =>
    customers.value.reduce((sum, c) => sum + c.totalSpentRaw, 0),
  )

  const recurringCount = computed(() =>
    customers.value.filter(c => c.orderCount > 1).length,
  )

  const averageTicket = computed(() => {
    const totalOrders = customers.value.reduce((sum, c) => sum + c.orderCount, 0)
    if (totalOrders === 0) return formatBRL(0)
    return formatBRL(totalRevenue.value / totalOrders)
  })

  // ── Actions ────────────────────────────────────────────────────────────────

  async function fetchCustomers() {
    const supabase = useSupabase()
    loading.value = true
    fetchError.value = null
    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, customer_phone, customer_address, notes, total_price, status, created_at')
        .order('created_at', { ascending: false })

      if (err) throw err

      const map = new Map<string, Customer>()

      for (const o of data ?? []) {
        const key = o.customer_email?.trim().toLowerCase() || o.customer_name?.trim() || '—'
        const amount = Number(o.total_price) || 0

        const order: CustomerOrder = {
          id: shortId(o.id),
          date: formatDate(o.created_at),
          amount: formatBRL(amount),
          status: (['pending', 'paid', 'shipped', 'cancelled'].includes(o.status) ? o.status : 'pending') as OrderStatus,
          notes: o.notes ?? undefined,
        }

        if (map.has(key)) {
          const existing = map.get(key)!
          existing.orderCount += 1
          existing.totalSpentRaw += amount
          existing.totalSpent = formatBRL(existing.totalSpentRaw)
          existing.orders.push(order)
        } else {
          map.set(key, {
            key,
            name: o.customer_name ?? '—',
            email: o.customer_email ?? undefined,
            phone: o.customer_phone ?? undefined,
            address: o.customer_address ?? undefined,
            orderCount: 1,
            totalSpentRaw: amount,
            totalSpent: formatBRL(amount),
            lastOrderDate: formatDate(o.created_at),
            lastStatus: (['pending', 'paid', 'shipped', 'cancelled'].includes(o.status) ? o.status : 'pending') as OrderStatus,
            orders: [order],
          })
        }
      }

      customers.value = Array.from(map.values())
    } catch (e: any) {
      fetchError.value = e?.message ?? 'Erro ao buscar clientes'
    } finally {
      loading.value = false
    }
  }

  function openDrawer(customer: Customer) {
    selectedCustomer.value = customer
    showDrawer.value = true
  }

  function closeDrawer() {
    showDrawer.value = false
    selectedCustomer.value = null
  }

  function clearSearch() {
    searchQuery.value = ''
  }

  return {
    // state
    loading,
    fetchError,
    searchQuery,
    showDrawer,
    selectedCustomer,
    // computed
    filteredCustomers,
    totalRevenue,
    recurringCount,
    averageTicket,
    // actions
    fetchCustomers,
    openDrawer,
    closeDrawer,
    clearSearch,
  }
}
