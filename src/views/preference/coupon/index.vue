<template>
  <div class="coupon w100">
    <div class="title bgf w100  ft14 c4">
      <span>优惠券名称：</span>
      <el-input v-model="name" placeholder="请输入" size="small" style="width:272px"></el-input>
      <span style="margin-left:24px">状态：</span>
      <el-select v-model="status" placeholder="请选择" style="width:136px" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>

      <el-button type="primary" size="small" style="width:65px;margin-left:24px">查询</el-button>
    </div>
    <div class="main bgf">
      <el-button type="primary" size="small" style="width:102px;" @click="newCoupon">
       新建优惠券
      </el-button>
      <div class="table">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="优惠券信息"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="减免金额"
            width="200">
          </el-table-column>
          <el-table-column
            prop="address"
            label="状态">
          <template slot-scope="scope">
           <span> <span class="c5">•</span> 在架上</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="已领劵(人)"
            width="200">
          </el-table-column>
            <el-table-column
            prop="name"
            label="已使用(人)"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" @click="lowerFrame">上架</el-button>
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
          :page-size="10"
          class="fr"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
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
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        page:1,
        limit:10,
        name:"",

        options:[
          {value:"",label:"全部"},
          {value:"1",label:"上架"},
          {value:"2",label:"下架"},
        ],
        status:""

    }
  },
  mounted () {

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
    // 获取列表数据
    getList(){
      var url =this.$api.base,
          params={
            limit:this.limit,
            page:this.page
          },
          success = res=>{
            if(res.data.code==0){
            }else{
              this.$message.error(res.data.data)
            }
          };

      this.$post(url,params,success)

    },
    // 下架
    lowerFrame(){
      this.$confirm('下架后，优惠券不再被领取，已发放的可正常', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then( ()=>{

      } ).catch( ()=>{

      } )
    },
    // 创建新的优惠券
    newCoupon(){
      this.$router.push( {name: 'NewCoupon'})
    }
  },
  components: {
    Auditing
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.title{
  height: 80px;
  line-height: 80px;
  padding-left:24px;
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
