<template>
  <div class="transaction-order">
    <h4 class="top">交易订单</h4>

    <div class="title ft14 c4  tab">
      <el-tabs v-model="activeName" class="bgf">
        <el-tab-pane label="待付款" name="1010">
         <pendingPay :status="activeName" v-if="activeName=='1010'"></pendingPay>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="2020">
         <pendingPay :status="activeName"  v-if="activeName=='2020'"></pendingPay>
        </el-tab-pane>
        <el-tab-pane label="已发货" name="2030">
         <pendingPay :status="activeName"  v-if="activeName=='2030'"></pendingPay>
        </el-tab-pane>
        <el-tab-pane label="交易完成" name="6030">
         <pendingPay :status="activeName"  v-if="activeName=='6030'"></pendingPay>
        </el-tab-pane>
        <el-tab-pane label="交易关闭" name="5000">
         <pendingPay :status="activeName"  v-if="activeName=='5000'"></pendingPay>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Auditing></Auditing>
  </div>
</template>
<script>
import  pendingPay  from "./pendingPay";
import  Auditing  from "@/components/Auditing";

export default {
  data(){
    return{
      activeName:"1010",
    }
  },
  components: {
    pendingPay,
    Auditing,
  }
}
</script>
<style lang="less" scoped>

.title{
  border-radius: 4px;
  margin-bottom:40px;

}
.tab/deep/.el-tabs__header{
  margin:0;
  padding-left: 24px;
}
.transaction-order/deep/.el-tabs__nav-wrap::after{
  height: 1px;
}
.top{
  height: 40px;
  background-color: #fff;
  margin-bottom: 20px;
  padding:10px;
}
</style>


