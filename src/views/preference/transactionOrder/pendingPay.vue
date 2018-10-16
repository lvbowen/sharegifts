<template>
  <div>
    <div class="search pl24 df" style="align-items: center;">
        <div style="width:100%;">
          <span>买家手机：</span>
          <el-input v-model="tel" placeholder="请输入" size="small" class="w272"></el-input>
          <span class="ml24 ">订单号：</span>
          <el-input v-model="order" placeholder="请输入" size="small" class="w272"></el-input>
          <span class="ml24 ">订单类型：</span>
          <el-select v-model="order_status" placeholder="请选择" style="width:136px" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>          
        </div>
        <div class="df" style="width:100%;">
          <el-button type="primary" size="small" style="width:65px;" @click="getData">查询</el-button>
          <el-button type="primary" size="small" style="width:65px;margin-left:12px" @click="orderdadan" v-if="status==2020">打单</el-button>
          <el-button type="primary" size="small" style="width:65px;margin-left:12px" @click="orderOrderorderExport">导出</el-button>
          <el-button type="primary" size="small" style="margin-left:12px;text-align:center;" @click="outin" v-if="status==2020">导入发货</el-button>
        </div>
    </div>
    <div class="wall">
    </div>
    <div class="main" >
     <div class="table">
      <p class=" ft14 c9 pd24 lh56">
        <span class="dib" style="width:30%">商品信息</span>
        <span class="dib" style="width:15%">单价</span>
        <span  class="dib" style="width:15%">数量</span>
        <span class="dib" style="width:15%">实收款</span>
        <span class="dib" style="width:10%">订单状态</span> 
        <span  class="dib" style="width:10%">买家</span>
      </p>
      <ul>
        <li v-for="(x,index) in listData.rows" :key="index">
          <div>
            <div class="dfj ft14 c4 order-top pd24 bt">
               <p><span> 订单编号：{{x.tid}}</span> <!--<el-tag type="danger" size="small">秒杀</el-tag> --></p>
               <span> <i class="iconfont icon-yonghu"></i> {{x.buyer_info.nickname}}</span>
               <span><i class="iconfont icon-shouji"></i>{{x.buyer_info.phone}}</span>
               <span>付款时间：{{x.pay_time.alias}}</span>
            </div>
            <ul>
              <li class="ft14 c4 df pd24 bt" v-for="(s,index) in x.order_ext[0].order_detail" :key="index">
                <div style="width:30%;" class="ft12 c4 df " > 
                  <img :src="s.goods_pic" alt="" style="width:80px;height:80px" class="mt24" >
                  <div class="mt24" style="margin-left:5px">
                    <p style="max-width:200px">{{s.goods_title}}</p>
                    <p class="ft12 c9" style="margin-top:12px">{{s.goods_sku_sn}}</p>
                    <p class="ft12 c9" style="margin-top:5px">规格：{{s.sku_str}}</p>

                  </div>
                </div>
                <span class="dib lh148" style="width:15%">{{s.price}}</span>
                <span  class="dib lh148" style="width:15%">&nbsp;&nbsp;&nbsp;{{s.quantity}}</span>
                <span  class="dib lh148" style="width:15%">{{s.goods_money}}</span>
                <span  class="dib lh148" style="width:10%" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{s.status.alias}}</span>
                <div style="width:10%" class="dff">
                  <p >快递公司：{{s.logistics_company}}</p>
                  <p >快递单号：{{s.logistics_code}}</p>
                </div>
              </li>
            </ul>
            <div class="ft12 c4 pd24 bt" style="padding:8px 24px;">
              <p>收货信息:{{x.receiver_name}}，{{x.receiver_phone}}，{{x.receiver_state}}省{{x.receiver_city}}市{{x.receiver_district}}{{x.receiver_address}}</p>
              <p> 买家留言:{{x.remark}}</p>
            </div>
          </div>
        </li>
      </ul>
      <p class="tac" style="margin:5px 0;border-top:1px solid #e6e6e6;line-height:40px" v-show="listData.rows.length==0" >暂无数据</p>
     </div>

     <div class="mt24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          class="fr"
          layout="total, sizes, prev, pager, next, jumper"
          :total="+listData.total">
        </el-pagination>
     </div>
    </div>
    <el-dialog
      title="导入发货"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="df" style="justify-content: center;flex-wrap: wrap;">
        <div style="width:100%;justify-content: center;align-items:center;" class="df">
          <span>导入文件：</span>
          <el-upload
              class="upload-demo ft14"
              :action="action"
              :http-request ="uploadfile"
              :show-file-list="false"
              name="order_file">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
        </div>
        <!-- <el-button type="primary" size="small" style="margin-left:12px;text-align:center;margin-top:24px;" @click="sure_outin">确定导入</el-button> -->
        <div style="width:100%;justify-content: center;margin-top:24px;" class="df">
          <span>说明：请先<span style="color:#409EFF;cursor: pointer;" @click="download">下载模板</span>，一次最多导入2000行数据；导入成功即自动发货。</span>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="导入发货"
      :visible.sync="dialogVisibletable"
      width="30%"
      :before-close="handleClosetable">
      <div style="width:100%;">
      <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="hang"
            label="行号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="tid"
            label="订单号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="reason"
            label="失败原因">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>




  </div>
