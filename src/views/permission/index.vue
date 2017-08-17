<template>
  <el-row>
    <el-col :span="4">
      <Menu-tree @current-node-change="currentNodeChange"></Menu-tree>
    </el-col>
    <el-col :span="20" class="permisson-content-table">
      <el-button-group class="button-toolbar">
        <el-button :plain="true" type="success" @click="prepareFor('add')">
          <i class="fa fa-plus" aria-hidden="true"></i> 新增
        </el-button>
        <el-button :plain="true" type="primary" @click="prepareFor('edit')">
          <i class="fa fa-pencil" aria-hidden="true"></i> 编辑
        </el-button>
        <el-button :plain="true" type="danger" @click="prepareFor('remove')">
          <i class="fa fa-times" aria-hidden="true"></i> 删除
        </el-button>
      </el-button-group>      
      <Permission-table ref="permissionTable" class="content-table"></Permission-table>
      <Permission-form ref="permissionForm"></Permission-form>
    </el-col>
  </el-row>
</template>

<script>

import MenuTree from '@/views/menu/MenuTree'
import PermissionTable from '@/views/permission/PermissionTable'
import PermissionForm from '@/views/permission/PermissionForm'

export default {
  components: {
    MenuTree,
    PermissionTable,
    PermissionForm
  },
  data () {
    return {}
  },
  methods: {
    prepareFor (stage = 'add') {
      if (stage === 'add') {
        this.$refs.permissionForm.setVisible(true)
      }
    },
    loadTableData (code) {
      this.$refs.permissionTable.load({
        'filter_EQ_code': code
      })
    },
    currentNodeChange (newNode, oldNode) {
      this.loadTableData(newNode.data.code)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.permisson-content-table {
  padding-left: 10px;
  .content-table {
    margin-top: 10px; 
  }
}
</style>
