// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxthub/core',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },
})