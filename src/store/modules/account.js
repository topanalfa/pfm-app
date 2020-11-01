const tgl= new Date().getTime()
const data = {
  namespaced: true,
  state: {
    accountType: [
      "Bank",
      "Loan",
    ],
    categories: [
      'Shopping',
      'Gift',
      'Traveling',
      'Investemnt',
    ],
    transanctions: [
      {
        id:1,
        category: 'Shopping',
        date: "2020-11-23",
        typeAccount: 'Bank',
        amount: 300000,
        description: 'Jajan odading',
      },
      {
        id:2,
        category: 'Gift',
        date: "2020-11-09",
        typeAccount: 'Loan',
        amount: 120000,
        description: 'Gaji Okt',
      },
    ]
  },
  getters: {
    listAccounts: state => {
      return state.accountType
    },
    listTransactions: state => {
      return state.transanctions
    },
    listCategories: state => {
      return state.categories
    }
  },
  mutations: {
    ADD_ACCOUNT_TYPE: (state, payload) => {
      if (state.accountType.length >= 1) {
        let checkName = state.accountType.some(val => val === payload)
        if (!checkName) {
          state.accountType.push(payload)
        }
      } else {
        state.accountType.push(payload)
      }
    },
    INSERT_TRANSACTION: (state, payload) => {
      state.transanctions.push(payload)
    },
    UPDATE_TRANSACTION: (state, payload) => {
      let indexObj = state.transanctions.findIndex(value => value.id === payload.id)
      state.transanctions[indexObj] = payload
    },
    DEL_TRANSACTION: (state, index) => {
      state.transanctions.splice(index,1)
    },
  },
  actions: {
    addNewAccountType({commit}, payload){
      commit('ADD_ACCOUNT_TYPE', payload)
    },
    addNewTransaction({commit}, payload){
      commit('INSERT_TRANSACTION', payload)
    },
    updateTransaction({commit}, payload){
      commit('UPDATE_TRANSACTION', payload)
    },
    deleteTransaction({commit}, payloadIndex){
      commit('DEL_TRANSACTION', payloadIndex)
    },
  }
}

export default data