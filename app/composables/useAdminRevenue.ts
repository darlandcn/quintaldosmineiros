const CONFIRMED_STATUSES = ['paid', 'shipped']

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function useAdminRevenue() {
  const supabase = useSupabase()

  // — Receita Total + Ticket Médio (mesma query) —
  const revenue = ref(0)
  const revenueTrend = ref(0)
  const revenueLoading = ref(false)
  const revenueError = ref<string | null>(null)

  const avgTicket = ref(0)
  const avgTicketTrend = ref(0)

  const formattedRevenue = computed(() => formatBRL(revenue.value))
  const formattedAvgTicket = computed(() => formatBRL(avgTicket.value))

  async function fetchRevenue() {
    revenueLoading.value = true
    revenueError.value = null
    revenue.value = 0
    revenueTrend.value = 0
    avgTicket.value = 0
    avgTicketTrend.value = 0

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('total_price, created_at')
        .in('status', CONFIRMED_STATUSES)

      if (error) throw error

      const now = new Date()
      const thisMonth = now.getMonth()
      const thisYear = now.getFullYear()
      const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
      const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

      let total = 0
      let thisMonthTotal = 0; let thisMonthCount = 0
      let lastMonthTotal = 0; let lastMonthCount = 0

      for (const order of data ?? []) {
        const amount = Number(order.total_price) || 0
        total += amount

        const d = new Date(order.created_at)
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
          thisMonthTotal += amount; thisMonthCount++
        } else if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) {
          lastMonthTotal += amount; lastMonthCount++
        }
      }

      revenue.value = total
      if (lastMonthTotal > 0) {
        revenueTrend.value = Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 1000) / 10
      }

      const totalCount = data?.length ?? 0
      avgTicket.value = totalCount > 0 ? total / totalCount : 0

      const thisMonthAvg = thisMonthCount > 0 ? thisMonthTotal / thisMonthCount : 0
      const lastMonthAvg = lastMonthCount > 0 ? lastMonthTotal / lastMonthCount : 0
      if (lastMonthAvg > 0) {
        avgTicketTrend.value = Math.round(((thisMonthAvg - lastMonthAvg) / lastMonthAvg) * 1000) / 10
      }
    } catch (e: any) {
      revenueError.value = e?.message ?? 'Erro ao buscar receita'
    } finally {
      revenueLoading.value = false
    }
  }

  // — Vendas Hoje —
  const todaySales = ref(0)
  const todayTrend = ref(0)
  const todayLoading = ref(false)
  const todayError = ref<string | null>(null)

  const formattedTodaySales = computed(() => formatBRL(todaySales.value))

  async function fetchTodaySales() {
    todayLoading.value = true
    todayError.value = null
    todaySales.value = 0
    todayTrend.value = 0

    try {
      const now = new Date()
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)

      const { data, error } = await supabase
        .from('orders')
        .select('total_price, created_at')
        .in('status', CONFIRMED_STATUSES)
        .gte('created_at', startOfYesterday.toISOString())
        .lt('created_at', startOfTomorrow.toISOString())

      if (error) throw error

      let todayTotal = 0
      let yesterdayTotal = 0

      for (const order of data ?? []) {
        const amount = Number(order.total_price) || 0
        const d = new Date(order.created_at)

        if (d >= startOfToday && d < startOfTomorrow) todayTotal += amount
        else yesterdayTotal += amount
      }

      todaySales.value = todayTotal
      if (yesterdayTotal > 0) {
        todayTrend.value = Math.round(((todayTotal - yesterdayTotal) / yesterdayTotal) * 1000) / 10
      }
    } catch (e: any) {
      todayError.value = e?.message ?? 'Erro ao buscar vendas de hoje'
    } finally {
      todayLoading.value = false
    }
  }

  // — Pedidos + Status —
  const thisMonthOrders = ref(0)
  const totalOrdersHistoric = ref(0)
  const totalOrdersTrend = ref(0)
  const totalOrdersLoading = ref(false)
  const totalOrdersError = ref<string | null>(null)

  const statusCounts = ref({ pending: 0, paid: 0, shipped: 0 })

  const STATUS_CONFIG = [
    { key: 'pending', label: 'Pendente', color: '#f59e0b' },
    { key: 'paid',    label: 'Pago',     color: '#2F5946' },
    { key: 'shipped', label: 'Enviado',  color: '#6366f1' },
  ] as const

  const orderStatuses = computed(() => {
    const total = Object.values(statusCounts.value).reduce((s, n) => s + n, 0)
    return STATUS_CONFIG.map(s => ({
      label: s.label,
      color: s.color,
      count: statusCounts.value[s.key],
      pct: total > 0 ? Math.round((statusCounts.value[s.key] / total) * 100) : 0,
    }))
  })

  async function fetchTotalOrders() {
    totalOrdersLoading.value = true
    totalOrdersError.value = null
    thisMonthOrders.value = 0
    totalOrdersHistoric.value = 0
    totalOrdersTrend.value = 0
    statusCounts.value = { pending: 0, paid: 0, shipped: 0 }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('created_at, status')

      if (error) throw error

      const now = new Date()
      const thisMonth = now.getMonth()
      const thisYear = now.getFullYear()
      const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
      const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

      let thisMonthCount = 0
      let lastMonthCount = 0
      const counts = { pending: 0, paid: 0, shipped: 0 }

      for (const order of data ?? []) {
        const d = new Date(order.created_at)
        if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) thisMonthCount++
        else if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) lastMonthCount++

        if (order.status in counts) counts[order.status as keyof typeof counts]++
      }

      thisMonthOrders.value = thisMonthCount
      totalOrdersHistoric.value = data?.length ?? 0
      statusCounts.value = counts
      if (lastMonthCount > 0) {
        totalOrdersTrend.value = Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 1000) / 10
      }
    } catch (e: any) {
      totalOrdersError.value = e?.message ?? 'Erro ao buscar pedidos'
    } finally {
      totalOrdersLoading.value = false
    }
  }

  return {
    // Receita Total
    revenue, formattedRevenue, revenueTrend, revenueLoading, revenueError, fetchRevenue,
    // Ticket Médio (calculado na mesma query)
    avgTicket, formattedAvgTicket, avgTicketTrend,
    // Vendas Hoje
    todaySales, formattedTodaySales, todayTrend, todayLoading, todayError, fetchTodaySales,
    // Pedidos + Status
    thisMonthOrders, totalOrdersHistoric, totalOrdersTrend, totalOrdersLoading, totalOrdersError,
    orderStatuses, fetchTotalOrders,
  }
}
