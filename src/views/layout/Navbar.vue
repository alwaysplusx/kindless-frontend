<template>
  <section class="breadcrumb-bar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
  </section>
</template>

<script>

  export default {
    data () {
      return {}
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .breadcrumb-bar {
    height: 30px;
    line-height: 30px;
    .el-breadcrumb {
      line-height: 30px;
    }
  }
</style>
