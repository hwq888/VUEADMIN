<!--<style lang="less">-->
  <!--@import './login.less';-->
<!--</style>-->

<template>
  <div class="login">
    <div class="login-con">
      <el-card class="box-card" :body-style="{ padding: '10px 0' }">
        <div class="login-con-header tl">
          <span>欢迎登录</span>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm mt30">
          <el-form-item prop="name">
            <el-input placeholder="请输入用户名" size="medium" max="20" v-model.number="ruleForm.name" @keyup.enter.native="submitForm('ruleForm')">
              <template slot="prepend"><i class="iconfont">&#xe634;</i></template>
            </el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input placeholder="请输入密码" type="password" max="20" size="medium" v-model="ruleForm.pass" autocomplete="off" @keyup.enter.native="submitForm('ruleForm')">
              <template slot="prepend"><i class="iconfont">&#xe621;</i></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" style="width: 100%" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
          <p class="fc-info fs12">输入任意用户名和密码即可</p>
        </el-form>
      </el-card>

      <!--<Card icon="log-in" title="欢迎登录" :bordered="false">-->
        <!--<div class="form-con">-->
          <!--<login-form @on-success-valid="handleSubmit"></login-form>-->
          <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
        <!--</div>-->
      <!--</Card>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     if (this.ruleForm.checkPass !== '') {
    //       this.$refs.ruleForm.validateField('checkPass')
    //     }
    //     callback()
    //   }
    // }
    return {
      ruleForm: {
        name: '',
        pass: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
        // pass: [
        //   { validator: validatePass, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const user = {name: this.ruleForm.name}
          sessionStorage.setItem('user', JSON.stringify(user))
          this.$router.push({ path: '/home' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less">
  .login{
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        border-bottom: 1px solid #e6e6e6;
        font-size: 14px;
        font-weight: bold;
        padding-bottom: 10px;
        text-indent: 10px;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
  .ruleForm{ padding: 0 10px;}

</style>
