<template>
  <div class="header">
    <div class="left">
      <span @click="goDashBoard" class="desc" ><img src="@/assets/image/xfslogo.png" alt=""></span>
      <!--<span class="desc" @click="goDashBoard">{{title}}</span>-->
    </div>
    <div class="left" v-show="title=='小福社'">
      <Nav></Nav>
    </div>
    <div class="right">
      <img class="avatar" :src="avatar" alt="">
      <span class="userName">{{userName}}<span v-show="nickName">({{nickName}})</span></span>
      <span class="laylout" @click="layout">退出登录</span>
    </div>
  </div>
</template>

<script>
  import Nav from '@/components/shareBase/Nav'
  import {mapGetters} from 'vuex'

  export default {
    name: "Header",
    props: {
      title: {
        type: String,
        default: '小福社'
      }
    },
    computed: {
      ...mapGetters(['userName', 'avatar', 'nickName'])
    },
    methods: {
      goDashBoard() {
        this.$router.push({
          name: 'Dashboard'
        })
      },
      layout() {
        this.$store.dispatch('FedLogOut').then(() => {
          location.reload()
        })
      }
    },
    components: {
      Nav
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .header {
    height: 50px;
    line-height: 50px;
    background: #409EFF;
    .left {
      float: left;
      height: 50px;
      margin-left: 30px;
      .desc {
        display: inline-block;
        height: 26px;
        font-family: FZZZHONGJW--GB1-0;
        font-size: 22px;
        font-weight: 400;
        color: rgba(253, 253, 253, 1);
        line-height: 14px;
        cursor: pointer;
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
        height: 14px;
        margin-right: 15px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
      }
      .laylout {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
  }
</style>
