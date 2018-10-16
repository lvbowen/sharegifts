<template>
  <div id="dash">
    <Header :title="title"></Header>
    <div class="server">
      <h2 class="title">营销服务</h2>
      <div class="wrapper">
        <div class="logo aiju">
          <img src="@/assets/image/aiju.png" alt="">
        </div>
        <div class="container aiju">
          <div class="desc">精选好物特卖平台</div>
          <div @click="toyuoxuan" class="path">前往后台</div>
        </div>
      </div>
      <div class="wrapper sharegifts">
        <div class="logo sharegifts">
          <img src="@/assets/image/xfs.png" alt="">
        </div>
        <div class="container sharegifts">
          <div class="desc">商品推广，新品试用平台</div>
          <router-link tag="div" class="path" to="/homePage">前往后台</router-link>
        </div>
      </div>
    </div>
    <!--<div class="assembly">-->
    <!--<h2 class="title">通用组件</h2>-->
    <!--<div class="info">-->
    <!--<img class="icon" src="" alt="">-->
    <!--<span class="title" @click="toBusinessInfo">商家信息</span>-->
    <!--</div>-->
    <!--<div class="info">-->
    <!--<img class="icon" src="" alt="">-->
    <!--<span class="title" @click="toAgreeMent">商家协议</span>-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
  import Header from '@/components/shareBase/Header'
  import {getUserInfo} from '@/api/user'
  import {toaiju} from '@/api/toaiju'

  export default {
    data() {
      return {
        title: '商户后台'
      }
    },
    created() {
      getUserInfo().then(res => {
      })
    },
    methods: {
      toBusinessInfo() {
        this.$router.push({
          name: 'Aptitude'
        })
      },
      toAgreeMent() {
        this.$router.push({
          name: 'Agreement'
        })
      },
      toyuoxuan() {
        toaiju().then(res => {
          if (res.code == '000') {
            window.location.href = res.data.url
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    components: {
      Header
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .header {
    height: 50px;
    line-height: 50px;
    background: #5AA2E7;
    .left {
      float: left;
      height: 50px;
      margin-left: 30px;
      .logo {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: rgba(255, 255, 255, 1);
      }
      .desc {
        display: inline-block;
        height: 20px;
        font-size: 22px;
        font-family: FZZZHONGJW--GB1-0;
        font-weight: 400;
        color: rgba(253, 253, 253, 1);
        line-height: 14px;
      }
    }
    .right {
      float: right;
      margin-right: 30px;
      .avatar {
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: #fff;
      }
      .userName {
        display: inline-block;
        width: 27px;
        height: 14px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
      }
    }
  }

  .server, .assembly {
    width: 1000px;
    height: 314px;
    margin: 20px auto;
    padding-top: 28px;
    padding-left: 20px;
    background: rgba(255, 255, 255, 1);
    .title {
      width: 64px;
      height: 16px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(26, 45, 62, 1);
      line-height: 14px;
    }
    .wrapper {
      float: left;
      width: 200px;
      height: 185px;
      margin-top: 21px;
      margin-left: 30px;
      background: rgba(247, 252, 255, 1);
      &.sharegifts {
        margin-left: 36px;
      }
      .logo {
        width: 200px;
        height: 114px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container {
        .title {
          width: 64px;
          height: 17px;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: #333A3E;
          line-height: 14px;
        }
        .desc {
          width: 154px;
          height: 15px;
          margin-top: 11px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(167, 177, 188, 1);
          line-height: 20px;
        }
        .path {
          width: 200px;
          height: 32px;
          margin-top: 20px;
          font-size: 14px;
          text-align: center;
          line-height: 29px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(90, 162, 231, 1);
          border: 1px solid #409EFF;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
    .info {
      float: left;
      width: 148px;
      height: 50px;
      margin-top: 14px;
      line-height: 50px;
      background: rgba(255, 255, 255, 1);
      border-radius: 6px;
      .icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-left: 27px;
        background: red;
      }
      .title {
        width: 57px;
        height: 14px;
        margin-left: 10px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
        cursor: pointer;
      }
    }
  }
</style>

