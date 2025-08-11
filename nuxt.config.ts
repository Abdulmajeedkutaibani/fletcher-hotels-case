import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: { strict: true, shim: false },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        'https://frontend-case-api.alpha.fletcher.build/api',
      i18nDefault: 'nl',
    },
  },
  app: {
    head: {
      title: 'Mijn Fletcher — Case',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  nitro: {
    // Allow calling the external API from server routes if you later add server APIs
  },
});
