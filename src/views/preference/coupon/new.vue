<template>
  <div>
    <div class="title ft14 c4 pl24 bgf">
      <h6 class="dib curp" style="font-weight:500" @click="goBack">优惠券管理</h6>
      <span> &gt; 新建优惠券</span>
    </div>
    <div class="main ft14 bgf mt24">
      <div>
        <span> <span class="cf">★</span> 优惠券名称：</span>
        <el-input v-model="name" placeholder="请输入" size="small" style="width:468px"></el-input>
      </div>
      <div style="line-height:102px">
        <span >&nbsp;&nbsp;&nbsp;<span class="cf">★</span> 减免金额：</span>
        <el-input v-model="reduce" placeholder="请输入" size="small" style="width:240px"></el-input>
        <span>元</span>
      </div>
      <div >
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="cf">★</span> 有效期：</span>
        <span>领取后立即生效，有效天数</span>
        <el-select v-model="day" placeholder="请选择" style="width:88px" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small" style="margin-left:96px" class="w65 mt32" > 保存</el-button>
      <p class="ft14 c9" style="margin-left:96px;margin-top:56px">注：创建优惠券后需要在商品中选择使用</p>

    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      name:'',
      reduce:"",
      options:[],
      day:1
    }
  },
  mounted () {
    for(var i =0;i<7;i++){
      this.options.push( { value:i+1,label: i+1+"天" } )
    }
  },
  methods: {
    goBack(){
      this.$router.push( {name:"Coupon"} )
    }
  }
}
</script>
<style lang="less" scoped>
.title{
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
}
.main{
  padding: 40px 0 40px 314px
}
</style>


