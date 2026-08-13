export const CONFIRMED_STATUSES = ['paid', 'shipped'] as const

export const getCartpandaCheckoutUrl = (quantity: number = 1) =>
  `https://quintal-dos-mineiros.mycartpanda.com/cart/add?id=205687497&quantity=${quantity}&checkout=true`
