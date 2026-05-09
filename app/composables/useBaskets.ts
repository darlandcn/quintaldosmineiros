// ─── useBaskets Composable ───
// Fonte central de dados para todas as cestas de presente da marca

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

export function useBaskets() {
  // ─── Definição das Cestas ───
  const baskets: Basket[] = [
    {
      id: 1,
      name: 'Cesta Mineira Clássica',
      tagline: 'A mais pedida',
      description:
        'A experiência completa de Minas Gerais em uma cesta. Queijo artesanal, doce de leite, biscoitos de polvilho, café especial e os sabores que definem Minas.',
      price: 'R$ 189,90',
      image: '/images/kit_minas.png',
      items: [
        { name: 'Queijo Canastra', icon: '🧀' },
        { name: 'Doce de Leite', icon: '🍯' },
        { name: 'Café Especial', icon: '☕' },
        { name: 'Biscoito de Polvilho', icon: '🍪' },
        { name: 'Goiabada Cascão', icon: '🫙' },
      ],
      highlight: true,
      occasion: 'Presente Perfeito',
    },
    {
      id: 2,
      name: 'Café da Manhã Premium',
      tagline: 'Despertar especial',
      description:
        'Um café da manhã mineiro sofisticado. Café especial, geleias artesanais, biscoitos finos e queijo curado para começar o dia com muito sabor.',
      price: 'R$ 149,90',
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Café Especial 250g', icon: '☕' },
        { name: 'Geleia de Jabuticaba', icon: '🫙' },
        { name: 'Biscoitos Artesanais', icon: '🍪' },
        { name: 'Queijo Curado', icon: '🧀' },
        { name: 'Mel Orgânico', icon: '🍯' },
      ],
      occasion: 'Aniversário',
    },
    {
      id: 3,
      name: 'Mesa Mineira Completa',
      tagline: 'Para reunir a família',
      description:
        'A seleção mais completa para uma tarde em família. Queijos, antipasti, torresmo artesanal, doces e o melhor café de Minas tudo em um só presente.',
      price: 'R$ 289,90',
      image:
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      items: [
        { name: 'Queijo Canastra', icon: '🧀' },
        { name: 'Torresmo Artesanal', icon: '🥩' },
        { name: 'Antipasti Mineiro', icon: '🫒' },
        { name: 'Doce de Leite', icon: '🍯' },
        { name: 'Goiabada Cascão', icon: '🫙' },
        { name: 'Café Especial', icon: '☕' },
      ],
      occasion: 'Família & Amigos',
    },
  ]

  return { baskets }
}
