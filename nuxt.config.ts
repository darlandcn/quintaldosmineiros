import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseAnonKey: '',
    },
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  // ─── CSS Global ───
  css: ['~/assets/css/main.css'],

  // ─── Vite Plugins ───
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['lucide-vue-next'],
    },
  },

  // ─── Componentes — sem prefixo de diretório no nome ───
  // Por padrão Nuxt usa o diretório como prefixo: layout/AppHeader → LayoutAppHeader
  // pathPrefix: false faz AppHeader ser usado diretamente como <AppHeader>
  components: [
    { path: '~/components', pathPrefix: false },
  ],

  // ─── Head / SEO / Fontes ───
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Manrope:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },
})
