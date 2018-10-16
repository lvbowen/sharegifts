/*
* 新建高返活动第三步
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">3</span>
        <span class="titText">设置展示信息</span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="宝贝类目" prop="goods_category_id">
          <!-- <el-form-item label="宝贝类目" prop="cid">  -->
          <el-select v-model="pid" filterable allow-create default-first-option placeholder="请选择产品父类目" @change="getCate(pid)">
            <el-option v-for="item in parentCate" :key="item.cate_id" :label="item.cate_name" :value="item.cate_id">
            </el-option>
          </el-select>
          <el-select v-model="cid" filterable allow-create default-first-option placeholder="请选择产品子类目" @change="getChild()">
            <el-option v-for="item in childCate" :key="item.cate_id" :label="item.cate_name" :value="item.cate_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宝贝名称">
          <el-input v-model="goodInfo.item_title" @input="goodC"></el-input>
        </el-form-item>
        <el-form-item label="宝贝图片" prop="TreasuredImg">
          <img v-for="(item,index) in goodInfo.item_images" :src="item" @click="setMainImg(index,item)" v-bind:class="{mainImg:isMainImgIndex==index}" :key="index">
          <p class="platTips">默认第1个为主图，点击图片可切换主图</p>
        </el-form-item>
        <el-form-item label="上传图片">
          <p class="platTips">推荐上传400 * 400的高清图片，如果因为图片太小造成模糊，平台概不负责！</p>
        </el-form-item>
        <el-form-item label="下单主图" prop="order_image">
          <el-upload class="avatar-uploader" action="upload.action" :http-request="uplodMainPic" name="file" :show-file-list="false" accept="image/jpg,image/jpeg, image/png">
            <img v-if="ruleForm.order_image" :src="ruleForm.order_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="联系QQ" prop="qq">
          <el-input v-model="ruleForm.qq"></el-input>
          <span class="inputTips">用户获得资格后展示，必须设置QQ权限为允许任何人，允许临时会话</span>
        </el-form-item>
        <el-form-item label="是否包邮" prop="free_shipping">
          <el-radio-group>
            <el-checkbox v-model="ruleForm.free_shipping">是</el-checkbox>
          </el-radio-group>
          <span class="inputTips">（本活动承诺宝贝全国包邮）</span>
        </el-form-item>
        <el-form-item label="商品详情">
          <!-- <el-select v-model="ruleForm.sku_id" placeholder="请选择" @change="viewSKU(ruleForm.sku_id)">
            <el-option :label="item.pv" :value="k" v-for="(item,k) in goodInfo.sku" :key="k"></el-option>
          </el-select>&nbsp;&nbsp;&nbsp;&nbsp; -->
          <span class="balanceTips" v-if="showPay">当前账户余额：{{balance}}元&nbsp;&nbsp;
            <el-button type="primary" size="mini" @click="goPay">去充值</el-button>
          </span>
          <div class="tableBox">
            <el-table :data="tableData" border style="width: 100%">
              <!-- <el-table-column label="SKU">
                <template slot-scope="scope">
                  <span>{{scope.row.attr_name}}</span>
                </template>
              </el-table-column> -->
              <el-table-column prop="remark" label="备注">
                <template slot-scope="scope">
                  <el-popover placement="top-start" title="示例" trigger="hover">
                    <img src="../../assets/image/scrm/example.png" style="width:300px">
                    <div slot="reference" class="name-wrapper">
                      <el-input type="text" v-model="scope.row.remarks" v-bind:class="{iserror:errors}"></el-input>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="宝贝金额">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.price" v-bind:class="{iserror:errors}"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="return" label="返现金额">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.return" v-bind:class="{iserror:errors}" @change="checkMi"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="stock_num" label="库存">
                <template slot-scope="scope">
                  <el-input type="text" v-model="scope.row.stock_num" v-bind:class="{iserror:errors}"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="needMoney" label="押金">
                <template slot-scope="scope">
                  <el-input type="text" @change="checkMoney(scope.row)" v-model="scope.row.needMoney" v-bind:class="{iserror:errors}" readonly></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <div>
            <Editor></Editor>
          </div>
        </el-form-item>

        <el-form-item label="付费方式" prop="payType">
          <p> 允许使用信用卡和花呗支付，将会使数据更加真实</p>
          <el-checkbox v-model="ruleForm.remind.credit_card">允许买家使用信用卡支付</el-checkbox>
          <el-checkbox v-model="ruleForm.remind.huabei">允许买家使用花呗支付</el-checkbox>
        </el-form-item>
        <el-form-item label="购买提醒" prop="payType">
          <el-checkbox v-model="ruleForm.remind.saitu">无需晒图</el-checkbox>
          <el-checkbox v-model="ruleForm.remind.wangwang">无需旺旺聊天</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <div class="btnBox">
            <el-button type="primary" @click="sure">确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Bus from '@/api/eventBus.js'
import { getCateList } from "@/api/goodsManage"
import { getQiNiuToken } from "@/api/qiniu"
import Editor from '@/components/scrm/Editor'
import { getAccountBanlance } from '@/api/scrm/activity'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isShowEdit: false,//是否显示修改
      isMainImgIndex: 0,
      ruleForm: {
        remind: {
          credit_card: false,
          huabei: false,
          saitu: false,
          wangwang: false,
        },
        order_image: '',
        free_shipping: false
      },
      goodInfo: {},
      rules: {
        goods_category_id: [{ required: true, message: "请选择类目", trigger: 'change' }],
        qq: [{ required: true, message: "请填写qq", trigger: 'blur' }],
        price: [{ required: true, message: "请填写价钱", trigger: 'blur' }],
        goods_name: [{ required: true, message: "请填写商品名称", trigger: 'blur' }],
        order_image: [{ required: true, message: "请上传下单主图", trigger: 'blur' }],
      },
      tableData: [{
        attr_name: '',
        return: '',
        remarks: '',
        price: 0,
        stock_num: 0,
        needMoney: 0
      }],
      parentCate: [],
      parentVal: '',
      childCate: [],
      pid: '',
      cid: '',
      upload: {
        token: '',
        action: '',
        key: ''
      },
      errors: false,
      imgUrl: '',
      sendObj: {
        remind: {
        }
      },
      balance: 0,
      showPay: false,
      flag:false//验证条件是否符合
    }
  },
  computed: {
    ...mapGetters([
      'activityDetail',
      'stock',
      'needMoney'
    ])
  },

  created () {
   
    this.getCate(0)
    this.getToaken();
    let formContain = sessionStorage.getItem('obj')//获取信息
    if (formContain) {
      this.tableData = []
      this.ruleForm = JSON.parse(formContain)
      this.ruleForm.remind = JSON.parse(this.ruleForm.remind)
      this.ruleForm.free_shipping = this.ruleForm.free_shipping == 0 ? false : true
      this.ruleForm.remind.credit_card = this.ruleForm.remind.credit_card == 0 ? false : true
      this.ruleForm.remind.huabei = this.ruleForm.remind.huabei == 0 ? false : true
      this.ruleForm.remind.saitu = this.ruleForm.remind.saitu == 0 ? false : true
      this.ruleForm.remind.wangwang = this.ruleForm.remind.wangwang == 0 ? false : true
      this.pid = this.ruleForm.goods_category_id.split(',')[0]
      this.cid = this.ruleForm.goods_category_id.split(',')[1]
      this.goodInfo.item_title = this.ruleForm.goods_name
      this.getCate(this.pid)
      let obj = {
        attr_name: this.ruleForm.properties_name,
        remarks: this.ruleForm.remarks,
        price: this.ruleForm.price,
        stock_num: this.ruleForm.stock_num,
        needMoney: parseInt(this.ruleForm.stock_num) * parseFloat(this.ruleForm.return),
        return: this.ruleForm.return,
        sku_attrs: [{ attr_name: this.ruleForm.properties_name }],
      }
      let imgArr = JSON.parse(this.ruleForm.item_images)
      this.goodInfo.item_images=imgArr
      this.goodInfo.item_cover_image=this.ruleForm.item_cover_image
      this.goodInfo.item_id=this.ruleForm.item_id
      for (let i = 0; i < imgArr.length; i++) {
        if (imgArr[i] == this.ruleForm.item_cover_image) {
          this.isMainImgIndex = i
        }
      }
      this.tableData.push(obj)
      this.setActivityDetail(this.ruleForm.goods_detail)
      
    }else{
      Bus.$on('goodInfo', val => {
      this.tableData=[]
      this.goodInfo = val.obj
      this.goodInfo.item_cover_image = this.goodInfo.item_images[0]
      this.ruleForm.order_image = this.goodInfo.item_images[0]
      let obj = {
          needMoney: 0,
          return: 0,
          remarks: '',
          attr_name: '',
          price: this.goodInfo.item_price,
          stock_num: 0
      }
      this.tableData.push(obj)
      })
    }
    this.getBanlance()
    
  },
  watch: {
    'ruleForm': {
      handler (newValue, oldValue) {
        this.sendMsg()
      },
      deep: true
    },
    'goodInfo': {
      handler (newValue, oldValue) {
        this.sendMsg()
      },
      deep: true
    },
    'tableData': {
      handler (newValue, oldValue) {
        this.tableData[0].needMoney = parseFloat(this.tableData[0].return) * parseInt(this.tableData[0].stock_num)
        if (this.tableData[0].needMoney > parseFloat(this.balance)) {
          this.showPay = true
        } else {
          this.showPay = false
        }
        if(parseFloat(this.tableData[0].price*0.6)<parseFloat(this.tableData[0].return)){
          this.flag = false
        }else{
          this.flag = true
        }

      },
      deep: true
    }
  },
  methods: {
    sure () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid&&!this.flag) {
          if (this.tableData[0].needMoney > parseFloat(this.balance)) {
            this.$message.error('账户余额不足,请点击充值按钮去充值')
            return
          }
          this.isShowEdit = true
          this.sendMsg()

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //设置主图
    setMainImg (i, item) {
      this.isMainImgIndex = i
      this.goodInfo.item_cover_image = item
      this.ruleForm.order_image = item
    },
    sendMsg () {
      let obj = {
        remind: {
        }
      }
      obj.properties_name = this.tableData[0].attr_name
      obj.return = this.tableData[0].return
      obj.remarks = this.tableData[0].remarks
      obj.price = this.tableData[0].price
      obj.stock_num = this.tableData[0].stock_num
      this.setStock(obj.stock_num)
      if (this.ruleForm.remind.credit_card == true) {
        obj.remind.credit_card = 1
      } else if (this.ruleForm.remind.credit_card == false) {
        obj.remind.credit_card = 0
        
      }
      if (this.ruleForm.remind.huabei == true) {
        obj.remind.huabei = 1
      } else if (this.ruleForm.remind.huabei == false) {
        obj.remind.huabei = 0
      }
      if (this.ruleForm.remind.saitu == true) {
        obj.remind.saitu = 1
      } else if (this.ruleForm.remind.saitu == false) {
        obj.remind.saitu = 0
      }
      if (this.ruleForm.remind.wangwang == true) {
        obj.remind.wangwang = 1
      } else if (this.ruleForm.remind.wangwang == false) {
        obj.remind.wangwang = 0
      }
      if (this.ruleForm.free_shipping == true) {
        obj.free_shipping = 1
      } else if (this.ruleForm.free_shipping == false) {
        obj.free_shipping = 0
      }
      obj.item_cover_image = this.goodInfo.item_cover_image
      obj.order_image = this.ruleForm.order_image
      obj.item_images = this.isString(this.goodInfo.item_images)
      obj.item_id = this.goodInfo.item_id
      obj.remind = this.isString(obj.remind)
      obj.qq = this.ruleForm.qq
      obj.goods_category_id = this.pid + ',' + this.cid
      obj.sku_id = this.ruleForm.sku_id
      obj.goods_name = this.goodInfo.item_title
      obj.goods_detail = this.activityDetail
      this.$emit('treasuredInfo', obj);
    },
    checkMoney (data) {
      let need = parseFloat(data.return) * parseInt(data.stock_num)
    },
    checkMi(){
        if(parseFloat(this.tableData[0].price*0.6)>parseFloat(this.tableData[0].return)){
          this.$message.warning('返现金额应大于商品金额的60%')
          this.flag = true
        }
    },
    uplodMainPic (req) {
      if (req.file.size / 1024 / 1024 > 2) {
        this.$message.error("上传图片不能大于2M");
        return;
      }
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      const keyname = "goods/" + new Date().getTime() + "_" + Math.floor(Math.random() * 100) + "." + filetype;
      let formdata = new FormData();
      console.log(req.file)
      formdata.append("file", req.file);
      formdata.append("token", this.upload.token);
      formdata.append("key", keyname);
      let that = this
      this.$post(process.env.UPLOAD_API, formdata, "multipart/form-data").then(data => {
        this.$nextTick(() => {
          this.ruleForm.order_image = process.env.IMAGE_API + data.key;
        })
      });
    },

    //获取类目
    getCate (id) {
      getCateList({ parent_id: id }).then(res => {
        if (res.success) {
          if (id == 0) {
            this.parentCate = res.data
          } else {
            this.pid = id
            this.childCate = res.data
          }
        }
      })
    },
    getToaken () {
      getQiNiuToken({ type: 'goods' }).then(res => {
        if (res.success) {
          this.upload.token = res.data.up_token
          this.upload.action = res.data.upload_url
        }
      })
    },
    //检验复选框是否选中
    checkBoxVal (val) {
      return val == 1 ? true : false
    },
    //对传值进行判断
    isString (val) {
      if (typeof (val) == 'string') {
        return val
      } else {
        return JSON.stringify(val)
      }
    },
    getChild () {
      this.ruleForm.goods_category_id = this.pid + ',' + this.cid
    },
    goodC () {
      this.ruleForm.goods_name = this.goodInfo.item_title
    },
    getBanlance () {
      getAccountBanlance().then(res => {
        if (res.success) {
          this.balance = res.data.balance
        }
      })
    },
    goPay () {
      this.$router.push({
        path: '/accountBalance'
      })
    },
    ...mapMutations({
      setActivityDetail: 'SET_ACTIVITY_DETAIL',
      setStock: 'SET_STOCK',
      setGoodDetail: 'SET_GOOD_DETAIL',
      setMoney: 'SET_MONEY'
    })

  },
  components: {
    Editor
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
    .el-input {
      width: 400px;
    }
    table .el-input {
      width: 80%;
      margin: 0 auto;
    }
    img {
      width: 140px;
      height: 140px;
      margin-right: 15px;
    }
    .mainImg {
      box-shadow: 0 0 11px #090bf9;
    }
    .platTips {
      font-size: 14px;
      color: #e6a23c;
    }
    .inputTips {
      color: #aaa;
      margin-left: 10px;
    }
    .tableBox {
      margin-top: 20px;
      width: 80%;
    }
    .iserror {
      input {
        border-color: #f56c6c !important;
      }
    }
  }
}
.el-button--small {
  border-radius: 5px;
  height: 32px;
  padding: 8px 15px;
}
.balanceTips {
  color: #f56c6c;
}
</style>

