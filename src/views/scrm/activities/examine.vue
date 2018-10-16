/*
* 审核
* creater：gaoyue
*/
<template>
  <div class="details">
    <div class="tit">
      <p>高返 /
        <span @click="goBackList">活动列表</span> / 审核</p>
    </div>
    <div class="containers">
      <div class="innerContainer">
        <div class="intrusion">
          <div class="intruBox">
            <div class="left iconBox">
              <i class="el-icon-info"></i>
            </div>
            <div class="left">
              <p>1、审核通过后，系统将金额自动返还到用户账户</p>
              <p>2、审核拒绝后，用户有一次修改报告的机会（48小时未提交系统自动取消资格）</p>
              <p>3、二次审核拒绝后，用户无法得到返现金额；请谨慎操作</p>
            </div>
          </div>
        </div>
        <div class="search-bar search">
          <el-form :inline="true" :model="searchObj">
            <el-form-item>
              <el-date-picker v-model="searchObj.start_time" align="right" type="date" placeholder="请选择提交时间">
              </el-date-picker> -
              <el-date-picker v-model="searchObj.end_time" align="right" type="date" placeholder="请选择提交时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchObj.status" placeholder="请选择返现状态">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width:150px">
              <el-select v-model="searchObj.type" placeholder="请选择账号类型">
                <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchObj.nickname" clearable placeholder="请填写账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchObj.order_id" placeholder="请填写订单编号" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="moneybox">
          <span>返现总金额：{{needMoney}}元</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>已返现总金额：{{returned}}元</span>
        </div>
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%" ref="multipleTable" v-loading.body="listLoading">
            <el-table-column label='序号' show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.id}}
              </template>
            </el-table-column>
            <el-table-column label='提交时间' show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.create_at}}
              </template>
            </el-table-column>
            <el-table-column label='商品信息' show-overflow-tooltip :render-header="renderSearchType" :prop="tableSearchType" class="selectBox">
            </el-table-column>
            <el-table-column label='买家信息'>
              <template slot-scope="scope">
                <el-button type="primary" plain @click="showBuy(scope.row)">买家信息</el-button>
              </template>
            </el-table-column>
            <el-table-column label='店铺' show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.active_info.shop_name}}
              </template>
            </el-table-column>
            <el-table-column label='订单编号' show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.order_id!=0">{{scope.row.order_id}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column label='订单状态' show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status==6">同意返现</span>
                <span v-if="scope.row.status==7">拒绝返现</span>
                <span v-if="scope.row.status==8">待返现</span>

              </template>
            </el-table-column>
            <el-table-column label='商品金额' show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.active_info.price}}
              </template>
            </el-table-column>
            <el-table-column label='返现金额' show-overflow-tooltip>
              <template slot-scope="scope">
                {{scope.row.active_info.return}}
              </template>
            </el-table-column>
            <el-table-column label='操作/状态' show-overflow-tooltip>
              <template slot-scope="scope">
                <span v-if="scope.row.status==8">
                  <el-button type="text" @click="agree(scope.row)">同意</el-button>
                  <el-button type="text" @click="refuse(scope.row)">拒绝</el-button>
                  <el-button type="text" @click="view(scope.row)">查看</el-button>
                </span>
                <span v-if="scope.row.status==6">
                  <el-button type="text">已同意</el-button>
                </span>
                <span v-if="scope.row.status==7">
                  <el-button type="text">已拒绝</el-button>
                  <span>{{scope.row.refuse_cause}}</span>
                  <el-button type="text" @click="view(scope.row)">修改</el-button>
                </span>

              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange" :current-page="searchObj.page" :page-sizes="[8,10,12]" :page-size='searchObj.limit' layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 审核拒绝 -->
    <el-dialog :title="activeTit" :visible.sync="viewDialog" width="30%">
      <el-input type="textarea" v-model="refuseText"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="answerRefuse()" type="primary">确认</el-button>
        <el-button @click="viewDialog = false">取 消</el-button>
      </div>
    </el-dialog>

      <!-- 买家信息弹窗 -->
    <el-dialog title="买家信息" :visible.sync="buyerInfoModel" width="30%">
      <div class="buyerContainer">
        <div class="itemBox"><span class="labelBox">旺旺ID/京东账号：</span> <span>{{userInfo.account}}</span></div>
        <div class="itemBox"><span class="labelBox">淘气值/京东豆：</span> <span>{{userInfo.value}}</span></div>
        <div class="itemBox"><span class="labelBox">个人标签：</span> <span>{{tags?tags:'暂无'}}</span></div>
        <div class="itemBox" v-if="userInfo.type==1"><span class="labelBox">买家信用：</span> <span>{{this.userDetail.buyer_total_point?this.userDetail.buyer_total_point+'单':'暂无'}}</span></div>
        <div class="itemBox" v-if="userInfo.type==1"><span class="labelBox">周平均订单量：</span> <span>{{this.userDetail.week_avg?this.userDetail.week_avg+'单':'暂无'}}</span></div>
        <div class="itemBox" v-if="userInfo.type==1"><span class="labelBox">好评率：</span> <span>{{this.userDetail.seller_good_rate?this.userDetail.seller_good_rate:'暂无'}}</span></div>
        <div class="itemBox" v-if="userInfo.type==1"><span class="labelBox">性别：</span> <span>{{this.userDetail.sex?this.userDetail.sex:'暂无'}}</span></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="buyerInfoModel = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { checkInfo, agreeReturn, refuseReturn } from "@/api/scrm/activity"
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      viewDialog: false,
      searchObj: {
        type: '0',
        page: 1,
        limit: 10,
        active_id: '',
        status: '5',
        nickname: '',
        start_time: '',
        end_time: '',
        type: '',
        nickname: '',
        order_id: '',
        returned: 0,
      },
      status: [
        { label: '全部', value: '5' },
        { label: '同意返现', value: '6' },
        { label: '拒绝返现', value: '7' },
        { label: '待返现', value: '8' },
      ],
      type: [
        { label: '微信昵称', value: '1' },
        { label: '淘宝号', value: '2' },
        { label: '京东号', value: '3' },
      ],
      tableData: [],
      totalRecord: 0,
      searchType: 'acc',
      tableSearchType: 'acc',
      searchTypeArray: [
        {
          value: 'acc',
          label: '淘宝/京东号'
        },
        {
          value: 'nickname',
          label: '微信昵称'
        },
      ],
      page: 1,
      refuseText: '',
      activeTit: '',
      listLoading: false,
      backMoney: 0,
      returned:0,
      buyerInfoModel:false,
      shop_type:2,
      userDetail:{},//买家信用
      userInfo:{},//买家信息
      tags:''//标签
    }
  },
  created () {
    this.searchObj.active_id = this.$route.query.id
    this.init()
  },
  computed: {
    ...mapGetters([
      'needMoney'
    ])
  },

  methods: {
    // 渲染表头-类型
    renderSearchType (createElement, { column, $index }) {
      return createElement(
        "el-select",
        {
          props: {
            value: this.tableSearchType,
            size: 'tiny',
          },
          on: {
            input: value => {
              this.tableSearchType = value
              this.changeSearchType && this.changeSearchType(value)
            }
          }
        },
        [
          this.searchTypeArray.map(item => {
            return createElement("el-option", {
              props: {
                value: item.value,
                label: item.label
              }
            })
          })
        ]
      )
    },
    handleSizeChange (val) {
      this.searchObj.limit = val
      this.init()

    },
    handlePageNumChange (page) {
      this.searchObj.page = page
      this.init()
    },
    search () {
      this.init();
    },
    agree () {
      let id = JSON.parse(sessionStorage.getItem('chekObj')).id;
      agreeReturn({ id: id }).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
        }
      })
    },
    refuse (data) {
      this.activeTit = data.active_info.active_name
      let id = data.id;
      refuseReturn({ id: id, refuse_cause: this.refuseText }).then(res => {
        if (res.success) {
          this.viewDialog = false
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //查看
    view (data) {
      this.$router.push({
        name: 'examineInfo'
      })
      sessionStorage.setItem('chekObj', JSON.stringify(data))
    },
    //查看买家信息
    showBuy(data){
      this.buyerInfoModel=true
      if(data.user_info.account_details){
        this.userDetail= JSON.stringify(data.user_info.account_details)
        this.userInfo=data.user_info
        let tags=this.userInfo.tags
        let tagArr=['在校学生', '职场白领', '技术蓝领', '家庭主妇', '公务员', '医护人员', '餐饮行业', '自由职业', '专职司机']
        let strArr=[]
        if(tags){
          tags = JSON.parse(tags)
          for(let item of tags){
            strArr.push(tagArr[item])
          }
        }
        this.tags=strArr.join(',')
      } 
    },
    goBackList () {
      this.$router.push({
        path: 'activity',
      })
    },
    init () {
      this.listLoading = true
      checkInfo(this.searchObj).then(res => {
        this.listLoading = false
        if (res.success) {
          this.tableData = res.data.data
          this.totalRecord = res.data._count
          this.returned = res.data.return_num
        }
      })
    }

  }
}
</script>
<style lang="less" rel="stylesheet/less">
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
  z-index: 99;
}
.tit p {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 0 20px;
  box-shadow: 0px 1px 0px 0px rgba(209, 219, 229, 1);
  span {
    cursor: pointer;
    color: #409eff;
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
.search {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 0;
}
.tableBox {
  padding: 20px;
  .el-table {
    border: 1px solid #ebebeb;
  }
}
.moneybox {
  float: right;
  color: #606266;
  font-size: 14px;
  margin-right: 70px;
  margin-bottom: 20px;
}
.orderImg {
  height: 40px;
  height: 40px;
  margin: 10px 0;
  cursor: pointer;
}
.el-table th .el-select,
.el-table th .el-select .el-input {
  padding-left: 0px !important;
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
.buyerContainer{
  padding:0;
}
.itemBox{
  line-height:40px;
  display: flex;
  .labelBox{
    width:120px;
    text-align: right;
  }
}
</style>