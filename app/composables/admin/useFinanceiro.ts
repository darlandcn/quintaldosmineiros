import { ref, computed } from 'vue'
import type {
  ParceiroSlug,
  Parceiro,
  BlingPagamento,
  AppmaxTransacao,
  LoggiColeta,
  FornecedorConta,
  Repasse,
} from '~/shared/types'
import { formatBRL } from '~/utils/formatters'


export function calcularTaxaAppmax(
  metodo: 'pix' | 'credito' | 'boleto',
  valorBruto: number,
  parcelas = 1,
): Pick<AppmaxTransacao, 'taxaPercentual' | 'taxaFixa' | 'valorTaxa' | 'valorLiquido'> {
  const gateway = 0.99

  if (metodo === 'pix') {
    const percentual = 1.00
    const fixa = gateway
    const valorTaxa = (valorBruto * percentual / 100) + fixa
    return { taxaPercentual: percentual, taxaFixa: fixa, valorTaxa, valorLiquido: valorBruto - valorTaxa }
  }

  if (metodo === 'boleto') {
    const fixa = 3.49 + gateway
    return { taxaPercentual: 0, taxaFixa: fixa, valorTaxa: fixa, valorLiquido: valorBruto - fixa }
  }

  const percentualBase = 4.99
  const percentualParcelamento = parcelas > 1 ? (parcelas - 1) * 2.49 : 0
  const percentualTotal = percentualBase + percentualParcelamento
  const fixa = gateway
  const valorTaxa = (valorBruto * percentualTotal / 100) + fixa
  return { taxaPercentual: percentualTotal, taxaFixa: fixa, valorTaxa, valorLiquido: valorBruto - valorTaxa }
}

const PRECO_TORRESMO = 89.90
const PERCENTUAL_FAZENDA = 24.5

const repasesData: Repasse[] = [
  { pedidoId: '#9561', data: '21/05/2026', quantidade: 1, valorBruto: 1 * PRECO_TORRESMO, percentualRepasse: PERCENTUAL_FAZENDA, valorRepasse: 1 * PRECO_TORRESMO * PERCENTUAL_FAZENDA / 100, statusPedido: 'shipped'   },
  { pedidoId: '#1878', data: '20/05/2026', quantidade: 1, valorBruto: 1 * PRECO_TORRESMO, percentualRepasse: PERCENTUAL_FAZENDA, valorRepasse: 1 * PRECO_TORRESMO * PERCENTUAL_FAZENDA / 100, statusPedido: 'paid'      },
  { pedidoId: '#9401', data: '19/05/2026', quantidade: 2, valorBruto: 2 * PRECO_TORRESMO, percentualRepasse: PERCENTUAL_FAZENDA, valorRepasse: 2 * PRECO_TORRESMO * PERCENTUAL_FAZENDA / 100, statusPedido: 'delivered' },
  { pedidoId: '#5007', data: '19/05/2026', quantidade: 1, valorBruto: 1 * PRECO_TORRESMO, percentualRepasse: PERCENTUAL_FAZENDA, valorRepasse: 1 * PRECO_TORRESMO * PERCENTUAL_FAZENDA / 100, statusPedido: 'pending'   },
  { pedidoId: '#1530', data: '16/05/2026', quantidade: 1, valorBruto: 1 * PRECO_TORRESMO, percentualRepasse: PERCENTUAL_FAZENDA, valorRepasse: 1 * PRECO_TORRESMO * PERCENTUAL_FAZENDA / 100, statusPedido: 'cancelled' },
]

const fornecedorTotalMensal = repasesData
  .filter(r => r.statusPedido !== 'cancelled')
  .reduce((s, r) => s + r.valorRepasse, 0)

