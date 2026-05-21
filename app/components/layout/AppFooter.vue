<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer id="footer" class="bg-[#2F5946] text-[#E7D7BC]">

    <!-- ─── Corpo Principal ─── -->
    <div class="relative max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-12">

      <!-- Passarinho decorativo centralizado -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/images/logo_passarinho_2.png"
          alt=""
          class="h-60 w-60 object-contain opacity-[0.06]"
          aria-hidden="true"
        />
      </div>

      <div class="relative grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-16 md:gap-12 lg:gap-20 md:items-center">

        <!-- ─── Coluna 1: Marca ─── -->
        <div class="flex flex-col gap-6">
          <img
            src="/images/logo_nome_2.png"
            alt="Quintal dos Mineiros"
            class="h-[44px] w-auto object-contain self-start"
          />
          <p class="font-body text-sm text-[#E7D7BC]/60 leading-relaxed max-w-xs">
            Produtos artesanais selecionados diretamente de produtores de Minas Gerais.
            Autenticidade, qualidade e sabor genuíno desde a origem até sua mesa.
          </p>
          <div class="w-8 h-px bg-[#E7D7BC]/20" />
          <p class="font-display italic text-sm text-[#E7D7BC]/40">
            "O melhor de Minas na sua mesa."
          </p>
        </div>

        <!-- ─── Coluna 2: Informações ─── -->
        <div class="flex flex-col gap-6">
          <h4 class="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-[#E7D7BC]/35">
            Informações
          </h4>
          <nav class="flex flex-col gap-3">
            <a href="#" class="font-body text-sm text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200">
              Envios e Entregas
            </a>
            <a href="#" class="font-body text-sm text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200">
              Trocas e Devoluções
            </a>
            <a href="#" class="font-body text-sm text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200">
              Formas de Pagamento
            </a>
          </nav>
        </div>

        <!-- ─── Coluna 3: Contato ─── -->
        <div class="flex flex-col gap-6">
          <h4 class="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-[#E7D7BC]/35">
            Contato
          </h4>
          <div class="flex flex-col gap-3">

            <!-- WhatsApp -->
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-3 text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span class="font-body text-sm">WhatsApp</span>
            </a>

            <!-- Instagram -->
            <a
              href="https://instagram.com/quintaldosmineiros"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-3 text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              <span class="font-body text-sm">Instagram</span>
            </a>

            <!-- Email -->
            <a
              href="mailto:contato@quintaldosmineiros.com.br"
              class="group flex items-center gap-3 text-[#E7D7BC]/65 hover:text-[#E7D7BC] transition-colors duration-200"
            >
              <svg class="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span class="font-body text-sm">contato@quintaldosmineiros.com.br</span>
            </a>


          </div>
        </div>

      </div>

    </div>

    <!-- ─── Barra inferior ─── -->
    <div class="border-t border-white/10">
      <div class="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="font-body text-xs text-[#E7D7BC]/30">
          © {{ year }} Quintal dos Mineiros — Produtos artesanais de Minas Gerais
        </p>
        <p class="font-body text-xs text-[#E7D7BC]/20">
          Entregamos em todo o Brasil
        </p>
      </div>
    </div>

  </footer>
</template>
