export interface ProductDetailFaq {
  q: string
  a: string
}

export interface ProductDetailBenefit {
  title: string
  desc: string
  circle: boolean
  paths: string[]
}

export interface ProductDetailContent {
  match: (name: string) => boolean
  eyebrow: string
  titleLines: string[]
  highlight: string
  description: string
  benefits: ProductDetailBenefit[]
  faqs: ProductDetailFaq[]
}

const PRODUCT_DETAILS: ProductDetailContent[] = [
  {
    match: name => name.toLowerCase().includes('torresmo'),
    eyebrow: 'Quintal dos Mineiros · Curadoria Especial',
    titleLines: ['Torresmo Crocante em 5 Minutos.'],
    highlight: 'Sem Estouros. Sem Sujeira.',
    description: 'A crocância de Minas na sua casa com a praticidade que faltava. Você só faz a melhor parte: a pururuca perfeita, com total segurança.',
    benefits: [
      {
        title: '5 Minutos e Tá na Mesa:',
        desc: 'É só levar à panela. Incrivelmente rápido.',
        circle: true,
        paths: ['M12 6v6l4 2'],
      },
      {
        title: 'Sua Cozinha Fica Limpa:',
        desc: 'Sem fumaça, sem respingos. É quase mágica.',
        circle: false,
        paths: ['M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'],
      },
      {
        title: 'Sempre à Mão na Despensa:',
        desc: 'Não precisa de geladeira. É a sua arma secreta.',
        circle: false,
        paths: ['M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z', 'M16 3h-8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z'],
      },
    ],
    faqs: [
      {
        q: 'Como preparo?',
        a: 'Aqueça uma panela em fogo médio, despeje o conteúdo e mexa por cerca de 5 minutos até atingir a pururuca dourada. Sem óleo, sem complicação.',
      },
      {
        q: 'Precisa de geladeira?',
        a: 'Antes de abrir, não — fica tranquilo na despensa em temperatura ambiente. Depois de aberto, conserve na geladeira.',
      },
      {
        q: 'Qual a validade do produto?',
        a: 'Nossos lotes têm validade de 6 meses (fechados). Após aberto, recomendamos o consumo imediato para garantir a máxima crocância.',
      },
    ],
  },
]

export function getProductDetailContent(productName: string): ProductDetailContent | undefined {
  return PRODUCT_DETAILS.find(entry => entry.match(productName))
}
