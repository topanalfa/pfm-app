const data = {
  namespaced: true,
  state: {
    users: [
      {
        id: 1,
        name: 'Topan Alfa',
        username: 'admin',
        password: 'password',
        country: 'Indonesia',
        email: 'topan@alfa.com',
        authenticated: false
      },
      {
        id: 2,
        name: 'Deny Akbar',
        username: 'deny',
        password: 'password',
        country: 'Norwegia',
        email: 'deny@akbar.com',
        authenticated: false
      }
    ],
    loggedInUser: {}
  },
  getters: {
    currentUser: state => {
      return state.loggedInUser
    }
  },
  mutations: {
    INSERT_USER(state, payload){
      state.user.push(payload)
    },
    CHECK_USER(state, payload){
      let userExist = state.users.some(_value => _value.username == payload.username && _value.password == payload.password);
      let loginUser = state.users.find(_value => _value.username == payload.username );
      loginUser.authenticated = true
      // state.users[userIndex].authenticated = true;
      if(userExist) state.loggedInUser = loginUser
    },
    LOGOUT_USER(state){
      state.loggedInUser = {}
    }
  },
  actions: {
    setNewUser({commit}, payload){
      commit('INSERT_USER', payload)
    },
    checkExistUser({commit}, payload){
      commit('CHECK_USER', payload)
    },
    logoutUser({commit}){
      commit('LOGOUT_USER')
    },
  }
}

export default data