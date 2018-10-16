/*
* 新建高返活动第五步
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">5</span>
        <span class="titText">进店路径设置</span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="stepTit">
          <span>移动端搜索关键词（填写宝贝标题里有的词 做为关键词 ，如未按要求填写 会导致搜索不到 活动效果变差 降低综合排名）</span>
        </div>

        <el-form-item label="分配占比" prop="keyword_ratio">
          <el-input class="precents" v-model="ruleForm.keyword_ratio" placeholder="请输入1至2位整数" min="0" max="100"></el-input>%
          <span class="inputTips">注：两个占比相加为100</span>
          <span>
            <!-- <el-checkbox v-model="trusteeship">精准关键词托管</el-checkbox> -->
          </span>
        </el-form-item>
        <div class="searchBox" v-for="(i,index) in ruleForm.search_keywords">
          <el-form-item label="搜索关键词" :rules="[{min: 2, max: 6, message: '长度在2到6个字符', trigger: 'blur' }]" :prop="'search_keywords.'+index+ '.keyWord'">
            <el-input class="precents" v-model="i.keyWord"></el-input>
          </el-form-item>
          <el-form-item label="排序方式">
            <el-select placeholder="请选择" v-model="i.sort">
              <el-option v-for="item in keyOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div class="el-icon-circle-plus-outline iconBoxss" @click="addKey" v-if="index==0"></div>
          <div class="el-icon-remove-outline iconBoxss removeBtn" @click="delKey(index)" v-if="index!=0"></div>
        </div>
        <el-form-item label="价格区间" prop="price_range">
          <span class="priceBox">
            <el-input v-model="ruleForm.price_range.min"></el-input> 至
            <el-input v-model="ruleForm.price_range.max"></el-input>
          </span>
          <span class="highColor showPrice">
            搜索展示价
          </span>
          <span class="highColor tipsbtn">
            提升宝贝人气选项
          </span>
        </el-form-item>
        <div class="stepTit retit">
          <span>折扣和服务（如关键词排名较低，建议设置以下项，缩小搜索范围，以便试客能找到商品）</span>
        </div>
        <div class="servierBox" prop="discounted_service">
          <el-checkbox-group v-model="ruleForm.discounted_service" >
            <el-checkbox v-for="(tao,index) in severArr" :label="(index+1)" :key="index">{{tao}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="stepTit retit">
          <span>二维码搜索</span>
        </div>
        <el-form-item label="分配占比：" prop="qr_code_ratio">
          <el-input class="precents" v-model="ruleForm.qr_code_ratio" @change="computerRatio" placeholder="请输入1至2位整数" min="0" max="100"></el-input>%
          <span class="inputTips">注：两个占比相加为100</span>
        </el-form-item>
        <el-form-item label="二维码：" class="qrcode">
          <img :src="imgUrl" alt="">
        </el-form-item>

      </el-form>
    </div>
    <div class="mainBox">
      <div class="btnBox">
        <el-button type="primary" @click="sure">下一页</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from '@/api/eventBus.js'
export default {
  data () {
    return {
      isShowEdit: false,
      ruleForm: {
        price_range: {},
        discounted_service: [],
        keyword_trusteeship: 0,
        search_keywords: [{ keyword: '', sort: "1" }],
      },
      trusteeship: 0,
      rules: {
        keyword_ratio: [
          { required: true, message: "关键词搜索比例不能为空", trigger: 'blur' }
        ],
        keyWord: [{ required: true, message: "搜索关键词不能为空", trigger: 'blur' }],
        sort: [{ required: true, message: "排序不能为空", trigger: 'blur' }],
        qr_code_ratio: [
          { required: true, message: "分配占比不能为空", trigger: 'blur' }
        ],
        price_range: [{ required: true, message: "价格区间不能为空", trigger: 'blur' }],
      },
      severArr: ["包邮", "天猫", "消费者保障", "全球购", "公益宝贝", "淘金币抵钱", "7+天内退货", "花呗分期", "通用排序"],
      keyOptions: [
        {
          value: '1',
          label: '综合'
        }, {
          value: '2',
          label: '销量'
        }, {
          value: '3',
          label: '价格'
        }, {
          value: '4',
          label: '人气'
        },
        {
          value: '5',
          label: '信用'
        },
      ],
      
      url: '',
      imgUrl: ''
    }

  },
  created () {
    Bus.$on('goodInfo', val => {
      this.imgUrl = val.obj.qr_code
    })
    let formContain = sessionStorage.getItem('obj')//获取信息
    if (formContain) {
      this.ruleForm = JSON.parse(JSON.parse(formContain).route_to_store)
      this.ruleForm.price_range = JSON.parse(this.ruleForm.keyword.price_range)
      this.ruleForm.search_keywords = JSON.parse(this.ruleForm.keyword.search_keywords)
      this.ruleForm.discounted_service = this.$set(this.ruleForm,'discounted_service',JSON.parse(this.ruleForm.keyword.discounted_service))
      this.ruleForm.keyword_ratio = this.ruleForm.keyword.keyword_ratio
      this.ruleForm.qr_code_ratio = this.ruleForm.qr_code.qr_code_ratio
      this.ruleForm.qr_code = this.ruleForm.qr_code.qr_code
    }
  },
  watch: {
    'ruleForm': {
      handler (newValue, oldValue) {
        this.sendMsg()
      },
      deep: true
    }
  },
  methods: {
    sure () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (parseInt(this.ruleForm.qr_code_ratio) + parseInt(this.ruleForm.keyword_ratio) != 100) {
            this.$message.error('两个分配比例相加不等于100！')
            return false
          }
          this.isShowEdit = true
          let obj = {
            keyword_trusteeship: 0,
            search_keywords: JSON.stringify(this.ruleForm.search_keywords),
            price_range: JSON.stringify(this.ruleForm.price_range),
            discounted_service: JSON.stringify(this.ruleForm.discounted_service),
            qr_code: this.imgUrl,
            keyword_ratio: this.ruleForm.keyword_ratio,
            qr_code_ratio: this.ruleForm.qr_code_ratio,
          }
          this.$emit('getfiveParams', { obj: obj, first: false });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    addKey () {
      this.ruleForm.search_keywords.push({ keyWord: '', sort: '1' })
    },
    delKey (index) {
      this.ruleForm.search_keywords.splice(index, 1);
    },

    computerRatio () {
      if (parseInt(this.ruleForm.qr_code_ratio) + parseInt(this.ruleForm.keyword_ratio) != 100) {
        this.$message.error('两个分配比例相加不等于100！')
        return false
      }
    },
    changeServe(event){
      console.log(event)
      this.$nextTick(function(){
        console.log(this.ruleForm.discounted_service)
      })
    },
    checkBoxVal (val) {
      this.trusteeship = val == 1 ? true : false
    },
    sendMsg () {
      if (this.trusteeship == true) {
        this.ruleForm.keyword_trusteeship = 0
      } else if (this.trusteeship == false) {
        this.ruleForm.keyword_trusteeship = 1
      }
      let obj = {
        keyword_trusteeship: this.ruleForm.keyword_trusteeship,
        search_keywords: this.isString(this.search_keywords),
        price_range: this.isString(this.ruleForm.price_range),
        discounted_service: this.isString(this.ruleForm.discounted_service),
        qr_code: this.imgUrl,
        keyword_ratio: this.ruleForm.keyword_ratio,
        qr_code_ratio: this.ruleForm.qr_code_ratio,
      }

      this.$emit('getfiveParams', { obj: obj });
    },
    //对传值进行判断
    isString (val) {
      if (typeof (val) == 'string') {
        return val
      } else {
        return JSON.stringify(val)
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.mainBox {
  padding: 20px;
  color: #606266;
  .mianTit {
    height: 44px;
    width: 100%;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: #f4f6f9;
    .editIcon {
      align-items: center;
      line-height: 40px;
      i {
        color: #66bd6a;
      }
    }

    span {
      display: inline;
    }

    .order {
      line-height: 20px;
      font-weight: bold;
      text-align: center;
      margin: 8px 10px 0 20px;
      display: block;
      border: 2px solid #3d95fb;
      height: 25px;
      width: 25px;
      color: #3d95fb;
      border-radius: 12.5px;
      float: left;
    }
    .titText {
      height: 100%;
      line-height: 42px;
    }
  }
  .mainContain {
    border: 1px solid #e4e7ed;
    margin-top: 20px;
    padding: 20px;
    .stepTit {
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      margin: 20px 0;
      padding-left: 20px;
      span {
        border-left: 3px solid #3d95fb;
        display: inline-block;
        padding-left: 11px;
        height: 18px;
        line-height: 18px;
      }
    }
    .retit {
      border-top: 1px dashed #e4e7ed;
    }

    .inputTips {
      color: #aaa;
      margin-left: 10px;
      margin-right: 30px;
    }
    .el-input {
      width: 400px;
    }
    .precents {
      width: 192px;
    }
    .searchBox {
      display: flex;
      .iconBoxss {
        line-height: 36px;
        font-size: 36px;
        height: 36px;
        margin-left: 30px;
        color: #409eff;
      }
      .removeBtn {
        color: #ff464e;
      }
    }
    .priceBox {
      width: 192px;
      .el-input {
        width: 80px;
      }
    }
    .showPrice {
      font-size: 14px;
      margin: 0 36px 0 20px;
    }
    .tipsbtn {
      padding: 8px;
      background: #fdf5ea;
      border-radius: 4px;
    }
    .servierBox {
      padding-left: 20px;
    }
    .btnBox {
      text-align: center;
      margin-top: 20px;
      width: 196px;
      height: 36px;
      line-height: 36px;
      margin: 20px auto;
      button {
        width: 100%;
      }
    }
  }
}
.highColor {
  color: #e6a23c;
  font-size: 14px;
}
.mainBox {
  .btnBox {
    width: 196px;
    text-align: center;
    margin: 0 auto;
    button {
      width: 100%;
    }
  }
}
.qrcode img {
  width: 100px;
  height: 100px;
}
</style>

