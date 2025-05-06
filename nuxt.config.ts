// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false }, // disable devtools
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
        content: "/logo.webp",
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
              "@type": "Organization",
              "name": "HAJ",
              "url": "https://haj-fe.vercel.app",
            }
          `,
      },],
    },
    pageTransition: {
      name: "page",
      mode: "out-in"
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-swiper'
  ]
})