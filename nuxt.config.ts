// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // disable devtools
  // app meta tags
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: "Cổng thông tin du lịch Bắc Ninh",
      titleTemplate: '%s',
      link: [
        {
          rel: "canonical",
          href: "https://bacninh.vietnaminfo.net/"
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicon.ico"
        }
      ],
      meta: [
        {
          key: 'description', // <-- Add a unique key
          name: "description",
          content: "Cổng thông tin du lịch Bắc Ninh cung cấp những thông tin hữu ích nhất cho trải nghiệm du lịch của bạn."
        },
        {
          key: 'og:title', // <-- Add a unique key
          property: "og:title",
          content: "Cổng thông tin du lịch Bắc Ninh"
        },
        {
          key: 'og:type', // <-- Add a unique key
          property: "og:type",
          content: "website"
        },
        {
          key: 'og:url', // <-- Add a unique key
          property: "og:url",
          content: "https://bacninh.vietnaminfo.net/"
        },
        {
          key: 'og:description', // <-- Add a unique key
          property: "og:description",
          content: "Cổng thông tin du lịch Bắc Ninh cung cấp những thông tin hữu ích nhất cho trải nghiệm du lịch của bạn."
        },
        {
          key: 'og:image', // <-- Add a unique key
          property: "og:image",
          content: "https://bacninh.vietnaminfo.net/DataFiles/2025/03/Files/20250320-115405-rG5jiF4g.png"
        },
        {
          key: 'og:site_name', // <-- Add a unique key
          property: "og:site_name",
          content: "Cổng thông tin du lịch Bắc Ninh"
        },
        {
          key: 'robots', // <-- Add a unique key
          name: "robots",
          content: "index, follow"
        }
      ],
      
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

  runtimeConfig: {
    public: {
      serverEndpoint: process.env.NUXT_SERVER_ENDPOINT,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/style.scss";'
        }
      }
    }
  },

  plugins: ['~/plugins/gsap.js', { src: '~/plugins/leaflet.js', mode: 'client' }],
  pinia: {
    storesDirs: ['./stores/**'], // Optional: If you want to specify where your stores are
  },
  // modules
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-swiper',
    "nuxt-seo-utils",
    'dayjs-nuxt'
  ],
  //nuxt i18n
  i18n: {
    defaultLocale: 'vi',
    skipSettingLocaleOnNavigate: true,
    locales: [
      { code: 'vi', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    detectBrowserLanguage: false,
  },
  dayjs: {
    locales: ['en', 'vi'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'vi',
    defaultTimezone: 'Asia/Bangkok',
  }
})