<template>
  <b-container>
    <template v-if="userAuthenticate">
      <ModalTransaction 
        :propsModal="modalTrans" 
        :state="stateTransaction" 
        :dataUpdate="dataTransaction"
        @handleSubmit="addNewTrans" 
        @handleEdit="editTrans" 
        @cancel="closeModalTrans">
      </ModalTransaction>
      <b-row align-h="center" class="mt-4">
        <b-col >
          <b-row>
            <div class="d-flex w-100 justify-content-between">
              <h3 class="mb-1">Add New Transactions</h3>
              <b-button @click="addModalTrans()" variant="outline-primary">Add&nbsp;<b-icon icon="plus" aria-hidden="true"></b-icon></b-button>
            </div>
          </b-row>
          <b-row>
            <b-card class="w-100 mt-3" header="Last Transactions">
              <template v-if="transanctions.length >= 1">
                <ListTransaction :propsTransanctions="transanctions" @handleEdit="editModalTrans" @handleDelete="delTransaction"></ListTransaction>
              </template>
              <template v-else><h4>You have no Transactions</h4></template>
            </b-card>
          </b-row>
        </b-col>
        <b-col>
          <div class="d-block mb-4">
            <h3>Add Account Type</h3>
          </div>
          <AddAccountType @insertAccount="insertNewAccount"></AddAccountType>
          <div class="d-block">
            <ListAccountType :accountType="accountType"></ListAccountType>
          </div>
        </b-col>
      </b-row>
    </template>
    <template v-else>
      <b-row align-h="center" class="mt-4">
        <b-col sm="12" lg="4">
          <Authenticate @emitLogin="authenticateUser"/>
        </b-col>
      </b-row>
    </template>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Authenticate from '@/components/Authenticate.vue'
import AddAccountType from '@/components/AddAccountType.vue'
import ListAccountType from '@/components/ListAccountType.vue'
import ListTransaction from '@/components/ListTransaction.vue'
import ModalTransaction from '@/components/modals/Transaction.vue'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Authenticate, AddAccountType, ListAccountType, ModalTransaction, ListTransaction
  },
  data() {
    return {
      modalTrans: false,
      form: {
        amount: '',
        category: '',
        date: null,
        description: '',
        typeAccount: null
      },
      stateTransaction: false,
      dataTransaction: null
    }
  },
  computed: {
    ...mapState('User', ['users','loggedInUser']),
    ...mapState('Account', ['accountType','transanctions']),
    ...mapGetters('Account', ['listTransactions','listCategories','listAccounts']),
    userAuthenticate(){
      if (Object.keys(this.loggedInUser).length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions('User',['setNewUser', 'checkExistUser', 'logoutUser']),
    ...mapActions('Account',['addNewAccountType', 'addNewTransaction','updateTransaction','deleteTransaction']),
    // newUser(){
    //   this.setNewUser(user)
    // },
    authenticateUser(dataUser){
      this.checkExistUser(dataUser)
    },
    loadUsers(){
      this.users.map(val => {
        console.log(val);
      })
    },
    insertNewAccount(data){
      this.addNewAccountType(data)
    },
    logout(){
      this.logoutUser()
    },
    addModalTrans(){
      this.modalTrans = !this.modalTrans
    },
    editModalTrans(stateModal, data){
      console.log(stateModal, data)
      this.modalTrans = !this.modalTrans
      this.stateTransaction= stateModal
      this.dataTransaction = data
    },
    closeModalTrans(){
      this.stateTransaction= false
      this.modalTrans = false
    },
    addNewTrans(data, bool){
      this.modalTrans = bool
      this.addNewTransaction(data)
    },
    editTrans(data, id, bool){
    console.log('editTrans: ',data, id, bool)
      this.modalTrans = bool
      this.updateTransaction(data)
    },
    delTransaction(index){
      this.deleteTransaction(index)
    },
    resetForm(evt){
      evt.preventDefault()
      this.form = {
        amount: 0,
        category: '',
        date: null,
        description: '',
        typeAccount: null
      }
    }
  }
}
</script>
