// Persiste o carrinho no localStorage e restaura ao recarregar a página.
// Roda apenas no cliente (.client.ts) — uma única instância do watch.
export default defineNuxtPlugin(() => {
  const { items } = useCart()

  const STORAGE_KEY = 'qdm-cart'

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) items.value = JSON.parse(saved)
  } catch {}

  watch(items, val => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch {}
  }, { deep: true })
})
