<template>
  <div class="good-set">
    <div class="title ft14 c4 pl24 bgf">
      <h6 class="dib curp" style="font-weight:600" @click="goBack">商品管理</h6>
      <span class="c4"> &gt; 新建商品</span>
    </div>
    <div class="main mt24 bgf plt">
        <h5 class="ft16">选择类目</h5>
        <div class="box clearfix">
          <div class="select fl" style="float:left">
              <ul>
                <li v-for="(x,i) in faData" :key="i" class="c4 curp ft14" @click="firstSelect(x,i)" :class="{'c5':firstIndex==i}">{{x.cate_name}}</li>
              </ul>
          </div>
          <div class="select fl " style="float:left">
              <ul>
                <li v-for="(x,i) in sonData" :key="i" class="c4 curp ft14" @click="secondSelect(x,i)" :class="{'c5':secondIndex==i}">{{x.cate_name}}</li>
              </ul>
          </div>
       
        </div>
        <div class="ft16">
          <span class="c4 ">当前选择的类目：</span>
          <span class="c9"> {{firstEl.cate_name}} &gt; </span>
          <span  class="c9" > {{secondEl.cate_name}} </span>
        </div>
        <el-button class="w65" size="small" type="primary" style="margin-top:44px" @click="save"> 保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      firstIndex:0,
      secondIndex:0,
      firstEl:{
        cate_name:''
      },
      secondEl:{
        cate_name:""
      },
      faData:[],
      sonData:[]
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    //  返回
    goBack(){
      this.$router.push({name:"Good"})
    },
    firstSelect(el,i){
      this.firstIndex =i;
      this.secondIndex =0
      this.firstEl =el;
      this.getSonData(el)
      sessionStorage.removeItem('cateList')
    },
    secondSelect(el,i){
      this.secondIndex = i;
      this.secondEl =el;
    },
    getData(){
      const params ={
        parent_id:0
      };
      this.$post(this.$api.goodCateList,params).then( res=>{
          if(res.code=="000"){
            this.faData =res.data;
            if(sessionStorage.getItem('cateList')&&sessionStorage.getItem('cateList')!="undefined"){
                this.firstEl = JSON.parse(sessionStorage.getItem('cateList')).first;
                this.faData.forEach( (el,i)=>{
                  if(el.cate_name == this.firstEl.cate_name ){
                    this.firstIndex =i;
                    return;
                  }
                } )
             }else{
                this.firstEl =this.faData[0];
             }
            this.getSonData(this.firstEl)
          }
      } )
    },
    getSonData(el){
      const params ={
        parent_id:el.cate_id
      };
      this.$post(this.$api.goodCateList,params).then( res=>{
          if(res.code=="000"){
            this.sonData =res.data
             if(sessionStorage.getItem('cateList')&&sessionStorage.getItem('cateList')!="undefined"){
                this.secondEl = JSON.parse(sessionStorage.getItem('cateList')).second
                this.sonData.forEach( (el,i)=>{
                  if(el.cate_name == this.secondEl.cate_name ){
                    this.secondIndex =i;
                    return;
                  }
                } )
             }else{
                this.secondEl =this.sonData[0];
             }
          }
      } )
    },
    // 保存
    save(){
     var obj ={ first:this.firstEl,second:this.secondEl};
     sessionStorage.setItem('cateList',JSON.stringify(obj))
      this.$router.push( {
        name:"NewGood",
        params:{
          id:this.$route.params.id,
          isEdit:this.$route.params.isEdit||false
        }
      }  )
    }

  },
}
</script>
<style lang="less" scoped>
.title{
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
}
.box{
  margin:40px 0;
  
  .select{
    width: 300px;
    height: 322px;
    border: 1px solid #D9D9D9;
    overflow: hidden;
    overflow-y: auto;
    padding:6px 0 0 0px;
    margin-right: 20px;
    li{
      line-height: 32px;  
      padding-left: 16px;
      &:hover{
        background-color: rgba(92,179,255,0.16);
      }
    }
  }
  
  }
  

</style>