export function useFinanceiro() {
  const parceiros = ref<Parceiro[]>([
    { slug: 'bling',      nome: 'Bling',       categoria: 'ERP / NF-e',           sigla: 'BLG', cor: 'bg-green-50',  corTexto: 'text-green-700',  totalMensal: 120, status: 'ok'       },
    { slug: 'appmax',     nome: 'AppMax',       categoria: 'Gateway de pagamento',  sigla: 'APX', cor: 'bg-blue-50',   corTexto: 'text-blue-600',   totalMensal: 0,   status: 'pendente' },
    { slug: 'loggi',      nome: 'Loggi',        categoria: 'Logística / Frete',     sigla: 'LGG', cor: 'bg-orange-50', corTexto: 'text-orange-600', totalMensal: 0,   status: 'pendente' },
    { slug: 'fornecedor', nome: 'Fornecedores', categoria: 'Produtos / Insumos',    sigla: 'FOR', cor: 'bg-purple-50', corTexto: 'text-purple-600', totalMensal: fornecedorTotalMensal, status: 'pendente' },
  ])

  const blingPagamentos = ref<BlingPagamento[]>([
    { mes: 'Junho 2026',     vencimento: '10/06/2026', valor: 120, status: 'pendente' },
    { mes: 'Maio 2026',      vencimento: '10/05/2026', valor: 120, status: 'pago'     },
    { mes: 'Abril 2026',     vencimento: '10/04/2026', valor: 120, status: 'pago'     },
    { mes: 'Março 2026',     vencimento: '10/03/2026', valor: 120, status: 'pago'     },
    { mes: 'Fevereiro 2026', vencimento: '10/02/2026', valor: 120, status: 'pago'     },
    { mes: 'Janeiro 2026',   vencimento: '10/01/2026', valor: 120, status: 'pago'     },
  ])

  const appmaxTransacoes = ref<AppmaxTransacao[]>([
    { pedidoId: '#9561', data: '21/05/2026', metodo: 'pix',     parcelas: 1, valorBruto: 89.90, ...calcularTaxaAppmax('pix',     89.90)    },
    { pedidoId: '#2258', data: '21/05/2026', metodo: 'credito', parcelas: 1, valorBruto: 89.90, ...calcularTaxaAppmax('credito', 89.90)    },
    { pedidoId: '#0434', data: '20/05/2026', metodo: 'boleto',  parcelas: 1, valorBruto: 89.90, ...calcularTaxaAppmax('boleto',  89.90)    },
    { pedidoId: '#2996', data: '20/05/2026', metodo: 'credito', parcelas: 3, valorBruto: 89.90, ...calcularTaxaAppmax('credito', 89.90, 3) },
    { pedidoId: '#1878', data: '20/05/2026', metodo: 'pix',     parcelas: 1, valorBruto: 89.90, ...calcularTaxaAppmax('pix',     89.90)    },
  ])

  const loggiColetas = ref<LoggiColeta[]>([
    { id: 'LGG-001', data: '03/06/2026', pedidoId: '#0142', destino: 'Belo Horizonte, MG – Savassi',      status: 'em_transito', valor: 28.50 },
    { id: 'LGG-002', data: '01/06/2026', pedidoId: '#0138', destino: 'Contagem, MG – Centro',             status: 'entregue',    valor: 22.90 },
    { id: 'LGG-003', data: '30/05/2026', pedidoId: '#0135', destino: 'Belo Horizonte, MG – Pampulha',    status: 'entregue',    valor: 19.80 },
    { id: 'LGG-004', data: '27/05/2026', pedidoId: '#0131', destino: 'Nova Lima, MG – Vila da Serra',    status: 'entregue',    valor: 34.70 },
  ])

  const fornecedorContas = ref<FornecedorConta[]>([
    { id: 'FOR-001', fornecedor: 'Frigorífico São Judas',  descricao: 'Porco – lote 40 kg',                    vencimento: '10/06/2026', valor: 560.00, status: 'pendente' },
    { id: 'FOR-002', fornecedor: 'Embalagens Minas',       descricao: 'Sacolas e embalagens – caixa 500 un.',  vencimento: '15/06/2026', valor: 187.50, status: 'pendente' },
    { id: 'FOR-003', fornecedor: 'Distribuidora Central',  descricao: 'Banha de porco – lata 5 kg',            vencimento: '05/06/2026', valor: 98.00,  status: 'vencido', observacao: 'Contato pendente para renegociação' },
  ])

  const repasses = ref<Repasse[]>(repasesData)

  function statusRepasse(statusPedido: Repasse['statusPedido']): 'realizado' | 'aguardando' | 'cancelado' {
    if (statusPedido === 'cancelled') return 'cancelado'
    if (statusPedido === 'pending') return 'aguardando'
    return 'realizado'
  }

  const parceiroAtivo = ref<Parceiro | null>(null)
  const showDrawer = ref(false)

  const totalAPagarMes = computed(() => {
    const bling = blingPagamentos.value
      .filter(c => c.status !== 'pago')
      .reduce((s, c) => s + c.valor, 0)
    const fornecedor = fornecedorContas.value
      .filter(c => c.status !== 'pago')
      .reduce((s, c) => s + c.valor, 0)
    return bling + fornecedor
  })

  const totalPendentes = computed(() => {
    const bling = blingPagamentos.value.filter(c => c.status !== 'pago').length
    const fornecedor = fornecedorContas.value.filter(c => c.status !== 'pago').length
    return bling + fornecedor
  })

  const totalPagoMes = computed(() => {
    const bling = blingPagamentos.value
      .filter(c => c.status === 'pago')
      .reduce((s, c) => s + c.valor, 0)
    const fornecedor = fornecedorContas.value
      .filter(c => c.status === 'pago')
      .reduce((s, c) => s + c.valor, 0)
    return bling + fornecedor
  })

  const proximoVencimento = computed(() => {
    const datas: Date[] = []

    for (const c of blingPagamentos.value) {
      if (c.status !== 'pago') {
        const [dd, mm, yyyy] = c.vencimento.split('/')
        datas.push(new Date(Number(yyyy), Number(mm) - 1, Number(dd)))
      }
    }

    for (const c of fornecedorContas.value) {
      if (c.status !== 'pago') {
        const [dd, mm, yyyy] = c.vencimento.split('/')
        datas.push(new Date(Number(yyyy), Number(mm) - 1, Number(dd)))
      }
    }

    if (datas.length === 0) return '—'
    datas.sort((a, b) => a.getTime() - b.getTime())
    return datas[0].toLocaleDateString('pt-BR')
  })

  const totalAPagarMesDisplay = computed(() => formatBRL(totalAPagarMes.value))
  const totalPendentesDisplay = computed(() => String(totalPendentes.value))
  const totalPagoMesDisplay = computed(() => formatBRL(totalPagoMes.value))

  function openDrawer(slug: ParceiroSlug) {
    parceiroAtivo.value = parceiros.value.find(p => p.slug === slug) ?? null
    showDrawer.value = true
  }

  function closeDrawer() {
    showDrawer.value = false
    setTimeout(() => { parceiroAtivo.value = null }, 300)
  }

  return {
    parceiros,
    parceiroAtivo,
    showDrawer,
    blingPagamentos,
    appmaxTransacoes,
    loggiColetas,
    fornecedorContas,
    repasses,
    statusRepasse,
    totalAPagarMesDisplay,
    totalPendentesDisplay,
    totalPagoMesDisplay,
    proximoVencimento,
    openDrawer,
    closeDrawer,
    calcularTaxaAppmax,
  }
}
