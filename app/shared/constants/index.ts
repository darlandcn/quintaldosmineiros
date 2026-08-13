export const CONFIRMED_STATUSES = ['paid', 'shipped'] as const

export const getCartpandaCheckoutUrl = (variantId: string | number, quantity: number = 1) =>
  `https://quintal-dos-mineiros.mycartpanda.com/cart/add?id=${variantId}&quantity=${quantity}&checkout=true`
