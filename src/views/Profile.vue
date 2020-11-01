<template>
  <b-container>
    <b-row align-h="left">
      <b-card :title="loggedInUser.name" class="my-4">
        <b-card-text >
          <span class="d-block">Country: {{loggedInUser.country}}</span>
        </b-card-text>
        <b-link href="#" class="card-link">{{loggedInUser.email}}</b-link>
      </b-card>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  computed:{
    ...mapState('User', ['loggedInUser']),
  }

}
</script>

<style>

</style>