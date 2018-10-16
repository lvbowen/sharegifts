/*
* 新建高返活动第一步
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">1</span>
        <span class="titText">设置活动类型</span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="平台类型" prop="shop_type">
          <el-radio-group v-model="ruleForm.shop_type" @input="getshop(ruleForm.shop_type)">
            <el-radio label="1">淘宝/天猫</el-radio>
            <el-radio label="2">京东</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动类型">
          <p>爆款打造/高返</p>
          <h4>快速提升关键词排名/加购率/多天回访率/全维度UV价值</h4>
          <div class="rules">
            <dl>
              <dt class="tits">适合店铺类型：</dt>
              <dt>1、有一定销量/流量的店铺</dt>
              <dt>2、店铺人群标签混乱</dt>
              <dt>3、日常宝贝转化率低于行业均值</dt>
              <dt>4、排名不稳定</dt>
            </dl>
            <dl>
              <dt class="tits">效果建议投放单期总份数：</dt>
              <dt class="high">1、小于50元客单（0-50元）≥30份</dt>
              <dt class="high">2、50-100元客单≥25份</dt>
              <dt class="high">3、100-300元客单≥20份</dt>
              <dt class="high">4、高于300元客单≥15份</dt>
            </dl>
            <dl>
              <dt class="tits">提升权重建议：</dt>
              <dt>1、建议不低于2期，每期5-10天，数据统计95％成功案例连续投放</dt>
              <dt>2、
                <span class="high">4-6</span>周期完成爆款高返的打造和稳定</dt>
            </dl>
          </div>
          <div>
            <span>任务开奖时间：</span>
            <span>每日
              <font color="#E6A23C">21</font>点开奖。</span>
          </div>
          <div>
            <span>买家申请流程：</span>
            <span>1、根据商家活动类型的不同，买家分1-6天申请。完成浏览、加购、收藏/关注店铺 宝贝、深度访问、货比多家、浏览副宝贝、手淘问大家等操作后，才能获得购买资格</span><br>
            <span class="tips" style="margin-left:100px;">2、快速稳定优化商品权重。</span>
          </div>
          <div class="btnBox">
            <el-button type="primary" @click="sure">确认</el-button>
          </div>

        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getShopInfo } from "@/api/scrm/shopManage"
import Bus from '@/api/eventBus.js'
export default {
  data () {
    return {
      isShowEdit: false,
      ruleForm: {},
      rules: {
        shop_type: [{ required: true, message: "请选择平台类型", trigger: 'change' }]
      },
      shopList: []
    }
  },
  watch:{
    'ruleForm':{
      handler(newValue, oldValue) {
　　　　this.$emit('platForm', newValue )　　
　　　},
　　　deep: true
    }
  },
  created () {
    let formContain = sessionStorage.getItem('obj')//获取信息
    if (formContain) {
      this.ruleForm = JSON.parse(formContain)
    }
  },
  methods: {
    sure () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isShowEdit = true
          this.$emit('platForm', {shop_type:this.ruleForm.shop_type});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getshop (type) {
      getShopInfo({ type: type }).then(res => {
        if (res.success) {
          this.shopList = res.data
          Bus.$emit('shopList', this.shopList)
          this.$emit('platForm', {shop_type:this.ruleForm.shop_type})
        }
      })
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
    p {
      color: #606266;
    }
    h4 {
      color: #303133;
    }
    .rules {
      display: flex;
      padding-bottom: 20px;
      margin-bottom: 30px;
      border-bottom: 1px dashed #ccc;
      dl {
        flex: 1;
        color: #606266;
        .tits {
          color: #303133;
        }
        .high {
          color: #e6a23c;
        }
      }
    }
  }
}
</style>