</template>
<script>
export default {
  props:['status'],
  data(){
    return{
      action:this.$api.orderOrderimport,
      dialogVisible:false,
      dialogVisibletable:false,
      tel:'',
      order:"",
      limit:10,
      page:1,
      listData:{
        total:0,
        rows:[
        ]
      },
      options:[
        {value:'',label:'全部订单'},
        {value:'1',label:'普通订单'},
        {value:'2',label:'推广订单'},
      ],
      order_status:'',
      tableData: [],
      loading: true
    }
  },
  mounted () {
    this.getData();
    console.log(this.$route.query.token);
    let xtoken = location.search&&location.search.split('=')[1]
    if (xtoken) {
      localStorage.setItem('token',xtoken)      
    }
  },
  methods: {
    uploadfile(req){
      this.dialogVisibletable = true;
      let formdata = new FormData();
      formdata.append("order_file", req.file);
      this.$post(this.$api.orderOrderimport, formdata, "multipart/form-data").then(data => {
        console.log(data);
        if (data.code == '000') {
          this.loading = false;
          let fail = [];
          for (let index = 0; index < data.data.data.length; index++) {
             if (data.data.data[index].status == -1) {
               data.data.data[index].hang = index;
               fail.push(data.data.data[index])
             }
          }
          if (fail.length == 0) {
            this.$message({
              message:'导入成功！',
              type:'success'
            })
            this.dialogVisibletable = false;
            this.getData();
          }              
          this.tableData = fail;      
        }
      })
    },

    handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
    //模板下载
    download(){
      window.location.href = 'https://youxuan.ecbao.cn/xlsx/order_template.xlsx';
    },
    //确定导入
    sure_outin(){

    },
    handleClosetable(done){
      done();
    },
    handleClose(done) {
      done();
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    handleSizeChange(lim){
      this.limit = lim;
      this.getData();
    },
    handleCurrentChange(page){
      this.page = page;
      this.getData();
    },
    getData(){
      var params={
        page_size:this.limit,
        current_page:this.page,
        phone:this.tel,
        tradeno:this.order,
        status:this.status
      },
      url =this.$api.orderList;
      params.status = this.status=='5000'?"5000,5010":this.status
      this.$post(url,params).then( res=>{
        if(res.code=="000"){
        res.data.rows.forEach(el => {
          el.buyer_info =  el.buyer_info||{}
        });
          this.listData =res.data
        }
      })
    },
    orderdadan(){
      var newWindow = window.open();
      var params ={},
          url = this.$api.orderOrderdaDan;
      this.$post(url,params).then( res=>{
        if(res.code=="000"){
          newWindow.location.href = res.data.url;
          // 上面的代码中，用户安点击按钮的时候，先打开一个空白页，再发请求，在请求回调里面修改新窗口的.location.href，这样就不会被拦截
        }
      })
    },
    outin(){
      this.dialogVisible = true;
    },
    orderOrderorderExport(){
      var params = {
        // page_size:this.limit,
        // current_page:this.page,
        // phone:this.tel,
        // tradeno:this.order,
        // status:this.status
      },
      url =this.$api.orderOrderorderExport;
      this.status=='5000'?"5000,5010":this.status
      this.$post(url,params).then( res=>{
        window.location.href = this.$api.orderOrderorderExport+'?token='+localStorage.getItem("token")+'&page_size=999999999'+'&current_page='+this.page+'&phone='+this.tel+'&tradeno='+this.order+'&status='+this.status
        // window.location.href = this.$api.orderOrderorderExport+'?token=020511ebdbcf97cef6608ce89a8e0908'+'&page_size=999999999'+'&current_page='+this.page+'&phone='+this.tel+'&tradeno='+this.order+'&status='+this.status
      })
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  line-height: 80px;
  // height: 80px;
  padding-bottom: 32px;
  flex-direction: column;
}
.wall{
  width:100%;
  height: 24px;
  background-color:#f4f4f8;
  
}
.main{
  padding:24px 32px 48px ;
}
.table{
  border:1px solid #E4E7ED;

}
.order-top{
  height: 40px;
  line-height: 40px;
  background-color:rgba(92,179,255,0.1);
  // border:1px solid 
}

.bt{
  border-top:1px solid #E4E7ED;
}
.pd24{
  padding: 0 24px;
}
.dfj{
  display: flex;
  justify-content: space-between
}
.dff{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.lh56{
  line-height: 56px;
}
.lh148{
  line-height: 148px;
}

</style>

