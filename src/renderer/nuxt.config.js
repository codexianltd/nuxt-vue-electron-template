/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
require('../../config')

console.log({ API_URL: process.env.API_URL })
module.exports = {
  ssr: false, // or 'universal'
  head: {
    title: 'stock-ticker',
    meta: [{ charset: 'utf-8' }]
  },
  loading: false,

  plugins: [{ ssr: true, src: '@/plugins/icons.js' }, '@/plugins/fontawesome'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  buildModules: ['@nuxtjs/vuetify'],

  webfontloader: {
    google: {
      families: ['Roboto:400,500,700,900'] // Loads Lato font with weights 400 and 700
    }
  },
  css: [{ src: '~/assets/variables.scss', lang: 'scss' }],

  vuetify: {
    optionsPath: './vuetify.options.js'
  },

  axios: {
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'access_token' },
          user: { url: 'me', method: 'get', propertyName: 'user' },
          logout: false
        }
      }
    }
  }
}
