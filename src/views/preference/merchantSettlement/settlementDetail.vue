<template>
  <div class="settlement-detail w100">
    <div class="title bgf w100 ">
        <div class="ft14" style="line-height:48px"> 
          <h5 class="dib curp" style="font-weight:500" @click="goBack">商户结算</h5>
          <span class="c4"> &gt; 查看详情</span>
        </div>
      <div class="ft14 c4 intro" style="line-height:80px">
        <span>卖家手机：</span>
        <el-input v-model="tel" placeholder="请输入" size="small" style="width:272px"></el-input>
        <span class="ml24">订单号：</span>
        <el-input v-model="order" placeholder="请输入" size="small" style="width:272px"></el-input>
        <el-button type="primary" size="small" style="width:65px " class="ml24" @click="getList">查询</el-button>
      </div>
    </div>
    <div class="main bgf">
      <div class="top c0 ft14">
          <p >
           共计：{{tableData.count}}笔订单，结算金额{{tableData.sum_money}}元
          <a href="javascript:;" @click="exportData" class="c5" style="margin-top:-4px">导出详情</a>
          </p>
      </div>
      <div class="table"> 
        <el-table
          :data="tableData.data"
          border
          style="width: 100%">
          <el-table-column
            prop="ext_tid"
            label="订单编号"
            max-width="200">
          </el-table-column>
          <el-table-column
            prop="trade_time"
            label="交易完成时间"
             max-width="200">
          </el-table-column>
          <el-table-column
            prop="receiver_phone"
              max-width="240"
            label="收货人手机">
          </el-table-column>
          <!-- <el-table-column
            prop="pay_amount"
              max-width="240"
            label="实付金额">
          </el-table-column> -->
          <el-table-column
            prop="price_amount"
            max-width="240"
            label="售价">
          </el-table-column>
          <el-table-column
            prop="commision_amount"
              max-width="240"
            label="出佣">
          </el-table-column>
           <!-- <el-table-column
            prop="coupon_amount"
              max-width="240"
            label="平台优惠">
          </el-table-column> -->
          <el-table-column
            prop="charge_amount"
              max-width="240"
            label="微信手续费">
          </el-table-column>
           <el-table-column
            prop="balance"
            label="结算金额"
           >
          </el-table-column>
         
        </el-table>
      </div>
      <div class="pagination clearfix" v-show="tableData.count!=0">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          class="fr"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+tableData.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData:{},
        page:1,
        limit:10,
        tel:"",
        order:"",
        year:'',
        month:"",
        time:''

    }
  },
  mounted () {
    
    this.year = this.$route.query.year;
    this.month =this.$route.query.month;
    this.time = this.$route.query.time;
    this.getList();
  },
  methods: {
    // 分页
    handleCurrentChange(page){
      this.getList();
    },
    handleSizeChange(lim){
      this.limit =lim;
      this.getList();
    },
    // 获取列表数据
    getList(){
      var url =this.$api.merchantDetail,
          params={
            limit:this.limit,
            page:this.page,
            phone:this.tel,
            ext:this.order,
            year:this.year,
            month:parseInt(this.month),
            balance_time:this.time
          };
      this.$post(url,params).then( res=>{
        if(res.code=="000"){
          this.tableData =res.data
        }
      } )
          
    },
    // 返回商品结算
    goBack(){
      this.$router.push({name: 'Merchant'});
    },
    // 导出
    exportData(){
      var params={
        year:this.year,
        month:parseInt(this.month)
      }
      this.$post(this.$api.exportDetail,params,"",true).then( res=>{
        let data =res.config.data
        let url =res.config.url
        let token = res.config.headers.token;
        window.location.href =url+"?token="+token+"&"+data
      } )
    },
   
 
  },
  computed: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.title{
  height: 128px;
  padding:0px 0 0 24px;
  .icon-info{
    font-size: 24px;
    vertical-align: middle;
  }
  .intro{
    p{
      line-height: 22px;
    }
  }
}
.main{
  padding:24px 22px 24px 32px;
  margin-top:24px;
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
    margin-top:24px;
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
.ml24{
  margin-left: 24px;
}
</style>
