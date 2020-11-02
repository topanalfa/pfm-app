<template>
  <b-containerv if="userAuthenticate">
    <ModalAccountType 
      :propsModalType="modalType" 
      :dataEditType="dataType"
      @handleEditType="editType" 
      @cancelType="closeModalType">
    </ModalAccountType>
    <b-row align-h="center">
      <b-col lg="6" class="mt-4">
        <div class="d-block mb-4">
          <h3>Add Account Type</h3>
        </div>
          <AddAccountType @insertAccount="insertNewAccount"></AddAccountType>
        <div class="d-block">
          <div class="d-flex w-100 justify-content-between mb-2">
            <b-input-group class="mt-3">
              <b-form-input v-model="searchValue" placeholder="Search account name"></b-form-input>
              <b-input-group-append>
                <b-input-group-text><b-icon icon="search" /></b-input-group-text>
              </b-input-group-append>
            </b-input-group>
          </div>
          <ListAccountType @handleEditType="showModalType" @handleDeleteType="deleteType" :accountType="dataAccount"></ListAccountType>
        </div>
      </b-col>
    </b-row>
  </b-containerv>
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
      title: 'Transactions',
      modalType: false,
      dataType: null,
      dataAccount: [],
      searchValue: ''
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
  watch: {
    searchValue: {
      immediate: true,
      handler(val){
        if (val !== '' && val.length >= 3) {
          this.dataAccount = this.dataAccount.filter(value => value.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        } else {
          this.dataAccount = this.accountType
        }
      }
    }
  },
  created(){
  },
  mounted(){
    if (!this.userAuthenticate) {
      this.$router.push({path:'/'})
    }
    this.dataAccount = this.accountType
  },
  methods: {
    ...mapActions('Account',[
      'addNewAccountType',
      'updateAccountType',
      'deleteAccountType']),
    insertNewAccount(data){
      this.addNewAccountType(data)
    },
    editType(data, bool){
      this.modalType = bool
      this.updateAccountType(data)
    },
    deleteType(index){
      this.deleteAccountType(index)
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