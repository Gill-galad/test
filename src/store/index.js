import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const baseConfigPagination = {
  page: 1,
  itemsPerPage: 10,
}

export default new Vuex.Store({
  state: {
    searchConfig: {
      text: '',
      pagination: baseConfigPagination,
    },
    packages: [],
    totalPackages: 0,
  },
  mutations: {
    UPDATE_SEARCH_TEXT(state, payload) {
      state.searchConfig.text = payload
    },
    SET_PACKAGES(state, payload) {
      state.packages = payload
    },
    SET_TOTAL_PACKAGES(state, payload) {
      state.totalPackages = payload
    },
    UPDATE_PAGINATION_OPTIONS(state, payload) {
      state.searchConfig.pagination = payload
    },
  },
  actions: {
    updateSearchText({ commit }, text) {
      commit('UPDATE_SEARCH_TEXT', text)
    },
    updatePaginationOptions({ commit }, options) {
      const newOptions = {
        page: options.page || baseConfigPagination.page,
        itemsPerPage: options.itemsPerPage || baseConfigPagination.i,
      }
      commit('UPDATE_PAGINATION_OPTIONS', newOptions)
    },
    async getDataFromApi({ state, commit }) {
      const { text, pagination } = state.searchConfig
      const { itemsPerPage: size, page } = pagination
      const from = (+page - 1) * +size
      const params = {
        text,
        size,
        from,
      }
      const { data, status } = await axios.get('https://registry.npmjs.org/-/v1/search', { params })

      if (status !== 200) alert('Something went wrong!')

      const { objects = [], total = 0 } = data

      commit('SET_PACKAGES', objects)
      commit('SET_TOTAL_PACKAGES', total)
    },
  },
})
