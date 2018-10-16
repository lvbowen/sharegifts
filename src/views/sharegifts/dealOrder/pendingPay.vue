<template>
  <div>
    <div class="search-bar search">
      <el-form :inline="true" :model="searchObj">
        <el-form-item>
          <el-input v-model="searchObj.orderId" placeholder="订单编号" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="searchObj.phone" placeholder="收件人手机" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单类型:">
          <el-select v-model="searchObj.typeValue" placeholder="请选择" @change="typeChange">
            <el-option
              v-for="item in typeOptions"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="search-bar">
      <el-button type="primary" @click="orderOrderorderExport">导出</el-button>
      <el-button type="primary" @click="outin" v-if="status=='2020'">导入发货</el-button>
    </div>
    <div class="main">
      <div class="table">
        <p class=" ft14 c9 pd24 lh56">
          <span class="dib" style="width:30%">商品信息</span>
          <span class="dib" style="width:15%">一口价</span>
          <span class="dib" style="width:15%">邮费</span>
          <span class="dib" style="width:15%">订单状态</span>
          <span class="dib" style="width:10%">买家信息</span>
        </p>
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <div>
              <div class="dfj ft14 c4 order-top pd24 bt">
                <p><span> 订单编号：{{item.tid}}</span></p>
                <span style="margin-right: 300px;"> <i class="iconfont icon-yonghu"></i> {{item.buyer_info && item.buyer_info.nickname}}</span>
                <!--<span><i class="iconfont icon-shouji"></i>{{item.buyer_info && item.buyer_info.phone}}</span>-->
                <!--<span>付款时间：{{item.pay_time && item.pay_time.alias}}</span>-->
              </div>
              <ul>
                <li class="ft14 c4 df pd24 bt">
                  <div style="width:30%;" class="ft12 c4 df ">
                    <img :src="item.order_ext && item.order_ext.goods_pic" alt="" style="width:80px;height:80px"
                         class="mt24">
                    <div class="mt24" style="margin-left:5px">
                      <p style="max-width:200px">{{item.order_ext && item.order_ext.goods_title}}</p>
                      <p class="ft12 c9" style="margin-top:12px">编码:
                        {{item.order_ext && item.order_ext.goods_sku_sn}}</p>
                      <p class="ft12 c9" style="margin-top:5px">规格：
                        {{item.order_ext && item.order_ext.sku_str}}</p>
                    </div>
                  </div>
                  <span class="dib lh148" style="width:15%">{{item.order_ext && item.order_ext.pay_integral}}</span>
                  <span class="dib lh148" style="width:15%">&nbsp;&nbsp;&nbsp;{{item.order_ext && item.order_ext.post_fee}}</span>
                  <span class="dib lh148"
                        style="width:15%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.status && item.status.alias}}</span>
                  <div style="width:15%" class="dff">
                    <p>卖家昵称:{{item.merchant_info && item.merchant_info.nickname}}</p>
                    <!--<p>卖家电话:{{item.merchant_info && item.merchant_info.phone}}</p>-->
                  </div>
                </li>
              </ul>
              <div class="ft12 c4 pd24 bt" style="padding:8px 24px;">
                <p>
                  收货信息:{{item.receiver_name}}，{{item.receiver_phone}}，{{item.receiver_state}}{{item.receiver_city}}{{item.receiver_district}}{{item.receiver_address}}</p>
              </div>
            </div>
          </li>
        </ul>
        <p class="tac"
           style="margin:5px 0;border-top:1px solid #e6e6e6;line-height:40px"
           v-show="list.length==0">暂无数据</p>
      </div>
      <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange"
                     :current-page="searchObj.page"
                     :page-sizes="[5,10,15]"
                     :page-size='searchObj.pageSize'
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRecord">
      </el-pagination>
    </div>
    <el-dialog
      title="导入发货"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="df" style="justify-content: center;flex-wrap: wrap;">
        <div style="width:100%;justify-content: center;align-items:center;" class="df">
          <span>导入文件：</span>
          <form method='post' name='upForm' enctype='multipart/form-data'>
            <input type='file' name="file" ref="file" @change="onUpload($event)"
                   accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                   style="display: none">
          </form>
          <el-button class="button" type="primary" @click="importExcel">点击上传</el-button>
          <!--<el-upload-->
          <!--class="upload-demo ft14"-->
          <!--:action="action"-->
          <!--:http-request="uploadfile"-->
          <!--:show-file-list="false"-->
          <!--name="order_file">-->
          <!--<el-button size="small" type="primary">点击上传</el-button>-->
          <!--</el-upload>-->
        </div>
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
  import {getOrderList, exportOrder, importOrder, getExpressList} from "@/api/dealOrder"
  import axios from 'axios'
  import store from '@/store/store'
  import {getToken} from '@/utils/auth'

  export default {
    props: ['status'],
    data() {
      return {
        currentRow: null,
        totalRecord: 0,
        list: [],
        listLoading: false,
        searchObj: {
          page: 1,
          pageSize: 5,
          orderId: '',
          phone: '',
          typeValue: '全部',
          typeVal: 0,
        },
        typeOptions: ["全部", "一口价"],


        action: this.$api.orderOrderimport,
        dialogVisible: false,
        dialogVisibletable: false,
        tel: '',
        order: "",
        limit: 10,
        page: 1,
        listData: {
          total: 0,
          rows: []
        },
        order_status: '',
        tableData: [],
        loading: true,
        file: '' //导入文件
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        let params = {
          current_page: this.searchObj.page,
          page_size: this.searchObj.pageSize,
          tid: this.searchObj.orderId,
          buyer_phone: this.searchObj.phone,
          order_type: this.searchObj.typeVal,
          status: this.status == '5000' ? '5000,5010,5020' : this.status
        }
        getOrderList(params).then(res => {
          if (res.code == '000') {
            this.list = res.data.rows
            this.totalRecord = parseInt(res.data.total)
          } else {
            this.list = []
            this.totalRecord = 0
          }
          this.listLoading = false
        }).catch(e => {
          console.log(e)
        })
      },
      handleSizeChange(val) {
        this.searchObj.pageSize = val
        this.fetchData()
      },
      handlePageNumChange(val) {
        this.searchObj.page = val
        this.fetchData()
      },
      search() {
        this.fetchData()
      },
      typeChange() {
        if (this.searchObj.typeValue === '全部') {
          this.searchObj.typeVal = 0
        } else if (this.searchObj.typeValue === '一口价') {
          this.searchObj.typeVal = 1
        }
      },
      clickOnRow(row) {
      },
      dblclickOnRow(row) {
      },
      rowChange(row) {
        this.currentRow = row
      },
      rowStyle(row) {
        return row.unread ? {fontWeight: 'bold'} : {}
      },
      importExcel() {
        this.$refs.file.click()
      },
      onUpload(e) {
        this.file = e.target.files[0]
        let formData = new FormData()
        formData.append('order_file', this.file)
        let params = {
          order_file: formData
        }
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        if (store.getters.token) {
          config.headers['token'] = getToken()
        }
        axios.post(process.env.BASE_API + 'order/Order/import', params.order_file, config).then(res => {
          if (res.code == '000') {
            this.dialogVisible = false
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      uploadfile(req) {
        this.dialogVisibletable = true;
        let formdata = new FormData();
        formdata.append("order_file", req.file);
        // this.$post(this.$api.orderOrderimport, formdata, "multipart/form-data").then(data => {
        //   console.log(data);
        //   if (data.code == '000') {
        //     this.loading = false;
        //     let fail = [];
        //     for (let index = 0; index < data.data.data.length; index++) {
        //       if (data.data.data[index].status == -1) {
        //         data.data.data[index].hang = index;
        //         fail.push(data.data.data[index])
        //       }
        //     }
        //     if (fail.length == 0) {
        //       this.$message({
        //         message: '导入成功！',
        //         type: 'success'
        //       })
        //       this.dialogVisibletable = false;
        //       this.search();
        //     }
        //     this.tableData = fail;
        //   }
        // })
      },
      //模板下载
      download() {
        window.location.href = 'https://youxuan.ecbao.cn/xlsx/order_template.xlsx';
      },
      //确定导入
      sure_outin() {
      },
      handleClosetable(done) {
        done();
      },
      handleClose(done) {
        done();
      },
      handleCurrentChange(page) {
        this.page = page;
        this.search();
      },
      outin() {
        this.dialogVisible = true
      },
      // 订单导出
      orderOrderorderExport() {
        let token = ''
        if (store.getters.token) {
          token = getToken()
        }
        window.location.href = process.env.BASE_API + 'order/Order/export?token=' + token
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .main {
    padding: 25px 0 25px;
  }

  .table {
    border: 1px solid #E4E7ED;

  }

  .order-top {
    height: 40px;
    line-height: 40px;
    background-color: rgba(92, 179, 255, 0.1);
    // border:1px solid
  }

  .bt {
    border-top: 1px solid #E4E7ED;
  }

  .pd24 {
    padding: 0 24px;
  }

  .dfj {
    display: flex;
    justify-content: space-between
  }

  .dff {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }

  .lh56 {
    line-height: 56px;
  }

  .lh148 {
    line-height: 148px;
  }

</style>

