<template>
  <div class="app-container">
    <div class="app-header">交易订单</div>
    <div class="app-main">
      <div class="search-bar">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待付款" name="1010">
            <pendingPay :status="activeName" v-if="activeName=='1010'"></pendingPay>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="2020">
            <pendingPay :status="activeName" v-if="activeName=='2020'"></pendingPay>
          </el-tab-pane>
          <el-tab-pane label="已发货" name="2030">
            <pendingPay :status="activeName" v-if="activeName=='2030'"></pendingPay>
          </el-tab-pane>
          <el-tab-pane label="交易关闭" name="5000">
            <pendingPay :status="activeName" v-if="activeName=='5000'"></pendingPay>
          </el-tab-pane>
          <el-tab-pane label="交易完成" name="6030">
            <pendingPay :status="activeName" v-if="activeName=='6030'"></pendingPay>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pendingPay from './pendingPay'

  export default {
    name: "DealOrder",
    data() {
      return {
        activeName: '1010'
      }
    },
    created() {
      // this.$store.dispatch('GetUserInfo').then(res => {
      //   let isCredential = res.data.is_credential
      //   if (isCredential != '2') {
      //     this.$router.push('/aptitude')
      //     this.$message.warning('请先完善商家信息!')
      //   }
      // })
    },
    methods: {
      handleClick(tab, event) {
      }
    },
    components: {
      pendingPay
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .app-container {
    .app-header {
      width: calc(100% - 20px * 2);
      margin: 20px;
    }
    .app-main {
      position: absolute;
      top: 80px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      overflow: auto;
      .search-bar {
        &.search {
          padding-top: 20px;
        }
      }
    }
  }

</style>
