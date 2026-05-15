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
  <footer class="bg-[#2F5946] text-[#E7D7BC]">

    <!-- ─── Conteúdo Principal do Rodapé ─── -->
    <div class="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-12">

      <!-- Logo centralizada no topo -->
      <div class="flex flex-col items-center mb-12">
        <img
          src="/images/logo_passarinho_2.png"
          alt="Quintal dos Mineiros"
          class="h-[64px] w-[64px] object-contain"
        />
        <img
          src="/images/logo_nome_2.png"
          alt="Quintal dos Mineiros"
          class="h-[58px] object-contain -mt-1"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto">

        <!-- ─── Coluna Produtos ─── -->
        <div>
          <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946] mb-5">
            Produtos
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.produtos" :key="link.label">
              <a
                :href="link.href"
                class="font-body text-sm text-[#E7D7BC]/70 hover:text-[#E7D7BC] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>

        <!-- ─── Coluna Experiências ─── -->
        <div>
          <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946] mb-5">
            Experiências
          </h4>
          <ul class="flex flex-col gap-3">
            <li v-for="link in footerLinks.experiencias" :key="link.label">
              <a
                :href="link.href"
                class="font-body text-sm text-[#E7D7BC]/70 hover:text-[#E7D7BC] transition-colors"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>

          <!-- Endereço -->
          <div class="mt-8">
            <h4 class="font-body text-xs font-semibold tracking-[0.2em] uppercase text-[#2F5946] mb-3">
              Localização
            </h4>
            <p class="font-body text-sm text-[#E7D7BC]/70 leading-relaxed">
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
        <p class="font-body text-xs text-[#E7D7BC]/40">
          © {{ year }} Quintal dos Mineiros. Todos os direitos reservados.
        </p>

        <!-- Tagline -->
        <p class="font-display italic text-xs text-[#E7D7BC]/40">
          "O melhor de Minas na sua mesa."
        </p>
      </div>
    </div>
  </footer>
</template>
