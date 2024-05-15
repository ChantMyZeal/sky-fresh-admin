<template>
  <el-dialog
    title="店铺信息设置"
    :visible.sync="dialogInfoVisible"
    width="568px"
    class="infoCon"
    @open="init()"
    @close="handleInfoClose()"
    :append-to-body="true"
  >
    <el-form :model="form" label-width="85px" :rules="rules" ref="form">
      <el-form-item label="店铺名称：" prop="shopName">
        <el-input
          v-model="form.shopName"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺电话：" prop="shopPhone">
        <el-input
          v-model="form.shopPhone"
          type="tel"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺地址：" prop="shopAddress">
        <el-input
          v-model="form.shopAddress"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="店铺简介：" prop="shopIntro">
        <el-input
          v-model="form.shopIntro"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="打包费用：" prop="packageFeePerItem">
        <el-input
          v-model="form.packageFeePerItem"
          type="number"
          step="0.01"
          auto-complete="off"
          placeholder="请输入"
          >
            <template slot="prepend">每件</template>
            <template slot="append">元</template>
          </el-input>
      </el-form-item>
      <el-form-item label="配送费用：" prop="deliveryFeePerKm">
        <el-input
          v-model="form.deliveryFeePerKm"
          type="number"
          step="0.01"
          auto-complete="off"
          placeholder="请输入"
          >
            <template slot="prepend">每公里</template>
            <template slot="append">元</template>
          </el-input>
      </el-form-item>
      <el-form-item label="配送范围：" prop="deliveryRange">
        <el-input
          v-model="form.deliveryRange"
          type="number"
          step="0.01"
          auto-complete="off"
          placeholder="请输入"
        >
          <template slot="append">公里</template>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleInfoClose()">取 消</el-button>
      <el-button type="primary" @click="handleSave()">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form as ElForm, Input } from 'element-ui'
// 接口
import { getInfo, setInfo } from '@/api/users'
@Component({
  name: 'Information',
})
export default class extends Vue {
  
  private form = {} as any
  @Prop() private dialogInfoVisible!: any
  private validatePhone = (rule: any, value: any, callback: Function) => {
    const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (!value) {
      callback(new Error('请输入'))
    } else if (!reg.test(value)) {
      callback(new Error('手机号格式有误，请重新输入'))
    } else {
      callback()
    }
  }
  private validatePass = (rule, value, callback) => {
    if (!value) {
      callback(new Error('请输入'))
    } else {
      callback()
    }
  }
  rules = {
    shopName: [{ validator: this.validatePass, trigger: 'blur' }],
    shopPhone: [{ validator: this.validatePhone, trigger: 'blur' }],
    shopAddress: [{ validator: this.validatePass, trigger: 'blur' }],
    shopIntro: [{ validator: this.validatePass, trigger: 'blur' }],
    packageFeePerItem: [{ validator: this.validatePass, trigger: 'blur' }],
    deliveryFeePerKm: [{ validator: this.validatePass, trigger: 'blur' }],
    deliveryRange: [{ validator: this.validatePass, trigger: 'blur' }],
  }
  // 打开弹层后进行初始化
  async init(){
    getInfo().then(res => {
      if (res && res.data && res.data.code === 1){
        this.form = { ...res.data.data }
        this.form.shopName = res.data.data.shopName
        this.form.shopPhone = res.data.data.shopPhone
        this.form.shopAddress = res.data.data.shopAddress
        this.form.shopIntro = res.data.data.shopIntro
        this.form.packageFeePerItem = res.data.data.packageFeePerItem
        this.form.deliveryFeePerKm = res.data.data.deliveryFeePerKm
        this.form.deliveryRange = res.data.data.deliveryRange
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  handleSave() {
    (this.$refs.form as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        const params = {
          shopName: this.form.shopName,
          shopPhone: this.form.shopPhone,
          shopAddress: this.form.shopAddress,
          shopIntro: this.form.shopIntro,
          packageFeePerItem: this.form.packageFeePerItem,
          deliveryFeePerKm: this.form.deliveryFeePerKm,
          deliveryRange: this.form.deliveryRange,
        }
        await setInfo(params)
        this.$emit('handleclose')
        ;(this.$refs.form as ElForm).resetFields()
      } else {
        return false
      }
    })
  }
  handleInfoClose() {
    (this.$refs.form as ElForm).resetFields()
    this.$emit('handleclose')
  }
}
</script>
<style lang="scss">
.navbar {
  .infoCon {
    .el-dialog__body {
      padding-top: 60px;
      padding: 60px 100px 0;
    }
    .el-input__inner {
      padding: 0 12px;
    }
    .el-form-item {
      margin-bottom: 26px;
    }
    .el-form-item__label {
      text-align: left;
    }
    .el-dialog__footer {
      padding-top: 14px;
    }
  }
}
</style>
