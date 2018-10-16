<template>
  <div class="bgf w100 h100 register" >
    <div>
      <!-- <img src="../../assets/image/logored.png" alt="" style="width:120px"> -->
      <img src="https://youxuan.ecbao.cn/default/1532776489644_41.png" alt="" style="width:90px">
      <!-- <span>爱分享，爱生活</span> -->
    </div>
    <div class="info">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm2.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model.number="ruleForm2.tel"></el-input>
        </el-form-item>
         <el-form-item label="验证码" prop="code">
          <el-input v-model.number="ruleForm2.code">
              <el-button slot="append" :disabled="isDisabled" @click="getCode">{{text}}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
          <el-checkbox v-model="checked" style="margin: 15px 5px 10px 100px;"> 同意 <a :href="$api.root+'/#/agreement'" class="c5"  target="_blank" >《爱聚优选平台合作协议》</a></el-checkbox>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
     <p style="margin-top:10px;">
      <span class="ft14 c9">已有账号?</span>
      <a href="javascript:;" class="ft14 c5" @click="goLogin">立即登录</a>
    </p> 
  </div>
</template>

<script>
export default {
  data() {
     var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("电话不能为空"));
      }
      setTimeout(() => {
        if (!/^(13|14|15|16|18|17|19)[0-9]{9}$/.test(value)) {
          callback(new Error("手机号码输入有误"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        name:'',
        tel: "",
        code: "",
        pass: "",
        checkPass: ""
      },
      rules2: {
        name: [{ validator: checkName, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      },
      text: "获取验证码",
      isDisabled: false,
      num: 60,
      checked:false,
      dialogVisible:false
    };
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.checked) {
            this.$message.error('请先勾选同意协议')
            return
          }
          var url = this.$api.regester,
            params = {
              username: this.ruleForm2.name,
              phone:this.ruleForm2.tel,
              password: this.ruleForm2.checkPass,
              confirm_password:this.ruleForm2.pass,
              valid_code: this.ruleForm2.code,
            };
          this.$post(url, params).then(res => {
            if (res.code == "000") {
              this.$message({
                message: res.msg,
                type: "success"
              });
              setTimeout(() => {
                window.location.href=this.$api.root+`/?token=${res.data.token}#/`
              }, 1000);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getCode() {
      console.log(this.ruleForm2.tel);
      
      if (!this.ruleForm2.tel) {
        this.$message.error("请输入手机号");
        return;
      }
      if (!/^(13|14|15|16|18|17|19)[0-9]{9}$/.test(this.ruleForm2.tel)) {
        this.$message.error("手机号码输入有误");
        return;
      }
      this.$post(this.$api.sendCode, {phone:this.ruleForm2.tel}).then(res => {
            if (res.code == "000") {
              var timer = setInterval(() => {
                this.num--;
                if (this.num == 0) {
                    clearInterval(timer);
                    this.text = `获取验证码`;
                    this.num = 60;
                    this.isDisabled = false;
                  } else {
                    this.text = `${this.num}s重新发送`;
                    this.isDisabled = true;
                }
              }, 1000);
            }
          });
    },
    goLogin(){
      window.location.href=this.$api.root+`/#/login`
    },
   
  }
};
</script>
<style lang='less' scoped>
.register {
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;
}
.info {
  padding-right: 100px;
}
.info/deep/.el-input {
  margin: 20px 0;
}
.info/deep/.el-form-item__label {
  margin-top: 20px;
}
.info/deep/.el-button.is-disabled:hover {
  background-color: transparent;
}
.info/deep/.el-form-item{
  margin:0;
}
.info/deep/.el-checkbox__label{
  margin-top:4px;
}
.tip/deep/.agreementModel-content{
  width: 650px;
  height: 500px;
  overflow: hidden;
  overflow-y: auto;
}
.tip/deep/.el-dialog{
  width: 668px
}
.tip/deep/.el-dialog__body{
  padding:10px
}

.tip/deep/.el-dialog__header{
  border-bottom: 1px solid #e6e6e6;
  
}

</style>