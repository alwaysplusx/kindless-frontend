<template>
  <div class="main-content">
    <el-row class="toolbar">
      <el-col :span="4" class="menu-filter">
        <el-input
          placeholder="菜单名称"
          v-model="filterText">
        </el-input>
      </el-col>
      <el-col :span="20" class="button-toolbar">
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
    <el-row class="menu-row">
      <el-col :span="4" class="menu-tree">
        <!-- 左侧树 -->
        <el-tree
          ref="menuTree"
          highlight-current
          node-key="code"
          :data="treeData"
          :props="treeProps"
          :default-expanded-keys="['000000']"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <el-col :span="20" class="menu-content">
        <!-- 子菜单明细表 -->
        <el-table
          stripe
          :data="gridData"
          highlight-current-row
          v-loading="grid.loading"
          element-loading-text="数据加载中"
          @selection-change="handleSelectionChange"
          style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="80"></el-table-column>
          <el-table-column prop="code" label="编码" width="150"></el-table-column>
          <el-table-column label="名称" width="200">
            <template scope="scope">
              <i :class="scope.row.icon" aria-hidden="true"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ordinal" label="排序" width="80"></el-table-column>
          <el-table-column prop="path" label="链接"></el-table-column>
          <el-table-column prop="remark" label="描述"></el-table-column>
          <el-table-column prop="createdTime" label="创建时间" width="200"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 菜单表单 -->
    <el-dialog title="新增菜单" :visible.sync="form.visible" size="tiny">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="上级菜单">
          <el-cascader v-model="parentCascade"
            clearable
            change-on-select
            :show-all-levels="false"
            :disabled="stage=='edit'"
            expand-trigger="hover"
            :options="treeData"
            :props="cascaderProps">
          </el-cascader>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="formData.code" :disabled="stage=='edit'" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formData.name" auto-complete="off">
            <template slot="prepend">
              <el-button slot="append" @click="iconDialogVisible = true"><icon :name="formData.icon"></icon></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="ordinal" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="formData.path"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="formData.remark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.visible = false">取 消</el-button>
        <el-button type="primary" @click="submit(stage)">确 定</el-button>
      </div>
    </el-dialog>
    <Icon-Dialog
      ref="iconDialog"
      @select="selectIcon"
      @close="iconDialogVisible = false">
    </Icon-Dialog>
  </div>
</template>

<script>
import $ from '@/apis'
import MenuTree from './MenuTree'
import Icon from '@/components/Icon'
import IconDialog from '@/components/IconDialog'

export default {
  components: {
    Icon,
    IconDialog,
    MenuTree
  },
  data () {
    return {
      stage: 'none', // none, list, add, edit, view
      filterText: '',
      currentNode: null,
      iconDialogVisible: false,
      cascaderProps: {
        label: 'name',
        value: 'code',
        children: 'children'
      },
      // 菜单树数据
      treeData: [],
      treeProps: {
        label: 'name',
        children: 'children'
      },
      tree: {
        loading: false,
        query: {
          asc: 'code'
        }
      },
      // 列表数据
      gridData: [],
      grid: {
        loading: false,
        selection: [],
        query: {
          asc: 'code',
          bundle: {}
        }
      },
      // 表单数据
      form: {
        visible: false,
        submitting: false,
        data: {
          name: '',
          code: '',
          path: '',
          icon: '',
          ordinal: 0,
          parent: {
            code: ''
          }
        }
      }
    }
  },
  watch: {
    stage (newStage) {
      if (newStage === 'list') {
        this.loadTreeData()
        this.gridData = []
      }
    },
    filterText (val) {
      return this.$refs.menuTree.filter(val)
    },
    iconDialogVisible (val) {
      this.$refs.iconDialog.setVisible(val)
    }
  },
  computed: {
    ordinal: {
      get () {
        return this.form.data.ordinal
      },
      set (val) {
        this.form.data.ordinal = val
      }
    },
    /**
     * 当前选择的菜单code
     */
    currentCode () {
      return this.currentNode && this.currentNode.data.code
    },
    /**
     * 编辑的表单数据
     */
    formData: {
      get () {
        return this.form.data
      },
      set (val) {
        if (!val.parent) {
          val.parent = {}
        }
        if (!val.ordinal) {
          val.ordinal = 0
        }
        this.form.data = val
      }
    },
    parentCascade () {
      var result = []
      var node = this.currentNode
      while (node) {
        if (node.data.code) {
          result.push(node.data.code)
        }
        node = node.parent
      }
      return result.reverse()
    },
    parentCode: {
      get () {
        return this.formData.parent && this.formData.parent.code
      },
      set (val) {
        this.formData.parent.code = val
      }
    }
  },
  created () {
    this.loadTreeData()
  },
  methods: {
    prepareFor (stage = 'add') {
      if (stage === 'add') {
        // for add
        this.formData = {
          icon: 'fa fa-info-circle'
        }
        this.parentCode = this.currentCode
        this.form.visible = true
      } else if (stage === 'edit') {
        // for edit
        if (!this.selection[0]) {
          this.$message('请选择需要编辑的数据')
          return
        }
        this.formData = this.selection[0]
        this.parentCode = this.currentCode
        this.form.visible = true
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
    selectIcon (val) {
      this.formData.icon = val
      this.iconDialogVisible = false
    },
    /**
     * 加载树的数据
     */
    loadTreeData () {
      $.menu.getTree(this.tree.query)
      .then(data => {
        this.treeData = data
      })
    },
    /**
     * 加载当前选中节点的子菜单列表数据
     */
    loadChildren (code) {
      $.menu.getChildren(code)
      .then(data => {
        this.gridData = data
      })
    },
    /**
     * 菜单被点击后触发右侧对应的明显加载
     */
    handleNodeClick (data, node) {
      if (this.currentNode !== node) {
        this.loadChildren(data.code)
        this.currentNode = node
      }
    },
    handleSelectionChange (val) {
      this.selection = val
    },
    /**
     * 提交数据
     */
    submit (stage = 'add') {
      if (stage === 'add') {
        this.doCreate()
      } else if (stage === 'edit') {
        this.doUpdate()
      }
    },
    doCreate () {
      this.submitting = true
      $.menu.create(this.formData)
      .then(response => {
        this.submitting = false
        this.$message('新增菜单成功')
        this.form.visible = false
        this.stage = 'list'
      })
      .catch(error => {
        console.log(error)
        this.$message({
          message: '新增菜单失败',
          type: 'error'
        })
      })
    },
    doUpdate () {
      this.submitting = true
      $.menu.update(this.formData)
      .then(response => {
        this.submitting = false
        this.$message('修改菜单成功')
        this.form.visible = false
        this.stage = 'list'
      })
      .catch(error => {
        console.log(error)
        this.$message({
          message: '修改菜单失败',
          type: 'error'
        })
      })
    },
    handleChange () {},
    remove () {},
    /**
     * 菜单过滤
     */
    filterNode (value, data) {
      return !value || value === '' || data.name.indexOf(value) !== -1
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.toolbar {
  margin: 0px 0px 5px 0px;
  .menu-filter {
    padding-right: 5px;
  }
  .button-toolbar {
    padding-left: 5px;
    
  }
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
