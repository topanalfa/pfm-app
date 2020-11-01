import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/users'
import Account from './modules/account'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    Account
  }
})
