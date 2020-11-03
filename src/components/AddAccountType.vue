<template>
  <div class="d-flex">
    <b-form-input v-model="typeName" @keyup.enter="submitData" placeholder="New account name"></b-form-input>
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
      let data = {
        id: Math.floor((Math.random() * 1000) + 1),
        name: this.typeName
      }
      this.$emit('insertAccount', data)
      this.typeName= ''
    }
  }
}
</script>

<style>

</style>