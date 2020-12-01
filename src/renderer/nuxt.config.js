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
  plugins: [{ ssr: true, src: '@/plugins/icons.js' }],
  buildModules: [],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth', '@nuxtjs/vuetify'],
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#1867c0',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c'
        }
      }
    }
  },
  axios: {
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  }
}
