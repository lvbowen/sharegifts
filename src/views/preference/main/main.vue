<template>
  <div id="main">
    <Header></Header>
    <div class="main df">
      <div class="left bgf">
         <Aside></Aside>
      </div>
      <div class="router-box ">
        <router-view   />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
export default {
  name: 'App',
  components: {
    Header,
    Aside
  },
  created () {
  },
  computed: {
  },
  data(){
    return{

    }
  },
  methods: {



  }
}
</script>

<style scoped lang="less">
#main{
  min-width:1300px;
  // min-width: 1440px;
}

#app,.main,.left{
  height: 100%;
}
.router-box{
  padding:24px;
  flex:1;
}


</style>
