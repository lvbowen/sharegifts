/*
* 新建高返活动第四步
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">4</span>
        <span class="titText">活动周期设置 </span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动时间" prop="value">
          <el-date-picker v-model="ruleForm.value" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width:450px" @change="changeDate(ruleForm.value)">
          </el-date-picker>
          <span>共
            <font color="#E6A23C">{{totalDay}}</font>天 总份数：
            <font color="#E6A23C">{{stock}}</font>
          </span>
          <font color="#E6A23C">{{failReason}}</font>
        </el-form-item>

        <el-form-item label="" prop="title">
          <div class="weekBox">
            <ul>
              <li>日</li>
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
            </ul>
          </div>
          <div class="todoList">
            <ul>
              <li v-for="(i,index) in beforeList" v-if="beforeList&&beforeList.length!=0"></li>
              <li v-for="(j,index) in todoList" v-if="todoList&&todoList.length!=0" class="listL">
                <h3>{{j.date}}</h3>
                <p>发放份数：<input type="text" v-model="j.share" @change="getTotal"></p>
                <p>日转化率：<input type="text" v-model="j.conversion">%</p>
              </li>
              <li v-for="(x,ind) in afterList" v-if="afterList&&afterList.length!=0"></li>
            </ul>
          </div>
        </el-form-item>
        <el-form-item label="">
          <div class="btnBox">
            <el-button type="primary" @click="sure">确认</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import Bus from '@/api/eventBus.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      beforeList: [],
      todoList: [],
      afterList: [],
      nullObj: {},
      week: 0,
      days: 0,
      isShowEdit: false,
      ruleForm: {value: '',},
      fromDate: 1,
      toDate: 15,
      mouths: 1,
      totalDay: 0,
      totalNum: 0,
      failReason:'',
      rules:{
        value:[{ required: true, message: "请选择时间", trigger: 'blur' }],
      }
    }
  },        
  created () {
    let formContain = sessionStorage.getItem('obj')//获取信息
    if (formContain) {
      this.ruleForm = JSON.parse(formContain)
      this.ruleForm.value=[this.formatDate(this.ruleForm.start_time*1000),this.formatDate(this.ruleForm.end_time*1000)],
      this.todoList=JSON.parse(this.ruleForm.active_cycle)
      this.edittodoList(this.ruleForm.value)
    }else{
      this.init();
    } 
  },
  computed: {
      ...mapGetters([
          'stock'
      ])
  },
  watch:{
    'ruleForm':{
      handler(newValue, oldValue) {
　　　　this.sendMsg()
　　　},
　　　deep: true
    },
    totalNum(newValue, oldValue){
      if(this.stock<newValue){
         this.$message.error('设置任务总量不大于设置的库存量')
      }
    },
  },
  methods: {
    changeDate(newold){
      this.beforeList = [];
      this.todoList = [];
      this.afterList = [];
      this.week = this.computerTime(newold).day
      this.days = this.computerTime(newold).num
      this.dealTodoList();
    },
    computerTime (arr) {
      
      if (arr && arr.length == 2) {
        let time1 = new Date(arr[0])
        let time2 = new Date(arr[1])
        let dt=time2 - time1
     
         console.log(dt)
        let day = time1.getDay()//星期
        this.mouths = time1.getMonth() + 1
        this.fromDate = time1.getDate()//从几号开始
        this.toDate = time2.getDate()//从几号结束
        if (dt > 15 * 24 * 60 * 60 * 1000) {
          this.init()
          this.failReason ='活动时长不大于15天！'
          return 
        } else if (dt < 24 * 3600 * 1000) {
          this.init()
          this.failReason = '活动时长不小于1天！'
          return 
        } else {
          let d = Math.floor(dt / (24 * 3600 * 1000))
          this.totalDay = (d + 1)
          this.totalNum = (d + 1)
          return {
            num: d,
            day: day
          }
        }
      }
    },
    edittodoList(newold){
      console.log(this.computerTime(newold))
      this.week = this.computerTime(newold).day
      this.days = this.computerTime(newold).num
       if (this.week == 0) {
        this.beforeList = [];
      } else {
        for (let j = 0; j < this.week; j++) {
          this.beforeList.push(this.nullObj)
        }
      }
      let num = 20 - parseInt(this.week) - parseInt(this.days)
      for (let x = 0; x < num; x++) {
        this.afterList.push(this.nullObj)
      }
    },
    dealTodoList () {
      if (this.week == 0) {
        this.beforeList = [];
      } else {
        for (let j = 0; j < this.week; j++) {
          this.beforeList.push(this.nullObj)
        }
      }
      for (let i = 0; i <= this.days; i++) {
        let obj = { share: 1, conversion: 0, date: 1 }
        obj.date = this.fromDate
        if (this.toDate > 14) {
          this.fromDate++
        } else {
          if (this.mouths == 1 || this.mouths == 3 || this.mouths == 5 || this.mouths == 7 || this.mouths == 8 || this.mouths == 10 || this.mouths == 12) {
            if (this.fromDate > 30) {
              this.fromDate = 0
            }
            this.fromDate++
          } else {
            if (this.fromDate > 29) {
              this.fromDate = 0
            }
            this.fromDate++
          }
        }

        this.todoList.push(obj)
      }
      let num = 20 - parseInt(this.week) - parseInt(this.days)

      for (let x = 0; x < num; x++) {
        this.afterList.push(this.nullObj)
      }
    },
    init () {
      this.beforeList = [];
      this.todoList = [];
      this.afterList = [];
      for (let y = 0; y < 21; y++) {
        this.beforeList.push(this.nullObj)
      }

    },
    getTotal () {
      this.totalNum=0
      for (let j = 0; j < this.todoList.length; j++) {
        this.totalNum += parseInt(this.todoList[j].share)
      }
       if(this.stock<this.totalNum){
          this.$message.error('设置任务总量不大于设置的库存量')
          return
        }
   
    },
    sendMsg(){
       let emitObj={
        start_time:this.ruleForm.value[0],
        end_time:this.ruleForm.value[1],
        active_cycle:this.isString(this.todoList)
      }
      this.$emit('getCycleInfo',emitObj)
    },
    sure () {
       this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.isShowEdit=true
          this.sendMsg()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
    },
        //对传值进行判断
    isString (val) {
      if (typeof (val) == 'string') {
        return val
      } else {
        return JSON.stringify(val)
      }
    },
    formatDate(time){
      let date = new Date(time)
        var year = date.getFullYear(),
            month = date.getMonth()+1,//月份是从0开始的
            day = date.getDate(),
            hour = date.getHours(),
            min = date.getMinutes(),
            sec = date.getSeconds();
        var newTime = year + '-' +
                    (month < 10? '0' + month : month) + '-' +
                    (day < 10? '0' + day : day) + ' ' +
                    (hour < 10? '0' + hour : hour) + ':' +
                    (min < 10? '0' + min : min) + ':' +
                    (sec < 10? '0' + sec : sec);

        return newTime;         
    }

  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.mainBox {
  padding: 20px;
  color: #606266;
  .mianTit {
    height: 44px;
    width: 100%;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: #F4F6F9;
    .editIcon {
      align-items: center;
      line-height: 40px;
      i {
        color: #66bd6a;
      }
    }

    span {
      display: inline;
    }

    .order {
      line-height: 20px;
      font-weight: bold;
      text-align: center;
      margin: 8px 10px 0 20px;
      display: block;
      border: 2px solid #3D95FB;
      height: 25px;
      width: 25px;
      color: #3D95FB;
      border-radius: 12.5px;
      float: left;
    }
    .titText {
      height: 100%;
      line-height: 42px;
    }
  }
  .mainContain {
    border: 1px solid #E4E7ED;
    margin-top: 20px;
    padding:20px;
    .todoList,
    .todoList ul {
      width: 920px;
      li {
        h3 {
          color: #666;
          font-size: 16px;
          height: 45px;
          line-height: 58px;
          text-align: center;
        }
        p {
          font-size: 12px;
          margin-left: 20px;
          input {
            text-indent: 5px;
            width: 32px;
            height: 20px;
            font-size: 14px;
            line-height: 20px;
            border: 1px solid #ddd;
          }
        }
      }
    }
    ul {
      list-style-type: none;
      padding: 0;
      overflow: hidden;
      border-bottom: 1px solid #dddddd;
    }
    li {
      float: left;
      width: 14.28%;
      height: 131px;
      background-color: #efefef;
      border: 1px solid #dddddd;
      border-right: none;
      border-bottom: none;
    }
    .listL {
      background: #fff;
    }
    li:nth-child(7n + 7) {
      border-right: 1px solid #dddddd;
    }
    .weekBox {
      width: 920px;
      .weekItem {
        margin-bottom: 0px;
      }
      ul {
        height: 30px;
        width: 920px;
        li {
          text-align: center;
          background: #f2f2f2;
          height: 30px;
        }
      }
    }
    .btnBox {
      text-align: center;
      margin-top: 20px;
      width:196px;
      height:36px;
      line-height:36px;
      margin:20px auto;
      button{
        width:100%;
      }
    }
    .el-input {
      width: 400px;
    }
  }
}
</style>

