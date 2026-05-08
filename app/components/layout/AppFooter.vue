<script setup lang="ts">
// ─── AppFooter Component ───
// Rodapé completo com links, contato, redes sociais e créditos

// ─── Links de Navegação do Rodapé ───
const footerLinks = {
  produtos: [
    { label: 'Cestas de Presente',  href: '#kits'     },
    { label: 'Queijos Artesanais',  href: '#produtos'  },
    { label: 'Doces & Mel',         href: '#produtos'  },
    { label: 'Café Especial',       href: '#produtos'  },
    { label: 'Biscoitos',           href: '#produtos'  },
    { label: 'Seleções Gourmet',    href: '#produtos'  },
  ],
  experiencias: [
    { label: 'Monte sua Cesta',     href: '#monte'     },
    { label: 'Nossa História',      href: '#historia'  },
    { label: 'Depoimentos',         href: '#depoimentos' },
  ],
}

// ─── Ano atual para o copyright ───
const year = new Date().getFullYear()
</script>

<template>
  <!-- Rodapé completo com fundo escuro quente -->
  <footer class="bg-[#2C1810] text-[#E6CDA1]">

    <!-- ─── Divisor Dourado no Topo do Rodapé ─── -->
    <GoldDivider :opacity="30" />

    <!-- ─── Conteúdo Principal do Rodapé ─── -->
    <div class="max-w-7xl mx-auto px-5 md:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        <!-- ─── Coluna da Marca ─── -->
        <div class="lg:col-span-2">

          <!-- Logo e nome -->
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 rounded-full bg-[#DE8402] flex items-center justify-center">
              <span class="font-display text-white font-bold text-lg">Q</span>
            </div>
            <div>
              <span class="font-display font-bold text-white text-xl block">Quintal dos Mineiros</span>
              <span class="font-body text-[10px] tracking-[0.2em] uppercase text-[#DE8402]">Sabores de Minas</span>
            </div>
          </div>

          <!-- Descrição da marca -->
          <p class="font-body text-sm text-[#E6CDA1]/70 leading-relaxed max-w-sm">
            Selecionamos os melhores produtos artesanais de Minas Gerais para levar a você
            o sabor genuíno de uma tarde mineira. Queijos, doces, café e muito carinho em cada cesta.
          </p>

          <!-- Contato WhatsApp -->
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mt-6 font-body text-sm font-semibold
                   text-white hover:text-[#DE8402] transition-colors"
          >
            <svg class="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            (31) 9 9999-9999
          </a>
        </div>

        <!-- ─── Coluna Produtos ─── -->
        <div>
          <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#DE8402] mb-5">
            Produtos
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.produtos" :key="link.label">
              <a
                :href="link.href"
                class="font-body text-sm text-[#E6CDA1]/70 hover:text-[#E6CDA1] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- ─── Coluna Experiências ─── -->
        <div>
          <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#DE8402] mb-5">
            Experiências
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.experiencias" :key="link.label">
              <a
                :href="link.href"
                class="font-body text-sm text-[#E6CDA1]/70 hover:text-[#E6CDA1] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <!-- Endereço -->
          <div class="mt-8">
            <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#DE8402] mb-3">
              Localização
            </h4>
            <p class="font-body text-sm text-[#E6CDA1]/70 leading-relaxed">
              Minas Gerais, Brasil<br />
              Entregamos em todo o país
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── Barra de Copyright ─── -->
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

        <!-- Copyright -->
        <p class="font-body text-xs text-[#E6CDA1]/40">
          © {{ year }} Quintal dos Mineiros. Todos os direitos reservados.
        </p>

        <!-- Tagline -->
        <p class="font-display italic text-xs text-[#E6CDA1]/40">
          "O melhor de Minas na sua mesa."
        </p>
      </div>
    </div>
  </footer>
</template>
