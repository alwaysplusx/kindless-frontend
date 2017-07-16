<template>
  <div class="headbar-container">

    <el-dropdown trigger="click" class="dropdown-menu">
      <el-button> 
        Settings <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>我的资料</el-dropdown-item>
        <el-dropdown-item>系统设置</el-dropdown-item>        
        <el-dropdown-item divided>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<style rel="stylesheet/scss" lang="scss" scoped>
  .headbar-container {
    line-height: 60px;
    background-color: red;
    .dropdown-menu {
      height: 60px;
      position: absolute;
      right: 20px;
      .dropdown-button {
        height: 60px;
      }
    }
  }
</style>
