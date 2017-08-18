<template>
  <el-row class="headbar-container">
    <el-col :span="10">
      <span class="toggle" @click.prevent="toggle">
        <i class="fa fa-align-justify"></i>
      </span>
      <span class="logo">Kindless</span>
    </el-col>
    <el-col :span="10">&nbsp;</el-col>
    <el-col :span="4" class="user-links">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo">
          <img :src="avatar" /> {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import $ from '@/apis'

export default {
  data () {
    return {
      username: 'wuxii',
      avatar: 'https://avatars0.githubusercontent.com/u/3983321'
    }
  },
  methods: {
    logout () {
      $.logout()
      .then(resp => {
        this.$router.push({ path: '/login' })
      })
    },
    toggle () {
      console.log('>>>> toggle')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.headbar-container {
  position: fixed;
  top: 0px;
  width: 100%;
  line-height: 50px;
  color: #fff;
  z-index: 1000;
  background-color: #24292e;
  .logo {
    margin-left: 10px;
  }
  .toggle {
    cursor: pointer;
    margin-left: 10px;
  }
  .user-links {
    height: 50px;
    text-align: right;
    padding-right: 20px;
    float: right;
    .userinfo {
      cursor: pointer;
      color: #fff;
      img {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        margin: 10px 0px 0px 10px;
        float: right;
      }
    }
  }
}
</style>
