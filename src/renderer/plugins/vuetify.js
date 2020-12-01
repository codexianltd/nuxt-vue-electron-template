import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default ({ app }) => {
  app.vuetify = new Vuetify({
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdi'
    },
    theme: {
      options: {
        customProperties: true
      }
    }
  })
}
