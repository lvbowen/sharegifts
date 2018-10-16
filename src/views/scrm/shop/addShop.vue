/*
* 店铺管理
* creater：gaoyue
 */
<template>
  <div class="addShop details">
    <div class="tit"><p>高返 / 店铺管理</p></div>
    <div class="containers">
      <div class="innerContainer">
        <div class="addForm">
      <el-form label-width="150px">
        <div class="shopTit">
          <span>绑定店铺</span>
          <el-button type="primary" round @click="addShopAction">店铺添加</el-button>
        </div>
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading" element-loading-text="拼命加载中">
            <el-table-column label="店铺类型" width="180">
                <template slot-scope="scope">
                  {{scope.row.shop_type==1?'淘宝/天猫':'京东'}}
                </template>
            </el-table-column>
            <el-table-column label="店铺信息" show-overflow-tooltip>
              <template slot-scope="scope">
                  {{scope.row.shop_name}}
              </template>
            </el-table-column>
            <el-table-column label="店铺旺旺/咚咚" show-overflow-tooltip>
              <template slot-scope="scope">
                  {{scope.row.nick_name}}
              </template>
            </el-table-column>
            <el-table-column label="店铺首页网址" show-overflow-tooltip>
              <template slot-scope="scope">
                 <a :href="scope.row.shop_url">{{scope.row.shop_url}}</a>
              </template>
            </el-table-column>
            <el-table-column label="添加时间" show-overflow-tooltip width=180>
              <template slot-scope="scope">
                  {{scope.row.create_at}}
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="addshopInfo" v-if="addShop">
          <el-form-item label="绑定新店铺" class="addTit">
            <p>（ 你已绑定{{shopNum}}个店铺，还可以添加{{leftNum}}个店铺 ）</p>
          </el-form-item>

          <div class="addContainer">
            <el-form ref="form" :model="form" label-width="150px" :rules="rules">
              <el-form-item label="店铺1：">
              <p>（店铺绑定后无法修改也无法解除绑定）</p>
            </el-form-item>
            <el-form-item label="平台类型：" prop="shop_type">
              <el-radio-group v-model="form.shop_type">
                <el-radio label="1" value="1">淘宝/天猫</el-radio>
                <el-radio label="2" value="2">京东</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="店铺首页网址：" prop="shop_url">
              <el-input type="text" v-model="form.shop_url"></el-input>
            </el-form-item>
            <el-form-item label="店铺名称：" prop="shop_name">
              <el-input type="text" v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="店铺主旺旺/咚咚：" prop="nick_name">
              <el-input type="text" v-model="form.nick_name"></el-input>
            </el-form-item>
            <el-form-item label="商品网址（URL）：" prop="goods_url">
              <el-input type="text" v-model="form.goods_url"></el-input>
            </el-form-item>
            <el-form-item>
              <p>免费试用（了解高权重模式）</p>
              <el-button type="primary" @click="okBind">确认绑定</el-button>
              <el-button @click="addShop=false">取消</el-button>
            </el-form-item>
            </el-form>

          </div>

        </div>

      </el-form>
    </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getShopInfo, bindShop, getVerity} from "@/api/scrm/shopManage"
