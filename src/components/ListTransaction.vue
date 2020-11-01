<template>
  <div>
    <b-list-group-item v-for="(item, index) in propsTransanctions" :key="index" class="flex-column align-items-start">
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
</template>

<script>
export default {
  props: {
    propsTransanctions: {
      type: Array,
      required: true
    }
  },
  methods: {
    edit(data){
      this.$emit('handleEdit', true, data)
    },
    deleteItem(index){
      this.$emit('handleDelete', index)
    }
  }
}
</script>

<style>

</style>