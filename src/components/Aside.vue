<template>
  <div>
    <aside class="bgf left" style="min-height:800px">
      <el-col :span="12" style="width:100%" >
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          style="border:0"
          :router="true"
          @close="handleClose">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu> -->
          <el-menu-item :index="x.path" v-for=" (x,index) in arr" :key="index">
            <i class="iconfont" :class="x.icon" style="font-size:24px"></i>
            <span slot="title" style="font-size:16px">{{x.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </aside>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // order
      defaultActive:'/aptitude',
      arr:[
        // {name:"首页"},
        {name:"商品管理",path:"/good",icon:'icon-pingtaizaishoushangpin'},
        {name:"交易订单",path:"/order",icon:'icon-jiaoyidingdan'},
        {name:"商户结算",path:"/merchant",icon:'icon-shanghujiesuan'},
        // {name:"优惠券管理",path:"coupon"},
        // {name:"商家信息",path:"/aptitude",icon:'icon-shanghuzizhishenhe'},
        // {name:"商家协议",path:"/rule",icon:'icon-pingtailaxinzhichu'},

      ],
    }
  },
  methods: {
    handleOpen(){

    },
    handleClose(){

    },

  },
  created () {
    this.defaultActive = sessionStorage.getItem('path')||'/aptitude'
  },
  watch: {
    $route(to, form) {
      for (let index = 0; index < this.arr.length; index++) {
          const element = this.arr[index];
          if(to.path==element.path){
            this.defaultActive =  to.path
            sessionStorage.setItem('path',to.path)
          }

      }
    }
  },

}
</script>

<style lang="less" scoped>
aside{
  width: 208px;
  height: 100%;
  padding:7px 0  0 0px;
  box-sizing: border-box;
}
.li{
  height: 40px;
  line-height: 40px;
  &:hover{
    background-color: #DCDFE6;
  }
}
li.active{
    background-color:rgba(92,179,255,0.16);
}
.active a{
  color:#5CB3FF !important;
}

.route{
  width: 100%;
  height: 100%;
  padding-left:24px;
  i{
    font-size: 24px;
    margin-right: 10px;
    vertical-align: middle
  }
}


</style>