import { fetchGood } from "@/api/goodsManage"
export default {
  data () {
    let validateUrl = (rule, value, callback) => {
      let reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if(!reg.test(value)){
             callback(new Error('请输入正确的地址'));
          } else {
            callback();
          }
    };
    return {
      form: {
        shop_name:'',
        shop_url:'',
        shop_type:'',
        nick_name:'',
        verification_code:'',
        goods_url:'',
        shopNum:0,
        leftNum:0,
      },
      tableData: [],
      addShop: false,
      listLoading: false,
      rules:{
        "shop_type":[{ required: true, message:"请选择平台类型", trigger:'change' }],
        "shop_url":[
          { required: true, message:"请输入店铺首页网址", trigger:'blur' },
          { validator: validateUrl, trigger:'blur' }
        ],
        "shop_name":[{ required: true, message:"请输入店铺名称", trigger:'blur' }],
        "nick_name":[{ required: true, message:"请输入店铺主旺旺/咚咚", trigger:'blur' }],
        "coverification_codede":[{ required: true, message:"请输入验证码", trigger:'blur' }],
        "goods_url":[
          { required: true, message:"请输入商品网址（URL）", trigger:'blur' },
          { validator: validateUrl, trigger:'blur' }
        ]
      }
    }
  },
  created () {
     this.init()
    // this.$store.dispatch('GetUserInfo').then(res => {
    //   let isCredential = res.data.is_credential
    //   if (isCredential != '2') {
    //     this.$router.push('/aptitude')
    //     this.$message.warning('请先完善商家信息!')
    //   }
    // })
  },
  methods: {
    addShopAction () {
      // if( this.tableData.length==5){
      //   this.$message.error('最多绑定5个店铺')
      //   return
      // }
      this.addShop = true
    },
    //绑定店铺
    okBind () {
       if(this.form.shop_type==1){
         if(this.form.goods_url.indexOf('.jd.com')>-1){
           this.$message.error('店铺类型和商品不匹配！')
           return
         }
       }else{
         if(this.form.goods_url.indexOf('.tmall.com')>-1||this.form.goods_url.indexOf('.taobao.com')>-1){
           this.$message.error('店铺类型和商品不匹配！')
           return
         }
       }
       this.$refs['form'].validate((valid) => {
          if (valid) {
            fetchGood({url:this.form.goods_url}).then(res => {
              if(res.success){
                if(this.form.shop_type==1){
                  console.log(res.data.shop_name)
                  console.log(this.form.shop_name)
                  if(res.data.shop_name==this.form.shop_name){
                      if(res.data.nick){
                        if(res.data.nick!=this.form.nick_name){
                          this.$message.error('店铺旺旺/咚咚与商品不匹配！')
                          return
                        }
                      }
                      bindShop(this.form).then(res => {
                        if(res.success){
                          this.$message.success(res.msg);
                          this.$router.go(0)
                        }else{
                          this.$message.error(res.msg);
                        }
                      }).catch(e => {
                        console.log(e)
                      })
                    }else{
                      this.$message.error('店铺名称与商品不匹配！')
                    }
                }else{
                  if(res.data.shop_name==this.form.shop_name){
                          bindShop(this.form).then(res => {
                          if(res.success){
                            this.$message.success(res.msg);
                            this.$router.go(0)
                          }else{
                            this.$message.error(res.msg);
                          }
                        }).catch(e => {
                          console.log(e)
                        })
                    }else{
                      this.$message.error('店铺名称与商品不匹配！')
                    }
                }

                  }
                })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    //获取验证码
    getVertyCodes(){
      getVerity().then(res => {
        if(res.success){
          this.form.verification_code=res.data
        }else{
          this.$message.error(res.msg);
        }
      }).catch(e => {
        console.log(e)
      })
    },
    //初始化店铺信息
    init () {
      this.listLoading = true
      getShopInfo().then(res => {
        this.listLoading = false
        if (res.success) {
          this.tableData = res.data
          this.shopNum=this.tableData.length;
          this.leftNum=5-this.shopNum
        }else{
          this.$message.error(res.msg);
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.details{
  position: relative;
  height:100%;
  width: 100%;
}
.tit {
  width:100%;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  margin:20px 0;
  padding:0 40px;
  position: absolute;
  box-sizing: border-box
}
.tit p{
  height:100%;
  background:rgba(255,255,255,1);
  padding:0 20px;
  box-shadow:0px 1px 0px 0px rgba(209,219,229,1);
}
.containers{
  width:100%;
  height: 100%;
  position: absolute;
  padding:80px 40px 40px;
  box-sizing: border-box

}
.innerContainer{
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}
  .addForm {
    padding: 15px;
    .shopTit {
      height: 50px;
      border-bottom: 1px solid #ebebeb;
      padding-left: 8px;
      span {
        margin-right: 20px;
      }
    }
    .addshopInfo {
      margin-top: 20px;
      border: 1px solid #ebebeb;
      padding: 15px;
      p {
        color: #999;
      }
      .addTit {
        border-bottom: 1px dashed #ebebeb;
      }
      .addContainer {
        padding: 0 20px;
        .el-input {
          width: 400px;
        }
      }
    }
  }

</style>
