// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Disable self-closing tags for Vue components - custom rule
  rules: {
    "vue/html-self-closing": ["error", {
      html: {
        void: 'any',
        normal: "always",
        component: "always"
      },
      svg: "always",
      math: "always"
    }]
  }
})