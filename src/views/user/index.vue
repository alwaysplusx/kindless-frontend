<template>
  <div class="main-content">
    <el-table
      :data="data.content"
      v-loading="loading"
      element-loading-text="数据加载中"
      style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination 
        layout="prev, pager, next, jumper, ->, total" 
        :page-size="data.size"
        :total="data.total"
        @current-change="fetchData">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import $ from '@/apis'

  export default {
    data () {
      return {
        loading: false,
        data: {
          page: 1,
          size: 20,
          total: null,
          content: []
        }
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData (page) {
        console.log('fetch page ' + page + ' datas')
        this.loading = true
        $.user.page({
          page: page
        })
        .then((response) => {
          this.data = response
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.error(error)
        })
      }
    }
  }
</script>

<style>
  .block {
    right: 20px;
  }
</style>
