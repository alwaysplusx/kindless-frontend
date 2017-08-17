<template>
  <el-table
    stripe
    highlight-current-row
    :data="data"
    v-loading="loading"
    element-loading-text="数据加载中"
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column type="index" width="80"></el-table-column>
    <el-table-column prop="code" label="编码" width="200"></el-table-column>
    <el-table-column prop="name" label="名称" width="200"></el-table-column>
    <el-table-column prop="remark" label="描述"></el-table-column>
    <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
  </el-table>
</template>
<script>
import $ from '@/apis'

export default {
  data () {
    return {
      loading: false,
      data: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load (params) {
      $.permission.getList(params)
      .then(data => {
        this.data = data
      })
    },
    handleSelectionChange (val) {
      console.log('selection change ' + val)
    }
  }
}
</script>

<style>

</style>
