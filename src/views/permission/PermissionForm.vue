<template>
  <div>
    <el-dialog title="权限" :visible.sync="visible" size="tiny">
      <el-form :model="data" label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="data.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="data.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="data.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit(stage)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible: false,
      data: {
        code: '',
        name: '',
        remark: ''
      }
    }
  },
  methods: {
    setVisible (val) {
      this.visible = val === true
    }
  }
}
</script>

