<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/shareBase/Header'

  export default {
    name: "HomePage",
    components: {
      Header
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .container {
    background: rgba(244, 246, 249, 1);
    .main {
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(244, 246, 249, 1);
    }
  }
</style>