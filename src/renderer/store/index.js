import { cookieFromRequest } from '~/lib'

export const getDefaultState = () => ({ user: state => state.$auth.user, loggedIn: state => state.$auth.loggedIn })

export const state = getDefaultState

export const actions = {
  resetState ({ commit }) {
    commit('SET_RESET_STATE')
  },
  nuxtServerInit ({ commit }, { req }) {
    const token = cookieFromRequest(req, 'token')
    if (token) {
      // commit('auth/SET_TOKEN', token);
    }

    const locale = cookieFromRequest(req, 'locale')
    if (locale) {
      // commit('lang/SET_LOCALE', { locale });
    }
  },

  async nuxtClientInit ({ commit, dispatch }) {
    try {
      // await dispatch('settings/getCurrencies');
      // await dispatch('settings/fetchSystemSettings');
    } catch (error) {
      console.log(error)
    }
  }
}

export const mutations = {
  SET_RESET_STATE (state) {
    Object.assign(state, getDefaultState())
  }
}

export const strict = false
