<template>
  <div>
    <h5 class="mt-2">List Account Type</h5>
    <template v-if="accountType.length > 0">
      <b-list-group v-for="(item, index) in accountType" :key="index">
        <b-list-group-item class="mb-1 d-flex w-100 justify-content-between">
          <strong>{{item}}</strong>
          <div class="d-flex">
            <b-button size="sm" variant="outline-secondary" class="mr-1"><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>
            <b-button size="sm" variant="outline-danger"><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
          </div>
        </b-list-group-item>
      </b-list-group>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    accountType: {
      type: Array
    }
  },
  methods: {
    edit(item){
      console.log(item);
    },
    delete(id){
      console.log(id);
    },
  }
}
</script>

<style>

</style>