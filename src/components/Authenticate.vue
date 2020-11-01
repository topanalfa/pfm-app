<template>
  <b-card bg-variant="light">
    <b-form @submit="submitLogin" @reset="onReset">
    <b-form-group
      id="fieldset-1"
      label="Username"
      placeholder="Enter Username"
      label-for="input-1"
      valid-feedback="Thank you!"
    >
      <b-form-input :state="usernameState" required id="input-1" aria-describedby="input-username-feedback" v-model="name" trim></b-form-input>
      <b-form-invalid-feedback id="input-username-feedback">
        Username length at least 3 letters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      id="fieldset-2"
      label="Password"
      placeholder="Enter Password"
      label-for="input-2"
      valid-feedback="Password Valid"
    >
      <b-form-input :state="passwordState" required id="input-2" type="password" aria-describedby="input-password-feedback" v-model="password" 
        @keyup.enter="submitLogin"
      trim></b-form-input>
      <b-form-invalid-feedback id="input-password-feedback">
        Password length at least 8 characters
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button block :disabled="!formValid" @click="submitLogin" variant="outline-primary">Login</b-button>
    </b-form>
  </b-card>
</template>

<script>
export default {
  computed: {
    formValid(){
      if (this.name.length >= 4 && this.password.length >= 8) {
        return true
      } else {
        return false
      }
    },
    formRegisterValid(){
      if (this.firstName.length >= 4 && this.lastName.length > 1 && this.password.length >= 8 && this.password.length >= 8) {
        return true
      } else {
        return false
      }
    },
    usernameState(){
      return this.name.length > 1 && this.name.length < 4 ? false : null
    },
    passwordState(){
      return this.password.length > 1 && this.password.length < 8 ? false : null
    },
    fNameState(){
      this.name.length < 4 ? false : true
    },
    lNameState(){
      this.name.length < 4 ? false : true
    }
  },
  // props: {
  //   formRegister: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      name: '',
      password: '',
      firstName: '',
      lastName: '',
    }
  },
  methods: {
    submitLogin(){
      let data = {username: this.name, password: this.password}
      if (this.formValid) {
        this.$emit('emitLogin', data)
      }
    },
    onReset(){
      this.name= '',
      this.password= '',
      this.firstName= '',
      this.lastName= ''
    },
  }
}
</script>

<style>

</style>