<template>
  <b-container if="userAuthenticate">
    <b-row align-h="center">
      <b-col lg="6" class="mt-4">
        <div class="d-block mb-4">
          <h3>Transactions from {{accountName}} Account</h3>
        </div>
        <div class="d-block">
          <b-list-group-item v-for="(item, index) in filterTransanctions" :key="index" class="flex-column align-items-start mb-1">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{item.category}}</h5>
              <small>{{item.date | moment("DD MMM YYYY")}}</small>
              <!-- <span>{{ new Date() | moment("ddd, Do MMM YYYY") }}</span> -->
            </div>
            <div class="d-flex justify-content-between">
              <p>
                {{item.description}}
              </p>
              <h4 class="float-right" style="color:salmon;">{{item.amount}}</h4>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <h5><b-badge variant="success">{{item.typeAccount}}</b-badge></h5>
              </div>
              <div class="d-flex">
                <b-button size="sm" @click="edit(item)" variant="outline-secondary" class="mr-1"><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>
                <b-button size="sm" @click="deleteItem(index)" variant="outline-danger"><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
              </div>
            </div>
          </b-list-group-item>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import AddAccountType from '@/components/AddAccountType.vue'
import ListAccountType from '@/components/ListAccountType.vue'
import ModalAccountType from '@/components/modals/AccountType.vue'
export default {
  components: {
    AddAccountType, ListAccountType, ModalAccountType
  },
  data(){
    return {
      title: 'Transactions by Account',
      filterTransanctions: [],
      accountName: ''
    }
  },
  computed: {
    ...mapState('User', ['loggedInUser']),
    ...mapState('Account',['transanctions','accountType']),
    userAuthenticate(){
      if (Object.keys(this.loggedInUser).length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  created(){
    this.initData()
  },
  methods: {
    initData(){
      this.accountName = this.$route.query.name
      this.filterTransanctions = this.transanctions.filter(val => {
        return val.typeAccount == this.accountName
      })
    },
    showModalType(data){
      this.modalType = !this.modalType
      this.dataType = data
    },
    closeModalType(){
      this.modalType = false
    },
  }
}
</script>

<style>

</style>