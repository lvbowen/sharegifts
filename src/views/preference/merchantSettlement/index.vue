<template>
  <div class="good-settlement w100">
    <h4 class="order-top bgf">商户结算</h4>

    <div class="title bgf w100 df" style="background-color:#fef6d4">
      <i class="el-icon-info c5 dib icon-info"></i>
      <div class="ft14 c4 intro" >
          <h4 class="ft16">说明</h4>
          <p >1、当月5日结算上月5日至上月20日之间确认收货的订单；</p>
          <p>2、当月20日结算上月20日至当月5日之间确认收货的订单：</p>
      </div>
    </div>
    <div class="main bgf">
      <div class="top c0 ft14">
          <p >
            本月预估收入：{{tableData.sum_money}}元（待结算）
              <el-button @click="goDetail({},1)" size="small" type="text">查看详情</el-button>
            <!-- <router-link :to="{ name: 'SettlementDetail', params: { id:  }}" class="c5">查看详情</router-link> -->
          </p>
      </div>
      <div class="table">
        <el-table
          :data="tableData.list"
          border
          style="width: 100%">
          <el-table-column
            prop="month"
            label="日期"
            align="center"

          >
          <template slot-scope="scope">
            {{scope.row.year}}年 {{scope.row.month}}月 {{scope.row.day}}日
          </template>
          </el-table-column>
          <el-table-column
            prop="money"
            label="结算收入"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="address"
            align="center"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="goDetail(scope.row)" size="small" type="text">查看详情</el-button>
              <!-- <router-link :to="{ name: 'SettlementDetail', params: { id: scope.row.year+','+scope.row.month }}" class="c5"></router-link> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination clearfix" v-show="tableData.count!=0">
        <el-pagination
          small
          @current-change="handleCurrentChange"
          class="fr"
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="+tableData.count">
        </el-pagination>
      </div>
    </div>
    <Auditing></Auditing>
  </div>
</template>

<script>
import  Auditing  from "@/components/Auditing";

export default {
  data () {
    return {
      tableData:{
      },
      page:1,

    }
  },
  mounted () {
      this.getList();

  },
  methods: {
    // 分页
    handleCurrentChange(page){
      this.page=page
      this.getList();
    },
    // 获取列表数据
    getList(){
      var url =this.$api.merchantList,
          params={
            limit:10,
            page:this.page
          };

      this.$post(url,params).then(res=>{
          if(res.code=="000"){
            this.tableData =res.data
          }
      })

    },
    goDetail(data,type=2){
      if(type==1){
        data.balance_time="";
        data.year = this.tableData.year;
        data.month = this.tableData.month
      }else{
         data.year = "";
          data.month = ""
      }
      this.$router.push({
          path:'SettlementDetail',
          query: {
            year:data.year,
            month:data.month,
            time:data.balance_time
          }
        })
    }

  },
  computed: {

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
  margin-bottom: 20px;
  padding:10px;
}
.title{
  height: 104px;
  padding:16px 0 0 24px;
  .icon-info{
    font-size: 24px;
    vertical-align: middle;
  }
  .intro{
    padding-left:16px;
    h4{
      margin-bottom: 4px;
    }
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

</style>
