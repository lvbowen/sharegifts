/*
* 添加高返活动
* creater：gaoyue
 */
<template>
  <div class="addActivity details">
    <div class="tit">
      <p>高返 / <span @click="goBack">活动列表</span> / {{text}} </p>
    </div>
    <div class="containers">
      <div class="innerContainer" v-show="firstStep">
        <div class="intrusion">
          <div class="intruBox">
            <div class="left iconBox">
              <i class="el-icon-info"></i>
            </div>
            <div class="left">
              <p>1、活动创建后需要申请发布，平台审核通过后才在平台展示</p>
              <p>2、 创建活动时，返现金额需冻结在该平台</p>
            </div>
          </div>
        </div>
        <Firststep @platForm="getPlat"></Firststep>
        <Secondstep @treasuredInfo="getTreasured"></Secondstep>
        <Thirdstep @treasuredInfo="getInfos"></Thirdstep>
        <Fourstep @getCycleInfo="CycleInfo"></Fourstep>
        <Fivestep @getfiveParams="fiveParams"></Fivestep>

      </div>
      <div class="innerContainer" v-show="!firstStep">
        <Freeserver @treasuredInfo='freeParams'></Freeserver>
        <div class="submitBOX">
          <el-button type="primary" @click="firstStep = true">上一页</el-button>
          <el-button type="primary" @click="aubmitInfo">提交</el-button>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Firststep from '@/components/scrm/FirstStep'
import Secondstep from '@/components/scrm/SecondStep'
import Thirdstep from '@/components/scrm/ThirdStep'
import Fourstep from '@/components/scrm/FourStep'
import Fivestep from '@/components/scrm/FiveStep'
import Freeserver from '@/components/scrm/freeServer'
import { addAcityList } from '@/api/scrm/activity'
import {mapGetters} from 'vuex'
export default {
  name: "HomePage",
  components: {
    Firststep,
    Secondstep,
    Thirdstep,
    Fourstep,
    Fivestep,
    Freeserver
  },
  data () {
    return {
      firstStep: true,//是否显示第一步
      params: {},
      firstObj: {},
      secondObj: {},
      thirdObj: {},
      fourObj: {},
      fiveObj: {},
      freeObj: {},
      text:''
    }

  },
  created(){
    this.text=this.$route.query.name
  },
  methods: {
    //第一步
    getPlat (val) {
      this.firstObj = val
    },
    //第二步
    getTreasured (val) {
      this.secondObj = val
    },
    changeShow (val) {
      this.firstStep = val
    },
    //第三步
    getInfos (val) {
      this.thirdObj = val
    },
    //第四步
    CycleInfo (val) {
      this.fourObj = val
    },
    //第五步
    fiveParams (val) {
      this.fiveObj = val.obj
      if(val.first==false){
        this.firstStep = false
      }
    },
    //免费服务
    freeParams (val) {
      this.freeObj = val
    },
     goBack(){
       this.$router.push({
        name: 'Activity',
      })
    },
    aubmitInfo () {
      if(sessionStorage.getItem('obj')){
        let id= JSON.parse(sessionStorage.getItem('obj')).id
        Object.assign(this.params, this.firstObj, this.secondObj, this.thirdObj, this.fourObj, this.fiveObj, this.freeObj,{active_id:id});
      }else{
        Object.assign(this.params, this.firstObj, this.secondObj, this.thirdObj, this.fourObj, this.fiveObj, this.freeObj);
      }
      addAcityList(this.params).then(res => {

        if(res.success){
          this.$message.success(res.msg);
          this.$router.push({
            path:'/activity'
          })
        }else if(res.code==10008){
          this.$message.error(res.msg);
          setTimeout(()=>{
            this.$router.push({
              path:'/accountBalance'
            },3000)
          })
         
        }else{
          this.$message.error(res.msg);
        }
      })
    },
  }
}

</script>
<style lang="less" rel="stylesheet/less" scoped>
.details {
  position: relative;
  height: 100%;
  width: 100%;
}
.tit {
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  font-size: 14px;
  margin: 20px 0;
  padding: 0 40px;
  position: absolute;
  box-sizing: border-box;
  z-index:99;
}
.tit p {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 0 20px;
  box-shadow: 0px 1px 0px 0px rgba(209, 219, 229, 1);
  span{
    cursor: pointer;
    color:#409EFF
  }
}
.containers {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 80px 40px 40px;
  box-sizing: border-box;
}
.innerContainer {
  height: 100%;
  background: #fff;
  overflow-y: scroll;
}
.left {
  float: left;
}
.intrusion {
  width: 100%;
  padding: 15px;
  .intruBox {
    background: #eaf4fe;
    border: 1px solid #dcecfd;
    overflow: hidden;
    padding: 15px;
    .iconBox {
      line-height: 42px;
      font-size: 30px;
      margin-right: 20px;
      color: #409eff;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
.btnBox {
  text-align: center;
  margin-top: 20px;
  width: 196px;
  height: 36px;
  line-height: 36px;
  margin: 20px auto;
  button {
    width: 100%;
  }
}
.submitBOX {
  text-align: center;
  margin: 20px auto;
}
</style>
