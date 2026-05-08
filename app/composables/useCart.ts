// ─── useCart Composable ───
// Estado global da cesta de compras — compartilhado entre Header, ProductCard e CartDrawer
// Usa useState do Nuxt para persistir entre componentes sem Pinia

export interface CartItem {
  id: string
  name: string
  price: number
  priceDisplay: string
  quantity: number
  image?: string
  icon?: string
}

export function useCart() {
  // ─── Estado global via useState (singleton por SSR hydration) ───
  const items = useState<CartItem[]>('cart-items', () => [])
  const isOpen = useState<boolean>('cart-open', () => false)

  // ─── Contagem total de itens (soma das quantidades) ───
  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  // ─── Valor total da cesta ───
  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0),
  )

  const totalPriceDisplay = computed(
    () => `R$ ${totalPrice.value.toFixed(2).replace('.', ',')}`,
  )

  // ─── Adiciona item (incrementa se já existir) ───
  function addItem(item: Omit<CartItem, 'quantity'>) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value = [...items.value, { ...item, quantity: 1 }]
    }
    isOpen.value = true
  }

  // ─── Remove completamente um item ───
  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  // ─── Decrementa quantidade (remove se chegar a zero) ───
  function decrementItem(id: string) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    if (item.quantity <= 1) removeItem(id)
    else item.quantity--
  }

  function clearCart() {
    items.value = []
  }

  // ─── Mensagem WhatsApp com resumo do pedido ───
  const whatsappMessage = computed(() => {
    if (items.value.length === 0)
      return encodeURIComponent('Olá! Gostaria de conhecer os produtos do Quintal dos Mineiros.')
    const list = items.value
      .map((i) => `${i.quantity}x ${i.name}`)
      .join(', ')
    return encodeURIComponent(
      `Olá! Quero fazer um pedido: ${list}. Total estimado: ${totalPriceDisplay.value}. Podem me ajudar?`,
    )
  })

  return {
    items,
    isOpen,
    totalItems,
    totalPrice,
    totalPriceDisplay,
    whatsappMessage,
    addItem,
    removeItem,
    decrementItem,
    clearCart,
  }
}
