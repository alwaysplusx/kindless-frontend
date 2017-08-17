<template>
  <div class="main-content">
    <el-row class="toolbar">
      <el-col :span="24">
        <el-button-group>
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
      </el-col>
    </el-row>
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
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="200"></el-table-column>
      <el-table-column prop="password" label="密码" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
       <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination 
        layout="prev, pager, next, jumper, ->, total" 
        :page-size="query.size"
        :total="query.total"
        @current-change="loadData">
      </el-pagination>
    </div>
    <el-dialog title="新增用户" :visible.sync="formVisible" size="tiny">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" auto-complete="off"></el-input>
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
        <el-button @click="stage = 'none'">取 消</el-button>
        <el-button type="primary" @click="submit(stage)">确 定</el-button>
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
        stage: 'none', // none, list, add, edit, view
        selection: [],
        form: {},
        formVisible: false,
        data: [],
        query: {
          desc: '',
          asc: 'createdTime',
          page: 1,
          size: 15,
          total: null,
          bundle: {}
        }
      }
    },
    created () {
      this.loadData()
    },
    computed: {
      /**
       * 列表中选中的用户名
       */
      usernames () {
        var names = []
        var selection = this.selection || []
        for (var i = 0, max = selection.length; i < max; i++) {
          names.push(selection[i].username)
        }
        return names
      }
    },
    watch: {
      stage (newStage) {
        if (newStage === 'list') {
          this.loadData()
        }
        if (newStage === 'none') {
          this.formVisible = false
        }
      }
    },
    methods: {
      prepareFor (stage) {
        if (stage === 'add') {
          // for add
          this.form = {}
          this.formVisible = true
        } else if (stage === 'edit') {
          // for edit
          if (!this.selection[0]) {
            this.$message('请选择需要编辑的数据')
            return
          }
          this.form = this.selection[0]
          this.formVisible = true
        } else if (stage === 'remove') {
          // for remove
          if (this.selection.length === 0) {
            this.$message('请选择需要删除的数据')
            return
          }
          this.remove()
        }
        this.stage = stage
      },
      handleSelectionChange (val) {
        this.selection = val
      },
      /**
       * 加载列表数据
       * @param page: Number 加载的页码
       */
      loadData (page) {
        if (page !== undefined) {
          this.query.page = page
        }
        this.loading = true
        $.user.getPage(this.query)
        .then(data => {
          this.data = data.content
          // TODO find beat way to apply query params
          this.query.page = data.page
          this.query.size = data.size
          this.query.total = data.total
          this.loading = false
          this.stage = 'none'
        })
        .catch(error => {
          this.loading = false
          console.error(error)
        })
      },
      /**
       * 提交数据
       */
      submit (stage = 'add') {
        const creating = stage === 'add'
        $.user[creating ? 'create' : 'update'](this.form)
        .then(response => {
          this.$message(creating ? '新增成功' : '修改成功')
          this.formVisible = false
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
        this.$confirm('将删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // delete user by usernames
          this.loading = true
          $.user.remove(this.usernames)
          .then(response => {
            this.$message('删除成功')
            this.loading = false
            this.stage = 'list'
          })
          .catch(error => {
            console.log(error)
            this.loading = false
            this.$message({
              message: '删除失败',
              type: 'error'
            })
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
