<template>
  <div class="bgf w100 h100 register" >
   
    <div class="info">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left">
        <el-form-item label="公司名称：" prop="company">
          <i class="iconfont icon-gongsi icon"></i>
          <el-input v-model="ruleForm2.company" style="width:350px;" ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" prop="name">
          <i class="iconfont icon-lianxiren icon"></i>

          <el-input v-model="ruleForm2.name" style="width:350px;" ></el-input>
        </el-form-item>
        <el-form-item label="联系手机：" prop="tel">
          <i class="iconfont icon-msnui-tel icon"></i>

          <el-input v-model.number="ruleForm2.tel"  ></el-input>
        </el-form-item>
        <el-form-item label="经营类目：" style="width:350px;" > 
          <i class="iconfont icon-gongzuotai icon"></i>
            <el-select v-model="ruleForm2.category" placeholder="请选择"  style="width:350px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="商家类型："  >
          <i class="iconfont icon-shangjiarenzheng icon"></i>
            <el-select v-model="ruleForm2.shop" placeholder="请选择"  style="width:350px;">
              <el-option
                v-for="item in shopArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')" style="width:100%">申请入驻</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p style="margin-top:10px;padding-right: 120px;">
      <span class="ft14 c9">提示：3个工作日内，会有优选运营和您联系</span>
    </p> 
  </div>
</template>

<script>
export default {
  data() {
    
    var validateCompany = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("公司名称不能为空"));
      } else {
        callback();
      }
    };
     var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("联系人不能为空"));
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
    return {
      ruleForm2: {
        company: "",
        name:'',
        tel: "",
        category:'生鲜\食品',
        shop:'厂商'
      },
      options:[
          {label:'生鲜\食品',value:'生鲜\食品'},
          {label:'母婴',value:'母婴'},
          {label:'家居',value:'家居'},
          {label:'美妆\个护',value:'美妆\个护'},
          {label:'服饰',value:'服饰'},
          {label: "其他", value: "其他" },
      ],
      shopArr:[
          {label:'厂商',value:'厂商'},
          {label:'经销商',value:'经销商'},
          {label:'品牌商',value:'品牌商'},
      ],
      rules2: {
        company: [{ validator: validateCompany, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        tel: [{ validator: checkTel, trigger: "blur" }],
      },
    
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.$api.audit,
            params = {
              user_name: this.ruleForm2.name,
              company_name: this.ruleForm2.company,
              phone:this.ruleForm2.tel,
              category:this.ruleForm2.category,
              shop_type:this.ruleForm2.shop,
            };
          this.$post(url, params).then(res => {
            if (res.code == "000") {
              this.$message({
                message: res.msg,
                type: "success"
              });
              // window.location.href=""
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
  padding-top: 100px;
}
.info {
  padding-right: 180px;
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
.info/deep/.el-form-item__content {
  position: relative;
}
.icon{
  position: absolute;
  left: -110px;
  font-size: 20px;
  top: 18px;
}
.info/deep/.el-form--label-left .el-form-item__label{
  text-align: right
}
</style>