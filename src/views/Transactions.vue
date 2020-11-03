<template>
  <b-container v-if="userAuthenticate">
    <ModalTransaction 
      :propsModal="modalTrans" 
      :state="stateTransaction" 
      :dataUpdate="dataTransaction"
      @handleSubmit="addNewTrans" 
      @handleEdit="editTrans" 
      @cancel="closeModalTrans">
    </ModalTransaction>
    <b-row class="pt-4">
      <b-col lg="5" >
        <b-row>
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-1">Add New Transactions</h3>
            <b-button @click="addModalTrans()" variant="outline-primary">Add&nbsp;<b-icon icon="plus" aria-hidden="true"></b-icon></b-button>
          </div>
        </b-row>
        <b-row>
          <b-card class="w-100 mt-3" header="Last Transactions">
            <div class="d-flex w-100 justify-content-between mb-2">
              <b-form-select v-model="selectedCategory" @change="filterTransaction" :options="categories"></b-form-select>
              <b-form-input v-model="searchValue" class="ml-2" placeholder="Search your transaction"></b-form-input>
            </div>
            <template v-if="dataTransaksi.length >= 1">
              <ListTransaction :propsTransanctions="dataTransaksi" @handleEdit="editModalTrans" @handleDelete="delTransaction"></ListTransaction>
            </template>
            <template v-else><h4>You have no Transactions</h4></template>
          </b-card>
        </b-row>
      </b-col>
      <b-col lg="5" class="ml-2">
        <b-row class="d-block">
          <h3 class="mb-2 ml-3">All Transaction Records</h3>
          <b-col class="pt-3 mb-2">
            <b-card title="Transaction Today" >
              <b-card-text>Total spent Today {{today}} = <span class="total">Rp {{totalToday}}</span></b-card-text>
            </b-card>
          </b-col>
          <b-col>
            <b-card title="Transaction this Month">
              <b-card-text>Total spent in {{month}} = <span class="total">Rp {{totalInMonth}}</span></b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import moment from 'moment'

import ListTransaction from '@/components/ListTransaction.vue'
import ModalTransaction from '@/components/modals/Transaction.vue'
export default {
  components: {
    ListTransaction, ModalTransaction
  },
  data(){
    return {
      title: 'Transactions',
      moment: null,
      today: null,
      month: '',
      totalToday: 0,
      totalInMonth: 0,
      numbMonth: null,
      searchValue: '',
      dataTransaksi: [],
      dataCategories: [],
      selectedCategory: 'All',
      modalTrans: false,
      stateTransaction: false,
      dataTransaction: null,
      fields: [
          {
            key: 'account_type',
            sortable: true
          },
          {
            key: 'category',
            sortable: false
          },
          {
            key: 'amount',
            label: 'Amount',
            sortable: true,
          }
        ],
        dataTable: [
          { amount: 40000, account_type: 'Dickerson', category: 'Macdonald' },
          { amount: 210000, account_type: 'Larsen', category: 'Shaw' },
          { amount: 89000, account_type: 'Geneva', category: 'Wilson' },
          { amount: 380000, account_type: 'Jami', category: 'Carney' }
        ]
    }
  },
  computed: {
    ...mapState('User', ['loggedInUser']),
    ...mapState('Account',['transanctions','categories']),
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
          this.dataTransaksi = this.dataTransaksi.filter(value => value.description.toLowerCase().indexOf(val.toLowerCase()) > -1);
        } else {
          this.dataTransaksi = this.transanctions
        }
      }
    }
  },
  created(){
    this.dataCategories = this.categories
    this.initDate()
    this.moment = new moment()
  },
  mounted(){
    this.dataTransaksi = this.transanctions
  },
  methods: {
    ...mapActions('Account',[
      'addNewTransaction',
      'updateTransaction',
      'deleteTransaction']),
    addNewTrans(data, bool){
      this.modalTrans = bool
      this.addNewTransaction(data)
      this.initDataReport()
    },
    editTrans(data, id, bool){
      this.stateTransaction= false
      this.modalTrans = bool
      this.updateTransaction(data)
    },
    delTransaction(index){
      this.deleteTransaction(index)
    },
    addModalTrans(){
      this.modalTrans = !this.modalTrans
    },
    editModalTrans(stateModal, data){
      this.modalTrans = !this.modalTrans
      this.stateTransaction= stateModal
      this.dataTransaction = data
    },
    closeModalTrans(){
      this.stateTransaction= false
      this.modalTrans = false
    },
    filterTransaction(){
      let copyData = this.transanctions
      if (this.selectedCategory !== 'All') {
        this.dataTransaksi = copyData.filter(value => value.category == this.selectedCategory)
      } else {
        this.dataTransaksi = copyData
      }
    },
    initDataReport(){
      let filterTodayData = this.transanctions.filter(value => {
        return value.date == this.today
      })
      let filterMonthData = this.transanctions.filter(value => {
        let getNumbMonth = value.date.split('-')
        if (getNumbMonth[1] == this.numbMonth ) {
          return value
        }
      })
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.totalToday = filterTodayData.reduce((acc,curr) => { return acc + Number(curr.amount) }, 0)
      this.totalInMonth = filterMonthData.reduce((acc,curr) => { return acc + Number(curr.amount) }, 0)
    },
    async initDate(){
      var months = [ "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December" ];
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      this.today = await yyyy + '-' + mm + '-' + dd;
      this.numbMonth = await this.moment.month()+1
      this.month = months[this.moment.month()]
      await this.initDataReport()
    }
  }
}
</script>

<style>
.total {
  color: blue;
}
</style>