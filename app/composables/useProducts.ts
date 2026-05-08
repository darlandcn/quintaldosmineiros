// ─── useProducts Composable ───
// Catálogo de produtos e lógica de filtragem por categoria

export interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  badge?: string
  category: string
  origin?: string
}

export interface Category {
  id: string
  label: string
  icon: string
}

export function useProducts() {
  // ─── Categorias do Catálogo ───
  const categories: Category[] = [
    { id: 'all',       label: 'Tudo',       icon: '✨' },
    { id: 'cestas',    label: 'Cestas',     icon: '🧺' },
    { id: 'queijos',   label: 'Queijos',    icon: '🧀' },
    { id: 'doces',     label: 'Doces',      icon: '🍯' },
    { id: 'cafe',      label: 'Café',       icon: '☕' },
    { id: 'biscoitos', label: 'Biscoitos',  icon: '🍪' },
    { id: 'gourmet',   label: 'Seleções',   icon: '🫒' },
    { id: 'presentes', label: 'Presentes',  icon: '🎁' },
  ]

  // ─── Lista de Produtos ───
  const products: Product[] = [
    // — Queijos Artesanais —
    {
      id: 1,
      name: 'Queijo Canastra Artesanal',
      description: 'Queijo meia-cura produzido na Serra da Canastra com leite cru integral. Sabor marcante e casca natural.',
      price: 'R$ 68,90',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
      badge: 'Favorito',
      category: 'queijos',
      origin: 'Serra da Canastra, MG',
    },
    {
      id: 2,
      name: 'Queijo Minas Frescal',
      description: 'Queijo fresco suave e cremoso, símbolo da culinária mineira. Feito com leite integral pasteurizado.',
      price: 'R$ 28,90',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
      category: 'queijos',
      origin: 'Minas Gerais',
    },
    {
      id: 3,
      name: 'Queijo do Serro',
      description: 'Queijo artesanal curado de sabor intenso e casca amarela. Patrimônio cultural imaterial do Brasil.',
      price: 'R$ 72,90',
      image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80',
      badge: 'Patrimônio',
      category: 'queijos',
      origin: 'Serro, MG',
    },

    // — Doces & Mel —
    {
      id: 4,
      name: 'Doce de Leite Cremoso',
      description: 'Doce de leite artesanal de textura sedosa e sabor inigualável. Produzido em pequenos lotes.',
      price: 'R$ 32,90',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      badge: 'Artesanal',
      category: 'doces',
      origin: 'Minas Gerais',
    },
    {
      id: 5,
      name: 'Goiabada Cascão',
      description: 'Goiabada cortada em blocos firmes e perfumados. Perfeita combinada com o queijo Canastra.',
      price: 'R$ 24,90',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      category: 'doces',
      origin: 'Interior de MG',
    },
    {
      id: 6,
      name: 'Mel Orgânico das Gerais',
      description: 'Mel silvestre colhido de flores nativas do cerrado mineiro. Produção sustentável e certificada.',
      price: 'R$ 45,90',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      badge: 'Orgânico',
      category: 'doces',
      origin: 'Triângulo Mineiro',
    },

    // — Café Especial —
    {
      id: 7,
      name: 'Café Especial Sul de Minas',
      description: 'Grãos Specialty com pontuação acima de 80. Notas de caramelo, frutas vermelhas e chocolate.',
      price: 'R$ 58,90',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      badge: 'Specialty',
      category: 'cafe',
      origin: 'Sul de Minas, MG',
    },
    {
      id: 8,
      name: 'Café Torrado Artesanal',
      description: 'Torra artesanal média que realça a doçura natural dos grãos mineiros. Moagem a pedido.',
      price: 'R$ 42,90',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
      category: 'cafe',
      origin: 'Matas de Minas, MG',
    },

    // — Biscoitos —
    {
      id: 9,
      name: 'Biscoito de Polvilho',
      description: 'Biscoito de polvilho azedo assado no forno, crocante e levinho. Receita de avó, tradição mineira.',
      price: 'R$ 22,90',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      category: 'biscoitos',
      origin: 'Minas Gerais',
    },
    {
      id: 10,
      name: 'Biscoito Amanteigado',
      description: 'Biscoito amanteigado de sabor delicado e textura que derrete na boca. Perfeito para o café.',
      price: 'R$ 28,90',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80',
      badge: 'Novo',
      category: 'biscoitos',
      origin: 'Minas Gerais',
    },

    // — Seleções Gourmet —
    {
      id: 11,
      name: 'Torresmo Artesanal',
      description: 'Torresmo de barriga crocante por fora e suculento por dentro. Temperado na receita mineira original.',
      price: 'R$ 38,90',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
      category: 'gourmet',
      origin: 'Minas Gerais',
    },
    {
      id: 12,
      name: 'Geleia de Jabuticaba',
      description: 'Geleia artesanal de jabuticaba do pomar. Cor intensa, sabor único e levemente agridoce.',
      price: 'R$ 35,90',
      image: 'https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80',
      badge: 'Favorito',
      category: 'gourmet',
      origin: 'Interior de MG',
    },
  ]

  // ─── Estado Reativo da Categoria Selecionada ───
  const selectedCategory = ref<string>('all')

  // ─── Produtos Filtrados por Categoria ───
  const filteredProducts = computed(() =>
    selectedCategory.value === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory.value),
  )

  return {
    categories,
    products,
    selectedCategory,
    filteredProducts,
  }
}
