/*
* 新建高返活动第二步
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">2</span>
        <span class="titText">设置目标推广宝贝信息</span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="店铺名称" prop="shop_id">
          <el-select v-model="ruleForm.shop_id" placeholder="请选择店铺">
            <el-option v-for="item in shopList" :key="item.id" :label="item.shop_name" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" @click="turnAdd" size="mini" plain>绑定店铺</el-button>
        </el-form-item>
        <el-form-item label="标题活动" prop="active_name">
          <el-input v-model="ruleForm.active_name"></el-input>
          &nbsp;&nbsp;<span style="color:#e6a23c">请简单介绍商品信息为活动标题，让用户更清楚的了解该商品</span>
        </el-form-item>
        <el-form-item label="宝贝链接" prop="goods_url">
          <el-input v-model="ruleForm.goods_url" clearable></el-input>
        </el-form-item>
        <el-form-item label="">
          <div class="btnBox">
            <el-button type="primary" @click="sure">点击获取宝贝信息</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div id="canvas" v-show="false"></div>
  </div>
</template>
<script>
import Bus from '@/api/eventBus.js';
import { getShopInfo, getToken, dataURLtoFile } from "@/api/scrm/shopManage"
import { fetchGood } from "@/api/goodsManage"
import { upload } from "@/js/upload"
import goodsManageVue from '../../views/sharegifts/goodsManage/goodsManage.vue';
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      isShowEdit: false,
      ruleForm: {},
      shopList: [],
      imgUrl: '',
      shop:'',
      rules: {
        shop_id: [{ required: true, message: "请选择店铺", trigger: 'change' }],
        active_name: [
          { required: true, message: "请填写标题活动", trigger: 'change' },
          { min: 1, max: 8, message: '活动名称不大于8个字', trigger: 'blur' }
          ],
        goods_url: [{ required: true, message: "请填写宝贝链接", trigger: 'change' }],
      }
    }
  },
  watch:{
    'ruleForm':{
      handler(newValue, oldValue) {
　　　　this.sendMsg()//向父级传参
　　　},
　　　deep: true
    }
  },
  computed: {
      ...mapGetters([
          'activityDetail',

      ])
  },
  created () {
    let formContain = sessionStorage.getItem('obj')//获取信息
    Bus.$on('shopList',res => {
        this.shopList = res
    })
    if (formContain) {
      this.ruleForm = JSON.parse(formContain)
      this.init(this.ruleForm.shop_type)
      this.getInfos(this.ruleForm.goods_url)
    }
  },
  methods: {
    sure () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.getInfos(this.ruleForm.goods_url)
          this.sendMsg()//向父级传参
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    sendMsg(){
      let obj={
            shop_id:this.ruleForm.shop_id,
            active_name:this.ruleForm.active_name,
            goods_url:this.ruleForm.goods_url,
          }
      this.$emit('treasuredInfo', obj);
    },
    getInfos(url){
       fetchGood({ url: url}).then(res => {
            if (res.success) {
              for(let item of this.shopList){
                if(item.id==this.ruleForm.shop_id){
                    this.shop=item.shop_name
                }
              }
              if(this.shop!=res.data.shop_name){
                this.$message.error('请选择正确的店铺！')
              }else{
                  this.isShowEdit = true
                  Bus.$emit('goodInfo', { obj: res.data})
                  let str = ''
                  if (typeof res.data.item_content == 'object') {
                    if (Array.isArray(res.data.item_content.img)) {
                      res.data.item_content.img.forEach(item => {
                        str += `<img src='${item}' style='margin-top:-5px'>`
                      })
                    } else {
                      str = `<img src='${res.data.item_content.img}'>`
                    }
                  } else {
                    str = res.data.item_content
                  }
                  this.setActivityDetail(str)
              }
            
            }else{
              this.$message.error(res.msg)
            }
          }).catch(e => {
            console.log(e)
          })
    },
    //初始化店铺信息
    init (type) {
      getShopInfo({type:type}).then(res => {
        if (res.success) {
          this.shopList = res.data
        } else {
          this.$message.error(res.msg);
        }
      }).catch(e => {
        console.log(e)
      })
    },
    turnAdd(){
      this.$router.push({
        path:'addShop'
      })
    },
    ...mapMutations({
        setActivityDetail: 'SET_ACTIVITY_DETAIL'
    })
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
  }
}
</style>

