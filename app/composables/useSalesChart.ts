import type { ChartPoint } from '~/shared/types'
import { CONFIRMED_STATUSES } from '~/shared/constants'


const DAYS_PT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

function localDateKey(iso: string): string {
  const d = new Date(iso)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function useSalesChart() {
  const supabase = useSupabase()

  const chartData = ref<ChartPoint[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSalesChart() {
    loading.value = true
    error.value = null
    chartData.value = []

    try {
      const now = new Date()

      const dayMap = new Map<string, number>()
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
        dayMap.set(key, 0)
      }

      const startOfWindow = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6)

      const { data, error: err } = await supabase
        .from('orders')
        .select('total_price, created_at')
        .in('status', CONFIRMED_STATUSES)
        .gte('created_at', startOfWindow.toISOString())

      if (err) throw err

      for (const order of data ?? []) {
        const key = localDateKey(order.created_at)
        if (dayMap.has(key)) {
          dayMap.set(key, (dayMap.get(key) ?? 0) + (Number(order.total_price) || 0))
        }
      }

      chartData.value = [...dayMap.entries()].map(([key, value]) => {
        const d = new Date(key + 'T12:00:00')
        return { day: DAYS_PT[d.getDay()], value }
      })
    } catch (e: unknown) {
      error.value = (e as Error)?.message ?? 'Erro ao buscar dados do gráfico'
    } finally {
      loading.value = false
    }
  }

  return { chartData, loading, error, fetchSalesChart }
}
