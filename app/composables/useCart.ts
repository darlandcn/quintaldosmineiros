import type { CartItem } from '~/shared/types'


export function useCart() {
  const items = useState<CartItem[]>('cart-items', () => [])
  const isOpen = useState<boolean>('cart-open', () => false)

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0),
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0),
  )

  const totalPriceDisplay = computed(
    () => `R$ ${totalPrice.value.toFixed(2).replace('.', ',')}`,
  )

  function addItem(item: Omit<CartItem, 'quantity'>) {
    const existing = items.value.find((i) => i.id === item.id)
    if (existing) {
      const limit = existing.stock ?? Infinity
      if (existing.quantity < limit) existing.quantity++
    } else {
      items.value = [...items.value, { ...item, quantity: 1 }]
    }
    isOpen.value = true
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id)
  }

  function decrementItem(id: string) {
    const item = items.value.find((i) => i.id === id)
    if (!item) return
    if (item.quantity <= 1) removeItem(id)
    else item.quantity--
  }

  function clearCart() {
    items.value = []
  }

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
