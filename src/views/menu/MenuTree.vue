<template>
  <div class="menu-tree-container">        
    <el-input
      class="menu-tree-filter"
      placeholder="菜单名称"
      v-model="filterText">
    </el-input>
    <el-tree
      class="menu-tree-content"
      ref="menuTree"
      highlight-current
      node-key="code"
      :data="data"
      :props="props"
      :default-expanded-keys="['000000']"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
import $ from '@/apis'

export default {
  props: {
    rootVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      data: [],
      currentNode: null,
      filterText: '',
      query: {
        asc: 'code'
      },
      props: {
        label: 'name',
        children: 'children'
      }
    }
  },
  created () {
    this.loadData()
  },
  watch: {
    filterText (val) {
      return this.$refs.menuTree.filter(val)
    }
  },
  methods: {
    loadData () {
      $.menu.getTree(this.query)
      .then(data => {
        this.data = data
      })
    },
    handleNodeClick (data, node) {
      if (this.currentNode !== node) {
        this.$emit('current-node-change', node, this.currentNode)
        this.currentNode = node
      }
    },
    filterNode (value, data) {
      return !value || value === '' || data.name.indexOf(value) !== -1
    },
    load (node) {
      // 重载对应的节点数据
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu-tree-container {
    .menu-tree-content {
      margin-top: 10px;
    }
  }
</style>
