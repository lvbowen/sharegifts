<template>
  <div class="main">
    <p>您还未绑定小程序，绑定后再来创建吧!</p>
    <div>
      <img :src="codeUrl" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "BindXCX",
    props: {
      codeUrl: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .main {
    width: 250px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background: #fff;
    p {
      font-size: 14px;
      line-height: 30px;
    }
    div {
      img {
        width: 100%;
        height: 100%;
        background-size: contain;
      }
    }
  }
</style>
