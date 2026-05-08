// ─── useTestimonials Composable ───
// Depoimentos reais de clientes para a seção de prova social

export interface Testimonial {
  id: number
  name: string
  location: string
  text: string
  rating: number
  occasion?: string
}

export function useTestimonials() {
  // ─── Depoimentos dos Clientes ───
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ana Carolina',
      location: 'Belo Horizonte, MG',
      text: 'A cesta chegou lindamente embalada e os produtos são incríveis. O queijo Canastra e o doce de leite são de outro nível. Minha família ficou emocionada com cada sabor!',
      rating: 5,
      occasion: 'Natal em Família',
    },
    {
      id: 2,
      name: 'Roberto Nunes',
      location: 'São Paulo, SP',
      text: 'Presenteei minha mãe no aniversário e ela ficou emocionada. O atendimento pelo WhatsApp foi super personalizado — senti que estava comprando de quem realmente conhece os produtos.',
      rating: 5,
      occasion: 'Presente de Aniversário',
    },
    {
      id: 3,
      name: 'Fernanda Lopes',
      location: 'Rio de Janeiro, RJ',
      text: 'O café especial do Sul de Minas é simplesmente extraordinário. Já fiz três pedidos e sempre chega fresco, bem embalado e no prazo. Virei cliente fiel!',
      rating: 5,
      occasion: 'Compra Recorrente',
    },
    {
      id: 4,
      name: 'Gustavo Mendes',
      location: 'Uberlândia, MG',
      text: 'Comprei para presentear meu sócio. A apresentação é muito sofisticada e os produtos são genuinamente artesanais. Impressionou a todos no escritório.',
      rating: 5,
      occasion: 'Presente Corporativo',
    },
  ]

  return { testimonials }
}
