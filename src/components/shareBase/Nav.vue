<template>
  <div>
    <div class="nav">
      <router-link tag="span" to="/goodsManage">商品管理</router-link>
      <router-link tag="span" to="/activityList">活动列表</router-link>
      <router-link tag="span" to="/dealOrder">交易订单</router-link>
      <router-link tag="span" to="/accountBalance">账户余额</router-link>
      <!--<router-link tag="span" to="/aptitude">商家信息</router-link>-->
      <router-link tag="span" to="/agreement">商家协议</router-link>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#409eff" text-color="#fff" active-text-color="#fff" router :default-active="$route.path" width="120" style="margin-left:50px" v-if="isShow">
      <el-submenu index="1">
        <template slot="title">高返</template>
        <el-menu-item index="/addShop">店铺管理</el-menu-item>
        <el-menu-item index="/activity">活动列表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: "Nav",
  data () {
    return {
      active: '/goodsManage',
      isShow: false
    }
  },
  created () {
    this.$store.dispatch('GetUserInfo').then((res) => {
      if (res.success) {
        let now = new Date().getTime()
        let exprice = new Date(res.data.userInfo.expiry_time).getTime()
        this.isShow = exprice > now && res.data.userInfo.edition == 2 ? true : false
      }
    })
  },
  methods: {
    handleSelect (key, keyPath) {

    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
.nav {
  float: left;
  span {
    display: inline-block;
    width: 56px;
    height: 48px;
    line-height: 42px;
    margin-left: 52px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}

.el-menu-demo {
  float: left;
  margin-left: 50px !important;
}

.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}

.el-submenu__title i {
  color: #fff !important;
}
</style>
