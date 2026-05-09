// ─── useBasketBuilder Composable ───
// Estado reativo para a experiência interativa de "Monte sua Cesta"

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

export function useBasketBuilder() {
  // ─── Categorias do Montador ───
  const builderCategories: BuilderCategory[] = [
    { id: 'queijos',   label: 'Queijos',      icon: '🧀' },
    { id: 'doces',     label: 'Doces & Mel', icon: '🍯' },
    { id: 'cafe',      label: 'Café',         icon: '☕' },
    { id: 'biscoitos', label: 'Biscoitos',    icon: '🍪' },
    { id: 'geleias',   label: 'Geleias',      icon: '🫙' },
    { id: 'paes',      label: 'Pães & Roscas', icon: '🍞' },
  ]

  // ─── Itens Disponíveis para a Cesta ───
  const builderItems: BuilderItem[] = [
    // Queijos
    { id: 1,  name: 'Queijo Canastra',      description: 'Meia-cura, leite cru, Serra da Canastra',   icon: '🧀', category: 'queijos',   price: 28, priceDisplay: '+R$ 28' },
    { id: 2,  name: 'Queijo Frescal',       description: 'Fresco e cremoso, sabor suave',              icon: '🧀', category: 'queijos',   price: 18, priceDisplay: '+R$ 18' },
    { id: 3,  name: 'Queijo do Serro',      description: 'Curado, sabor intenso, patrimônio',          icon: '🧀', category: 'queijos',   price: 32, priceDisplay: '+R$ 32' },
    // Doces & Mel
    { id: 4,  name: 'Doce de Leite',        description: 'Cremoso artesanal, pote 250g',               icon: '🍯', category: 'doces',     price: 22, priceDisplay: '+R$ 22' },
    { id: 5,  name: 'Goiabada Cascão',      description: 'Firme e perfumada, 200g',                    icon: '🫙', category: 'doces',     price: 18, priceDisplay: '+R$ 18' },
    { id: 6,  name: 'Mel Orgânico',         description: 'Cerrado Mineiro, frasco 200g',               icon: '🍯', category: 'doces',     price: 32, priceDisplay: '+R$ 32' },
    // Café
    { id: 7,  name: 'Café Specialty',       description: 'Sul de Minas, grãos 250g',                   icon: '☕', category: 'cafe',      price: 38, priceDisplay: '+R$ 38' },
    { id: 8,  name: 'Café Torrado',         description: 'Torra artesanal média, 250g',                icon: '☕', category: 'cafe',      price: 28, priceDisplay: '+R$ 28' },
    // Biscoitos
    { id: 9,  name: 'Biscoito de Polvilho', description: 'Assado, crocante, pacote 100g',              icon: '🍪', category: 'biscoitos', price: 16, priceDisplay: '+R$ 16' },
    { id: 10, name: 'Biscoito Amanteigado', description: 'Artesanal, pacote 150g',                     icon: '🍪', category: 'biscoitos', price: 18, priceDisplay: '+R$ 18' },
    // Geleias
    { id: 11, name: 'Geleia de Jabuticaba', description: 'Artesanal, cor intensa, pote 200g',          icon: '🫙', category: 'geleias',   price: 24, priceDisplay: '+R$ 24' },
    { id: 12, name: 'Geleia de Pimenta',    description: 'Agridoce, combina com queijos, pote 200g',   icon: '🫙', category: 'geleias',   price: 22, priceDisplay: '+R$ 22' },
    { id: 13, name: 'Geleia de Laranja',    description: 'Cítrica e perfumada, pote 200g',             icon: '🫙', category: 'geleias',   price: 20, priceDisplay: '+R$ 20' },
    { id: 14, name: 'Marmelada Artesanal',  description: 'Firme e adocicada, bloco 250g',              icon: '🫙', category: 'geleias',   price: 22, priceDisplay: '+R$ 22' },
    // Pães & Roscas
    { id: 15, name: 'Broa de Milho',        description: 'Forno de pedra, receita mineira, 300g',      icon: '🌽', category: 'paes',      price: 18, priceDisplay: '+R$ 18' },
    { id: 16, name: 'Pão de Queijo',        description: 'Polvilho e queijo Canastra, pacote 200g',    icon: '🧀', category: 'paes',      price: 22, priceDisplay: '+R$ 22' },
    { id: 17, name: 'Rosca de Polvilho',    description: 'Crocante e levinha, receita tradicional, 150g', icon: '🍩', category: 'paes',  price: 16, priceDisplay: '+R$ 16' },
  ]

  // ─── Preço Base da Cesta (embalagem + fita + cartão) ───
  const basePrice = 39.90

  // ─── Estado dos Itens Selecionados ───
  const selectedItems = ref<Set<number>>(new Set())

  // ─── Alterna seleção de um item ───
  function toggleItem(id: number) {
    const next = new Set(selectedItems.value)
    next.has(id) ? next.delete(id) : next.add(id)
    selectedItems.value = next
  }

  // ─── Contagem de Itens Selecionados ───
  const selectedCount = computed(() => selectedItems.value.size)

  // ─── Preço Total Calculado ───
  const totalPrice = computed(() => {
    const itemsTotal = [...selectedItems.value].reduce((sum, id) => {
      const item = builderItems.find((i) => i.id === id)
      return sum + (item?.price ?? 0)
    }, 0)
    return basePrice + itemsTotal
  })

  // ─── Preço Total Formatado em Reais ───
  const totalPriceDisplay = computed(
    () => `R$ ${totalPrice.value.toFixed(2).replace('.', ',')}`,
  )

  // ─── Nomes dos Itens Selecionados para o WhatsApp ───
  const selectedItemNames = computed(() =>
    [...selectedItems.value]
      .map((id) => builderItems.find((i) => i.id === id)?.name)
      .filter(Boolean)
      .join(', '),
  )

  // ─── Mensagem WhatsApp pré-formatada ───
  const whatsappMessage = computed(() => {
    const items = selectedItemNames.value || 'ainda não selecionei os itens'
    return encodeURIComponent(
      `Olá! Quero montar uma cesta personalizada com: ${items}. Valor estimado: ${totalPriceDisplay.value}. Podem me ajudar?`,
    )
  })

  return {
    builderCategories,
    builderItems,
    selectedItems,
    selectedCount,
    totalPrice,
    totalPriceDisplay,
    selectedItemNames,
    whatsappMessage,
    toggleItem,
  }
}
