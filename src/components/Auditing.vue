<template>
  <div>
    <div class="mask" v-if="isShowMask">
    </div>
    <div class="bomb" v-if="isShowMask">
       <!-- <i class="el-icon-close fr curp"></i> -->
       <h4 class="c1 ft16" style="font-weight:700">资质完善  </h4>
       <p class="c1 ft14 " style="margin-top:20px">为了更好的帮助商户盈利，请先完善商户信息</p>
       <el-button size="small" type="primary" class="fr" style="margin-top:40px" @click="goAptitude">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMask:false
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    goAptitude() {
       this.isShowMask=false
        this.$router.push({
          name:"Aptitude"
        })
      },
    getUserInfo(){
      this.$get(this.$api.getUserInfo,{}).then( res=>{
        if(res.code=="000"){
          if(res.data.is_credential!=2){
              this.isShowMask =true
          }
        }
      } )
    }
  }
  }

</script>
<style lang="less" scoped>
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.3);
    top:0;
    left:0;
    z-index: 9999;
  }
  .bomb{
     position: fixed;
      width: 350px;
      height: 185px;
      background-color: #fff;
      border-radius: 10px;
      top:40%;
      left: 50%;
      transform: translate(-50%);
      z-index: 99991;
      padding:20px;

  }
</style>


