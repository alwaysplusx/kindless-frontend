<template>
  <el-button-group>
    <el-button v-for="item in items" 
      :key="item.key" 
      :type="item.type || 'success'"
      @click="handleItemClick(item.action)">
      <i :class="item.icon" aria-hidden="true"></i> {{item.name}}
    </el-button>
  </el-button-group>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  methods: {
    handleItemClick (action) {
      console.log('handle action ' + action)
      // this.$emit('handle')
    }
  }
}
</script>
