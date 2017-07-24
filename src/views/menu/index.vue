<template>
  <div class="main-content">
    <el-row class="toolbar">
      <el-col :span="24">
        <el-button type="success" size="small" @click="stage = 'add'">
          <i class="fa fa-plus" aria-hidden="true"></i> 新增
        </el-button>
        <el-button type="primary" size="small" @click="stage = 'edit'">
          <i class="fa fa-pencil" aria-hidden="true"></i> 编辑
        </el-button>
        <el-button type="danger" size="small" @click="remove">
          <i class="fa fa-times" aria-hidden="true"></i> 删除
        </el-button>
      </el-col>
    </el-row>
    <el-row class="menu-row">
      <el-col :span="4" class="menu-tree">
        <el-tree :data="tree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col :span="20" class="menu-content">
        <el-table
          stripe
          highlight-current-row
          :data="data.content"
          v-loading="loading"
          element-loading-text="数据加载中"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="code" label="编码" width="100"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="link" label="链接"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
        </el-table>
        <div class="block">
          <el-pagination 
            layout="prev, pager, next, jumper, ->, total" 
            :page-size="data.size"
            :total="data.total"
            @current-change="fetchData">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import $ from '@/apis'

export default {
  data () {
    return {
      loading: false,
      submitting: false,
      stage: 'list', // list, add, edit, view
      selection: [],
      form: {},
      asc: 'createdTime',
      desc: '',
      tree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      data: {
        page: 1,
        size: 15,
        total: null,
        content: []
      }
    }
  },
  created () {
    // this.fetchData()
  },
  methods: {
    fetchTree () {

    },
    fetchData () {

    },
    handleNodeClick (data) {
      console.log(data)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar {
  margin: 0px 0px 5px 0px;
}
.menu-row {
  min-height: 100%;
  min-width: 100%;
  .menu-tree {
    min-width: 150px;
    padding-right: 5px;
  }
  .menu-content {
    padding-left: 5px;
  }
}
</style>
