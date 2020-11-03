const tgl= new Date().getTime()
const data = {
  namespaced: true,
  state: {
    accountType: [
      {
        id: 1,
        name: "Bank",
      },
      {
        id: 2,
        name: "Cash",
      },
      {
        id: 3,
        name: "Credit Card",
      },
    ],
    categories: [
      'Shopping',
      'Gift',
      'Transportation',
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
        date: "2020-11-03",
        typeAccount: 'Cash',
        amount: 120000,
        description: 'Sepatu LV',
      },
      {
        id:3,
        category: 'Transportation',
        date: "2020-11-03",
        typeAccount: 'Cash',
        amount: 50000,
        description: 'Taxi',
      },
      {
        id:4,
        category: 'Traveling',
        date: "2020-10-10",
        typeAccount: 'Credit Card',
        amount: 100000,
        description: 'Tiket ke bali',
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
    UPDATE_ACCOUNT_TYPE: (state, payload) => {
      let indexObj = state.accountType.findIndex(value => value.id === payload.id)
      state.accountType[indexObj] = payload
    },
    DEL_ACCOUNT_TYPE: (state, index) => {
      state.accountType.splice(index,1)
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
    updateAccountType({commit}, payload){
      commit('UPDATE_ACCOUNT_TYPE', payload)
    },
    deleteAccountType({commit}, payload){
      commit('DEL_ACCOUNT_TYPE', payload)
    },
  }
}

export default data