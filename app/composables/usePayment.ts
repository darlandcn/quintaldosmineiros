// TODO: substituir generatePix(), generateBoleto() e submitCreditCard()
// por chamada à Supabase Edge Function `processar-pagamento`.
// A Edge Function receberá { orderId, method, ...dadosCartao }
// e retornará { pix_data?, boleto_data?, status }.
// Após aprovação, atualizar order no Supabase: status → 'paid', payment_method, appmax_payment_id.

import { reactive } from 'vue'
import type { TrackingOrder, PaymentMethod } from '~/shared/types'


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
}

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
  })

  async function loadOrder(orderId: string) {
    state.loading = true
    state.error = null

    try {
      const { data, error: err } = await supabase
        .from('orders')
        .select('id, customer_name, customer_email, total_price, status, created_at, shipped_at, delivered_at, tracking_code')
        .eq('id', orderId)
        .single()

      if (err) throw err
      if (!data) {
        state.error = 'Pedido não encontrado.'
        return
      }

      state.order = data as TrackingOrder
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
    state.paymentStatus = 'processing'
    await new Promise<void>(resolve => setTimeout(resolve, 1500))
    state.pixData = {
      qr_code: 'data:image/png;base64,iVBORw0KGgo=',
      qr_code_text: '00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540589.905802BR5925Quintal dos Mineiros LTDA6009SAO PAULO62070503***6304ABCD',
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    }
    state.paymentStatus = 'waiting'
  }

  async function generateBoleto() {
    state.paymentStatus = 'processing'
    await new Promise<void>(resolve => setTimeout(resolve, 1500))
    state.boletoData = {
      barcode: '34191.09008 61207.727308 71140.151686 1 97010000008990',
      pdf_url: '#',
      expires_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    }
    state.paymentStatus = 'waiting'
  }

  async function submitCreditCard() {
    const f = state.creditCardForm
    if (!f.number.trim() || !f.holder_name.trim() || !f.expiry.trim() || !f.cvv.trim()) return
    state.paymentStatus = 'processing'
    await new Promise<void>(resolve => setTimeout(resolve, 2500))
    state.paymentStatus = 'approved'
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
