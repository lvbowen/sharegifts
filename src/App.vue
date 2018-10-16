<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    methods: {}
  }
</script>

<style scoped lang="less">
  #app {
    min-width: 1000px;
  }

  #app, .main, .left {
    height: 100%;
  }

  .router-box {
    padding: 24px;
    flex: 1;
  }


</style>
