// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // disable devtools
  // app meta tags
  app: {
    head: {
      title: "Cổng thông tin du lịch Bắc Ninh",
      link: [{
        rel: "canonical",
        href: "https://bacninh.vietnaminfo.net/"
      },
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      ],
      meta: [{
        name: "description",
        content: "Cổng thông tin du lịch Bắc Ninh cung cấp những thông tin hữu ích nhất cho trải nghiệm du lịch của bạn.",
      },
      {
        property: "og:title",
        content: "Cổng thông tin du lịch Bắc Ninh",
      },
      {
        property: "og:type",
        content: "website"// change to article if you are using a blog
      },
      {
        property: "og:url",
        content: "https://bacninh.vietnaminfo.net/"
      },
      {
        property: "og:description",
        content: "Cổng thông tin du lịch Bắc Ninh cung cấp những thông tin hữu ích nhất cho trải nghiệm du lịch của bạn.",
      },
      {
        property: "og:image",
        content: "https://bacninh.vietnaminfo.net/DataFiles/2025/03/Files/20250320-115405-rG5jiF4g.png",
      },
      {
        property: "og:sitename",
        content: "Cổng thông tin du lịch Bắc Ninh",
      },
      {
        name: "robots",
        content: "index, follow"
      },
        // Add other meta tags as needed
      ],
      script: [{
        type: "application/ld+json",
        innerHTML: `
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Cổng thông tin du lịch Bắc Ninh",
              "url": "https://bacninh.vietnaminfo.net",
            }
          `,
      },],
    },
  },
  // route rules
  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 hour
    '/api/*': { cache: { maxAge: 60 * 60 } },
    // Redirection to avoid 404
    '/old-page': {
      redirect: { to: '/', statusCode: 302 }
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/style.scss";'
        }
      }
    }
  },

  // modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-swiper'
  ],
  //nuxt i18n
  i18n: {
    defaultLocale: 'vi',
    locales: [
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
  },
})