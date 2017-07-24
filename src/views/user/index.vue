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
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="password" label="密码" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
       <el-table-column prop="address" label="地址"></el-table-column>
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
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="stage = 'list'">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import $ from '@/apis'

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
        data: {
          page: 1,
          size: 15,
          total: null,
          content: []
        }
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      dialogFormVisible: {
        get () {
          return this.stage !== 'list'
        }
      }
    },
    watch: {
      stage (newStage) {
        if (newStage === 'edit') {
          this.form = this.selection[0]
        } else {
          this.form = {}
        }
        if (newStage === 'list') {
          this.fetchData()
        }
      }
    },
    methods: {
      fetchData (page) {
        page = page || this.data.page
        this.loading = true
        $.user.page({
          page: page,
          size: this.data.size,
          asc: this.asc,
          desc: this.desc
        })
        .then(response => {
          this.data = response
          this.loading = false
        })
        .catch(error => {
          this.loading = false
          console.error(error)
        })
      },
      handleSelectionChange (val) {
        this.selection = val
      },
      submit () {
        const creating = this.stage === 'add'
        $.user[creating ? 'create' : 'update'](this.form)
        .then(response => {
          this.$message(creating ? '新增成功' : '修改成功')
          this.stage = 'list'
        })
        .catch(error => {
          console.log(error)
          this.$message({
            message: creating ? '新建失败' : '修改失败',
            type: 'error'
          })
        })
      },
      remove () {
        var names = []
        var selection = this.selection
        for (var i = 0, max = selection.length; i < max; i++) {
          names.push(selection[i].username)
        }
        $.user.remove(names)
        .then(response => {
          this.$message('删除成功')
          this.fetchData()
        })
        .catch(error => {
          console.log(error)
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style>
  .toolbar {
    margin: 0px 0px 5px 0px;
  }
</style>
