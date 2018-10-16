<template>
  <div style="background:#fff;height:100%;">
    <div class="header">
      <div class="logo">
        <img src="../../assets/image/logored.png" alt="">
        <span>爱分享，聚生活</span>
      </div>
    </div>
    <div class="content">
      <div class="login">
        <img src="../../assets/image/aij.jpg" alt="">
        <div class="tel_pass">
          <div class="title">欢迎登录小福社商户后台</div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="phone">
              <el-input type="text" v-model="ruleForm.phone" auto-complete="off" placeholder="请输入用户账号" prefix-icon='iconfont icon-Smartphone' clearable style="width:85%;"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="输入登录密码" @keyup.enter.native="submitForm" prefix-icon='iconfont icon-Lock' clearable style="width:85%;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" style="width:85%;letter-spacing: 8px;margin:30px 0;">登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as reg from '@/utils/reg'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号!'))
      } else if (!reg.default.Tel.test(value)) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    };
    const validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'token',
    ])
  },
  created () {
    let url = location.href
    if (url.indexOf('=') > 0) {
      let token = url.split('#')[0].split('=')[1]
      this.setToken(token)
      this.$store.dispatch('GetUserInfo').then(() => {
        // this.$router.push('/dashboard')
        location.href=url.split('#')[0].split('=')[0].split('?')[0]+'#/dashboard'
        
      })


    }
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.ruleForm).then(res => {
            if (res.code == '000') {
              this.$message.success('登录成功!')
              this.$router.push('/dashboard')
            } else {
              if (res.code == '1001') {
                this.$message.error(res.msg)
              } else if (res.code == '1002') {
                this.$message.error(res.msg)
              }
            }
          }).catch(() => {
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations({
      setToken: 'SET_TOKEN'
    })
  }
};
</script>
<style lang='less' scoped>
body {
  background: #fff;
}

.header {
  width: 100%;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  .logo {
    margin-left: 20%;
    font-size: 24px;
    color: rgba(31, 45, 61, 1);
    img {
      width: 34px;
    }
    span {
      margin-left: 16px;
    }
  }
}

.content {
  width: 66%;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
  .login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 52%;
    }
    .tel_pass {
      padding-bottom: 30px;
      width: 36.5%;
      border: 1px solid rgba(235, 238, 245, 1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: hidden;
      .title {
        font-size: 32px;
        color: rgba(31, 45, 61, 1);
        text-align: center;
        margin: 60px 24px 60px 24px;
      }
    }
  }
}
</style>
<style>
.content .el-form-item__content {
  margin-left: 0 !important;
  display: flex;
  justify-content: center;
}

.content .el-form-item__error {
  left: 32px;
}
</style>
