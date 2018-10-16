<template>
  <div class="good-manage ">
    <h4 class="order-top bgf" >商品管理</h4>
    <div class="ft14 c4 intro" style="margin-bottom:10px;padding:20px;background-color:#fef6d4">
        <i class="el-icon-info c5 dib icon-info"></i>
        <h4 class="ft16 dib">说明</h4>
        <span >商品创建后需要申请上架，平台审核通过才在平台展示</span>
    </div>
    <div class="title bgf">
      <div class="ft14 c4 mt32">
        <span>商品名称：</span>
        <el-input v-model="name"  size="small" style="max-width:120px;min-width:120px"></el-input>
        <span class="ml24">商品编码：</span>
        <el-input v-model="order"  size="small" style="max-width:120px;min-width:120px"></el-input>
        <span class="ml24">SKU编码：</span>
        <el-input v-model="sku" size="small" style="max-width:120px;min-width:120px"></el-input>
        <span class="ml24">商品状态：</span>
        <el-select v-model="status" placeholder="请选择"  size="small" style="width:120px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="m5 " style="margin-left:24px" @click="query">查询</el-button>
      </div>
      <div class="ft14 c4" style="margin-top:16px">
        <!-- <span>商品状态：</span>
        <el-select v-model="status" placeholder="请选择"  size="small" style="width:136px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="small" class="m5" @click="query">查询</el-button> -->
      </div>
    </div>
    <div class="main bgf">
      <el-button type="primary" size="small" @click="goNew"> 新建商品</el-button>
      <div class="table">
        <el-table
          :data="tableData.data"
          border
           @sort-change="sort"
          >
          <el-table-column
            prop="title"
            label="商品信息"
            max-width="250"
            min-width="150"
            >
            <template slot-scope="scope">
              <div class="df">
                <img :src="scope.row.main_pic" alt="" style="width:80px;height:80px">
                <div class="ft12 c4"  style="flex:1;margin-left:5px" :title="scope.row.title">{{scope.row.title.substr(0,30)}}{{scope.row.title.length>30?'...':""}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_sn"
            label="商品编码"
           >
          </el-table-column>
          <el-table-column
            prop="outer_price"
            label="商品市场价"
            min-width="120"
           >
          </el-table-column>
          <el-table-column
            prop="inner_price"
            label="平台销价"
           >
          </el-table-column>
          <el-table-column
            prop="rebate_percent"
            label="佣金率"
           >
          </el-table-column>

          <el-table-column
            prop="sale_num"
            label="销量"
            sortable="custom"
           >
          </el-table-column>
            <el-table-column
            prop="rebate_percent"
            label="库存"
           >
          <template slot-scope="scope">
            <span v-if="!scope.row.isShowEdit">{{scope.row.stock_num}}</span>
            <el-input v-model="scope.row.stock_num" style="width:60px" size="small" v-else  @blur="saveEdit(scope.row,scope.$index) " :maxlength="6"> </el-input>
            <i class="el-icon-edit curp" @click="editStock(scope.row,scope.$index)"></i>
          </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态"
            >
          <template slot-scope="scope">
              <span v-if="scope.row.status==0">待审核</span>
              <span v-else-if="scope.row.status==1">下架</span>
              <span v-else-if="scope.row.status==2">待审核</span>
              <span v-else-if="scope.row.status==3">在售</span>
              <span  v-else-if="scope.row.status==4">店铺下架</span>
              <span  v-else-if="scope.row.status==5">平台下架</span>
              <span  v-else-if="scope.row.status==6">拒绝上架</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="address"
            max-width="280"
            min-width="120"
            label="操作">
            <template slot-scope="scope">
              <div class="c5">
                <span class="curp m5" @click="edit(scope.row.id)">编辑</span>
                <span class="curp m5" v-if="scope.row.status==3" @click="unShelve(scope.row.id)" >下架</span>
                <!-- <span class="curp m5" v-if="scope.row.status<2" @click="applyForSale(scope.row.id)">上架</span> -->
                <span class="curp m5" v-if="scope.row.status==4||scope.row.status==5||scope.row.status==6"  @click="applyForSale(scope.row.id)">申请上架</span>
                <span class="curp m5" v-if="scope.row.status==5"  @click="openReason(scope.row.id,1)">下架原因</span>
                <span class="curp m5" @click="openReason(scope.row.id,2)" v-if="scope.row.status==6">拒绝原因</span>
              </div>
            </template>
          </el-table-column>

        </el-table>
      </div>
      <div class="pagination clearfix">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="limit"
            class="fr"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.count">
          </el-pagination>
      </div>
    </div>
    <!-- 修改多规格库存 -->
    <el-dialog
      title="规格库存"
      class="edit-stock"
      :visible.sync="isShowEdit"
     >
      <div class="sku-list">
        <ul>
          <li class="df" style="justify-content:space-between;align-items:center" v-for="(x,index) in skuList" :key="index">
            <p class="goods-sku-title" :title="x.attr_names">{{x.attr_names}}</p>
            <el-input  size="small" style="width:120px" v-model="x.stock_num" :maxlength="6"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveMoreSku">确 定</el-button>
      </span>
    </el-dialog>
    <Auditing></Auditing>
  </div>
</template>

<script>
import  Auditing  from "@/components/Auditing";

export default {
  data () {
    return {
        tableData:{
          data:[]
        },
        page:1,
        limit:10,
        name:"",
        order:"",
        sku:'',
        status:"",
        options:[
          {value:"",label:"全部"},
          // {value:"1",label:"上架中"},
          {value:"2",label:"待审核"},
          {value:"3",label:"在售"},
          {value:"4",label:"店铺下架"},
          {value:"5",label:"平台下架"},
          {value:"6",label:"拒绝上架"},
        ],
        isShowEdit:false,
        skuList:[],//sku列表
        editObj:{}//要修改的库存
    }
  },
  mounted () {
    this.getList();

  },
  methods: {
    // 分页
    handleCurrentChange(page){
      this.page =page;
      this.getList();
    },
    handleSizeChange(lim){
      this.limit =lim;
      this.getList();
    },
    query(){
      this.getList()
    },
    // 获取列表数据
    getList(type){
      var url =this.$api.goodsList,
          params={
            limit:this.limit,
            page:this.page,
            name:this.name,
            goods_sn:this.order,
            sku_sn:this.sku,
            status:this.status,
          };
          params.order_type= type||''

      this.$post(url,params).then( res=>{
          if(res.code=='000'){
          res.data.length!=0&&res.data.data.forEach(el => {
               el.isShowEdit=false;
               el.editStock="";
             });
            this.tableData  = res.data;
          }
      } )

    },
    // 申请上架
    applyForSale(id){
      this.$post(this.$api.applyForSale,{id:id}).then( res=>{
        this.$message.success( res.msg );
        this.getList()
      } )
    },
    //下架
    unShelve(id){
      this.$post(this.$api.unShelve,{id:id}).then( res=>{
          this.$message.success( res.msg );
          this.getList()

      } )
    },
    // 失败原因
    openReason(id,type){
      var title,url;
      if(type==1){
        url=this.$api.getShelveReason;
        title = "下架原因"
      }else{
        url=this.$api.getRefuseReason;
        title ="拒绝原因"
      }
      this.$post(url,{id:id}).then( res=>{
          if(res.code=="000"){
            this.$alert(res.data.msg, title, {
              confirmButtonText: '确定',
              // callback: action => {
              //     this.$router.push({name: 'Aptitude'});
              // }
            });
          }

      } )


    },
    // 新建商品
    goNew(){
      this.$router.push( {
        name:"GoodSet",
      })
      sessionStorage.clear();
    },
    // 编辑
    edit(id){
      this.$router.push( {
        name:"NewGood",
        params:{
          obj:"",
          id:id
        }
      })
    },
    // 更改库存
    editStock(obj,index){
      this.editObj =obj
      if(obj.sku_type==1){
        this.tableData.data[index].isShowEdit =true;
      }else{
        this.isShowEdit =true;
        this.$post( this.$api.skuList,{goods_id:obj.id} ).then( res=>{
            if(res.code=="000"){
              this.skuList =res.data
            }
        } )
      }
    },
    // 保存编辑单规格的库存
    saveEdit(obj,index){
      if(!obj.stock_num||!this.$reg.IntegerZ.test(obj.stock_num)||obj.stock_num<=0){
        this.$message.error('库存不能为空或零且必须是整数')
        return;
      }
      // 保存编辑
        this.tableData.data[index].isShowEdit =false;
        var params ={
          stock_json:JSON.stringify( [ { sku_id:obj.id,stock_num:obj.stock_num} ] ),
          goods_id:obj.id,
          sku_type:1
        };
        this.$post(this.$api.updateStock,params ).then( res=>{
          if(res.code=="000"){
            this.$message.success(res.msg)
            this.getList();
          }
        } )

    },
    //保存多规格的 库存修改
    saveMoreSku(){
      var flag =false;
      this.skuList.forEach(el=>{
        if( !this.$reg.IntegerZ.test(el.stock_num) ){
          flag =true;
          return false;
        }
      });
      if(flag) {
        this.$message.error("库存不能为空或零且必须是正整数");
        return;
      };
      var params={
        sku_type:2,
        goods_id:this.editObj.id,
        stock_json:JSON.stringify(this.skuList)
      }
      this.$post(this.$api.updateStock, params).then(res=>{
        if(res.code=="000"){
          this.$message.success(res.msg);
          this.isShowEdit =false;
          this.getList();
        }
      })
    },
    sort(state){
     let type =  state.order=="descending"?1:2;
      this.getList(type)
    }
  },
  components: {
    Auditing
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.order-top{
  height: 40px;
  background-color: #fff;
  margin-bottom: 10px;
  padding:10px;
}
.title{
  // height: 175px;
  padding:1px 24px;
  .icon-info{
    font-size: 24px;
    vertical-align: middle;
  }
  .intro{
    h4{
      margin-bottom: 4px;
    }
    p{
      line-height: 22px;
    }
  }
}
.main{
  padding:16px 22px 24px 32px;
  margin:10px  0 24px;
  margin-bottom: 40px;

  .top{
    height: 40px;
    background-color:rgba(92,179,255,0.1);
    border:1px solid rgba(92,179,255,0.32);
    border-radius: 5px;
    padding-left:24px;
    p{
      font-family:'PingFangSC-Regular';
      color:rgba(0,0,0,0.65);
      line-height: 40px;
    }
  }
  .table{
    margin-top:16px;
    &/deep/.el-table--border th{
        border-right: 0;
      }
    &/deep/.el-table--border td{
      border-right: 0;
    }

  }
  .pagination{
    margin-top:24px;
  }

}
.m5{
  margin:0 5px;
}
.edit-stock/deep/.el-dialog{
  width: 430px;
  .el-dialog__body{
    padding:10px 20px;
  }
  .sku-list{
    max-height: 300px;
    overflow: hidden;
    overflow-y: auto;
    padding:0 10px;
    li{
      margin: 5px 0;
    }
  }
  .goods-sku-title{
    width: 230px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
}
.ellipsis{
  position:relative;
  line-height:1.4em;
  /* 3 times the line-height to show 3 lines */
  height:4.2em;
  overflow:hidden;
  &::after{
    content:"...";
    font-weight:bold;
    position:absolute;
    bottom:0;
    right:0;
    padding:0 20px 1px 45px;
    background:url(http://css88.b0.upaiyun.com/css88/2014/09/ellipsis_bg.png) repeat-y;
  }
}


</style>
