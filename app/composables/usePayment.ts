import { reactive } from 'vue'
import { $fetch } from 'ofetch'
import type { TrackingOrder, PaymentMethod } from '~/shared/types'

declare global {
  interface Window {
    AppmaxScripts?: {
      init: (onSuccess: (data: { ip?: string }) => void, onError: () => void) => void
    }
  }
}

interface PixData {
  qr_code: string
  qr_code_text: string
  expires_at: string
}

interface BoletoData {
  barcode: string
  pdf_url: string
  expires_at: string
}

interface CreditCardForm {
  number: string
  holder_name: string
  expiry: string
  cvv: string
  installments: number
}

interface PaymentState {
  order: TrackingOrder | null
  loading: boolean
  error: string | null
  selectedMethod: PaymentMethod | null
  paymentStatus: 'idle' | 'processing' | 'waiting' | 'approved' | 'failed'
  pixData: PixData | null
  boletoData: BoletoData | null
  creditCardForm: CreditCardForm
  clientIp: string | null
}

const EDGE_BASE = 'https://sqqtbajwmmowvtothgal.supabase.co'

export function usePayment() {
  const supabase = useSupabase()

  const state = reactive<PaymentState>({
    order: null,
    loading: false,
    error: null,
    selectedMethod: null,
    paymentStatus: 'idle',
    pixData: null,
    boletoData: null,
    creditCardForm: {
      number: '',
      holder_name: '',
      expiry: '',
      cvv: '',
      installments: 1,
    },
    clientIp: null,
  })

  function splitName(fullName: string): { first_name: string; last_name: string } {
    const parts = fullName.trim().split(' ')
    return {
      first_name: parts[0] ?? '',
      last_name: parts.slice(1).join(' ') || (parts[0] ?? ''),
    }
  }

  async function collectIp(): Promise<string> {
    return new Promise<string>((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://scripts.appmax.com.br/appmax.min.js'
      script.onload = () => {
        if (window.AppmaxScripts) {
          window.AppmaxScripts.init(
            (data: { ip?: string }) => {
              state.clientIp = data.ip ?? ''
              resolve(state.clientIp)
            },
            () => {
              state.clientIp = ''
              resolve('')
            }
          )
        } else {
          state.clientIp = ''
          resolve('')
        }
      }
      script.onerror = () => {
        state.clientIp = ''
        resolve('')
      }
      document.head.appendChild(script)
    })
  }

  async function loadOrder(orderId: string) {
    state.loading = true
    state.error = null

    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, customer_phone, customer_document, total_price, status, created_at, shipped_at, delivered_at, tracking_code')
        .eq('id', orderId)
        .single()

      if (err) throw err
      if (!data) {
        state.error = 'Pedido não encontrado.'
        return
      }

      state.order = data as TrackingOrder
      await collectIp()
    } catch (e: unknown) {
      state.error = (e as Error)?.message ?? 'Erro ao carregar pedido.'
    } finally {
      state.loading = false
    }
  }

  function selectMethod(method: PaymentMethod | null) {
    state.selectedMethod = method
    state.paymentStatus = 'idle'
    state.pixData = null
    state.boletoData = null
  }

  async function generatePix() {
    if (!state.order) return
    state.paymentStatus = 'processing'
    state.error = null
    try {
      const { first_name, last_name } = splitName(state.order.customer_name)
      const res = await $fetch('/functions/v1/processar-pagamento', {
        baseURL: EDGE_BASE,
        method: 'POST',
        body: {
          supabase_order_id: state.order.id,
          method: 'pix',
          ip: state.clientIp ?? '',
          customer: {
            first_name,
            last_name,
            email: state.order.customer_email,
            phone: state.order.customer_phone ?? '',
            document_number: state.order.customer_document ?? '',
          },
        },
      })
      const pixPayment = (res as any)?.payment?.data
      state.pixData = {
        qr_code: pixPayment?.qr_code ?? '',
        qr_code_text: pixPayment?.qr_code_text ?? pixPayment?.pix_code ?? '',
        expires_at: pixPayment?.expires_at ?? new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      }
      state.paymentStatus = 'waiting'
    } catch (e: unknown) {
      state.error = (e as Error)?.message ?? 'Erro ao gerar Pix.'
      state.paymentStatus = 'failed'
    }
  }

  async function generateBoleto() {
    if (!state.order) return
    state.paymentStatus = 'processing'
    state.error = null
    try {
      const { first_name, last_name } = splitName(state.order.customer_name)
      const res = await $fetch('/functions/v1/processar-pagamento', {
        baseURL: EDGE_BASE,
        method: 'POST',
        body: {
          supabase_order_id: state.order.id,
          method: 'boleto',
          ip: state.clientIp ?? '',
          customer: {
            first_name,
            last_name,
            email: state.order.customer_email,
            phone: state.order.customer_phone ?? '',
            document_number: state.order.customer_document ?? '',
          },
        },
      })
      const boletoPayment = (res as any)?.payment?.data
      state.boletoData = {
        barcode: boletoPayment?.barcode ?? boletoPayment?.linha_digitavel ?? '',
        pdf_url: boletoPayment?.pdf_url ?? boletoPayment?.url ?? '#',
        expires_at: boletoPayment?.expires_at ?? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      }
      state.paymentStatus = 'waiting'
    } catch (e: unknown) {
      state.error = (e as Error)?.message ?? 'Erro ao gerar boleto.'
      state.paymentStatus = 'failed'
    }
  }

  async function submitCreditCard() {
    if (!state.order) return
    const f = state.creditCardForm
    if (!f.number.trim() || !f.holder_name.trim() || !f.expiry.trim() || !f.cvv.trim()) return
    state.paymentStatus = 'processing'
    state.error = null
    try {
      const { first_name, last_name } = splitName(state.order.customer_name)
      const [exp_month, exp_year] = f.expiry.replace(/\s/g, '').split('/')
      const res = await $fetch('/functions/v1/processar-pagamento', {
        baseURL: EDGE_BASE,
        method: 'POST',
        body: {
          supabase_order_id: state.order.id,
          method: 'credit_card',
          ip: state.clientIp ?? '',
          customer: {
            first_name,
            last_name,
            email: state.order.customer_email,
            phone: state.order.customer_phone ?? '',
            document_number: state.order.customer_document ?? '',
          },
          card: {
            number: f.number.replace(/\s/g, ''),
            holder_name: f.holder_name,
            expiration_month: exp_month,
            expiration_year: exp_year,
            cvv: f.cvv,
            installments: f.installments,
            holder_document_number: state.order.customer_document ?? '',
          },
        },
      })
      const status = (res as any)?.status
      state.paymentStatus = status === 'paid' ? 'approved' : 'failed'
      if (status !== 'paid') {
        state.error = 'Pagamento não aprovado. Verifique os dados do cartão.'
      }
    } catch (e: unknown) {
      state.error = (e as Error)?.message ?? 'Erro ao processar cartão.'
      state.paymentStatus = 'failed'
    }
  }

  async function copyToClipboard(text: string): Promise<void> {
    await navigator.clipboard.writeText(text)
  }

  return {
    state,
    loadOrder,
    selectMethod,
    generatePix,
    generateBoleto,
    submitCreditCard,
    copyToClipboard,
  }
}
