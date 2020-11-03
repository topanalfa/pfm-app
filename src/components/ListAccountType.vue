<template>
  <div>
    <h5 class="mt-2">List Account Type</h5>
    <template v-if="accountType.length > 0">
      <b-list-group v-for="(item, index) in accountType" :key="index">
        <b-list-group-item class="mb-1 d-flex w-100 justify-content-between">
          <strong><span class="clickable" @click="gotoTransaction(item)">{{item.name}}</span></strong>
          <div class="d-flex">
            <b-button size="sm" @click="updateType(item)" variant="outline-secondary" class="mr-1"><b-icon icon="pencil" aria-hidden="true"></b-icon></b-button>
            <b-button size="sm" @click="deleteType(index)" variant="outline-danger"><b-icon icon="trash" aria-hidden="true"></b-icon></b-button>
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
    updateType(item){
      console.log(item);
      this.$emit('handleEditType', item)
    },
    deleteType(index){
      console.log(index);
      this.$emit('handleDeleteType',index)
    },
    gotoTransaction(value) {
      console.log(value);
      this.$router.push({path: '/transaction-by-account', query: value})
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
.clickable:hover {
  color: salmon;
}
</style>