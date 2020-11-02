<template>
  <b-modal title="Record Your Transaction" v-model="propsModalType" centered hide-footer>
    <b-form>
      <b-form-group label="Account Name:" 
        label-for="input-3"
        label-cols-sm="4"
        label-cols-lg="3">
        <b-form-input
          id="input-3"
          v-model="form.name"
          required
          @keyup.enter="updateType"
        ></b-form-input>
      </b-form-group>

      <b-button @click="updateType" class="ml-2 float-right" type="submit" variant="primary">Update</b-button>
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
        name: ''
      },
    }
  },
  computed: {
    ...mapState('Account', ['transactions']),
    ...mapGetters('Account', ['listAccounts']),
  },
  props: {
    propsModalType: {
      type: Boolean,
    },
    dataEditType: {
      type: Object
    }
  },
  watch: {
    propsModalType: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = this.dataEditType
        }
      }
    }
  },
  methods: {
    updateType(evt){
      evt.preventDefault()
      let data = this.form
      this.$emit('handleEditType', data, false)
      this.resetForm()
    },
    resetForm(){
      this.name = ''
    },
    cancel(evt){
      evt.preventDefault()
      this.resetForm()
      this.$emit('cancelType')
    }
  }
}
</script>

<style>

</style>