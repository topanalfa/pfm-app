<template>
  <div class="d-flex">
    <b-form-input v-model="typeName" placeholder="Type of account"></b-form-input>
    <b-button @click="submitData" class="ml-3" size="sm" variant="outline-primary">Create</b-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      typeName: '',
    }
  },
  methods: {
    submitData(){
      this.$emit('insertAccount', this.typeName)
      this.typeName= ''
    }
  }
}
</script>

<style>

</style>