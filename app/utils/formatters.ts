export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function shortId(uuid: string): string {
  const num = parseInt(uuid.replace(/-/g, '').slice(-8), 16) % 10000
  return '#' + String(num).padStart(4, '0')
}
