<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">PFM App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <template v-if="loggedInUser">
      <b-navbar-nav>
        <b-nav-item to="/account-types">Account Types</b-nav-item>
        <b-nav-item to="/transactions">Transactions</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{currentUser.name}}</em>
              </template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
      </b-navbar-nav>
      </template>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return {
      nama: ''
    }
  },
  computed: {
    ...mapGetters('User',['loggedInUser','currentUser']),
    loggedInUser(){
      if (Object.keys(this.currentUser).length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('User',['logoutUser']),
    logout(){
      this.logoutUser()
    }
  }
}
</script>

<style>

</style>