// ─── Tipos Globais — Quintal dos Mineiros ────────────────────────────────────
// Centraliza todos os contratos de dados do projeto.
// Componentes e composables devem importar daqui, não de uns dos outros.

// ─── Pedidos — Status ─────────────────────────────────────────────────────────

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'invoiced'
  | 'delivered'
  | 'cancelled'

// ─── Pedidos — Visão Admin ────────────────────────────────────────────────────

export interface AdminOrderItem {
  name: string
  image: string
  qty: number
  unitPrice: string
  subtotal: string
}

export interface AdminOrderDetails {
  phone: string
  address: { street: string; number: string; city: string; state: string; zip: string }
  items: AdminOrderItem[]
  subtotal: string
  shipping: string
}

export interface AdminOrder {
  id: string
  rawId: string
  client: string
  date: string
  amount: string
  status: OrderStatus
  email?: string
  phone?: string
  address?: string
  notes?: string
  payment?: string
  details?: AdminOrderDetails
}

// ─── Pedidos — Visão Rastreamento (cliente) ───────────────────────────────────

export interface TrackingOrder {
  id: string
  customer_name: string
  customer_email: string
  total_price: number
  status: OrderStatus
  created_at: string
  shipped_at: string | null
  delivered_at: string | null
  tracking_code: string | null
}

export interface TrackingEvent {
  id: string
  order_id: string
  status: string
  description: string | null
  event_at: string
}

// ─── Pedidos — Dashboard recente ─────────────────────────────────────────────

export interface RecentOrder {
  id: string
  client: string
  date: string
  amount: string
  status: OrderStatus
}

// ─── Produtos ─────────────────────────────────────────────────────────────────

export interface Product {
  id: string
  name: string
  description: string
  price: string
  image: string
  stock: number
}

export interface ProductDetail {
  id: string
  name: string
  description: string
  price: number
  priceDisplay: string
  images: string[]
  stock: number
}

export interface AdminProduct {
  id: number
  name: string
  description: string
  price: number
  stock: number
  images: string[]
}

export type NewProduct = Omit<AdminProduct, 'id'>

// ─── Dashboard — Gráfico e Top Produtos ──────────────────────────────────────

export interface ChartPoint {
  day: string
  value: number
}

export interface TopProduct {
  name: string
  qty: number
  revenue: string
  image: string
}

// ─── Clientes ─────────────────────────────────────────────────────────────────

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

// ─── Carrinho ─────────────────────────────────────────────────────────────────

export interface CartItem {
  id: string
  name: string
  price: number
  priceDisplay: string
  quantity: number
  stock?: number
  image?: string
  icon?: string
}

// ─── Pagamento ────────────────────────────────────────────────────────────────

export type PaymentMethod = 'pix' | 'boleto' | 'credit_card'

// ─── Cestas ───────────────────────────────────────────────────────────────────

export interface BasketItem {
  name: string
  icon: string
}

export interface Basket {
  id: number
  name: string
  tagline: string
  description: string
  price: string
  image: string
  items: BasketItem[]
  highlight?: boolean
  occasion?: string
}

// ─── Montador de Cestas ───────────────────────────────────────────────────────

export interface BuilderItem {
  id: number
  name: string
  description: string
  icon: string
  category: string
  price: number
  priceDisplay: string
}

export interface BuilderCategory {
  id: string
  label: string
  icon: string
}

// ─── Depoimentos ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: number
  name: string
  location: string
  text: string
  rating: number
  occasion?: string
}

// ─── Financeiro ───────────────────────────────────────────────────────────────

export type ParceiroSlug = 'bling' | 'appmax' | 'loggi' | 'fornecedor'

export interface Parceiro {
  slug: ParceiroSlug
  nome: string
  categoria: string
  cor: string
  corTexto: string
  sigla: string
  totalMensal: number
  status: 'ok' | 'pendente' | 'vencido'
}

export interface BlingPagamento {
  mes: string
  vencimento: string
  valor: number
  status: 'pago' | 'pendente' | 'vencido'
}

export interface AppmaxTransacao {
  pedidoId: string
  data: string
  metodo: 'pix' | 'credito' | 'boleto'
  parcelas: number
  valorBruto: number
  taxaPercentual: number
  taxaFixa: number
  valorTaxa: number
  valorLiquido: number
}

export interface LoggiColeta {
  id: string
  data: string
  pedidoId: string
  destino: string
  status: 'entregue' | 'em_transito' | 'pendente' | 'cancelado'
  valor: number
}

export interface FornecedorConta {
  id: string
  fornecedor: string
  descricao: string
  vencimento: string
  valor: number
  status: 'pago' | 'pendente' | 'vencido'
  observacao?: string
}

export interface Repasse {
  pedidoId: string
  data: string
  quantidade: number
  valorBruto: number
  percentualRepasse: number
  valorRepasse: number
  statusPedido: OrderStatus
}
