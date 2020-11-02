<template>
  <b-modal title="Record Your Transaction" v-model="propsModal" centered hide-footer>
    <b-form @submit="addNewTrans" @reset="resetForm">
      <b-form-group label="Account Type" 
        label-for="radio-group-type"
        label-cols-sm="4"
        label-cols-lg="3">
        <b-form-radio-group
          id="radio-group-type"
          v-model="form.typeAccount"
          :options="listAccounts"
          value-field="name"
          text-field="name"
        ></b-form-radio-group>
      </b-form-group>


      <b-form-group
        id="input-group-1"
        label="Amount:"
        label-for="input-1"
        label-cols-sm="4"
        label-cols-lg="3"
        description="How much money you spent."
      >
        <b-form-input
          id="input-1"
          v-model="form.amount"
          type="number"
          required
          placeholder="Enter Amount"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Category:" 
        label-for="input-2"
        label-cols-sm="4"
        label-cols-lg="3">
        <b-form-select
          id="input-2"
          v-model="form.category"
          :options="listCategories"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Description:" 
        label-for="input-3"
        label-cols-sm="4"
        label-cols-lg="3">
        <b-form-input
          id="input-3"
          v-model="form.description"
          required
          placeholder="Put your description "
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Date:" 
        label-for="input-4"
        label-cols-sm="4"
        label-cols-lg="3">
        <b-form-datepicker id="input-4" v-model="form.date" class="mb-2"></b-form-datepicker>
      </b-form-group>

      <b-button v-if="!state" @click="addNewTrans" class="ml-2 float-right" type="submit" variant="primary">Create</b-button>
      <b-button v-else @click="updateTrans" class="ml-2 float-right" type="submit" variant="primary">Update</b-button>
      <b-button @click="cancel" type="reset" variant="danger" class="float-right">Cancel</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  data() {
    return {
      form: {
        id: null,
        amount: 0,
        category: '',
        date: null,
        description: '',
        typeAccount: null
      },
    }
  },
  computed: {
    ...mapState('Account', ['transactions']),
    ...mapGetters('Account', ['listTransactions','listCategories','listAccounts']),
  },
  watch: {
    state: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = this.dataUpdate
        }
      }
    }
  },
  props: {
    propsModal: {
      type: Boolean,
    },
    state: {
      type: Boolean,
    },
    dataUpdate: {
      type: Object,
    },
  },
  methods: {
    addNewTrans(evt){
      evt.preventDefault()
      let data = this.form
      data.id = Math.floor((Math.random() * 1000) + 1);
      this.$emit('handleSubmit', data, false)
      this.resetForm()
    },
    updateTrans(evt){
      evt.preventDefault()
      let data = this.form
      this.$emit('handleEdit', data, data.id, false)
      this.resetForm()
    },
    resetForm(){
      this.form = {
        amount: 0,
        category: '',
        date: null,
        description: '',
        typeAccount: null
      }
    },
    cancel(evt){
      evt.preventDefault()
      this.resetForm()
      this.$emit('cancel')
    }
  }
}
</script>

<style>

</style>