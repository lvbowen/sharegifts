<template>
  <div>
    <header class="df">
     <div >
        <img src="https://youxuan.ecbao.cn/default/1532783129549_30.png" alt="" @click="back">
        <!-- <span class="ft14 cff">爱聚优选 商家后台</span> -->
     </div>
     <div class="user">
      <span class="ft14 cff">{{username}}</span>
     </div>
    </header>
  </div>
</template>
<script>
export default {
  data(){
    return{
      username:""
    }
  },
  created () {
     this.getUserInfo()
  },
  methods: {
    getUserInfo(){
      this.$get(this.$api.getUserInfo,{}).then( res=>{
        if(res.code=="000"){
          this.username =res.data.username;
        }
      } )
    },
    back(){
      this.$router.push({
        name: 'Dashboard'
      })
    } 
  }
}
</script>

<style lang="less" scoped>
header{
  height: 56px;
  width: 100%;
  background-color: #5CB3FF;
  padding:0 24px;
  justify-content: space-between;
  line-height: 56px;
  img{
    height: 24px;
    cursor: pointer;
  }
  .user{
    img{
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}

</style>
