<template>
  <div class="app-container">
    <div class="app-header">账户余额</div>
    <div class="app-main">
      <div class="search-bar tip">
        <i class="el-icon-info"></i>
        <span>说明：请在微信小程序(小福社)中申请提现</span>
      </div>
      <div class="search-bar">
        <span class="balance">当前余额:{{balance}}元</span>
        <el-button class="payBtn" type="primary" size="small" @click="recharge">立即充值</el-button>
      </div>
      <el-table class="table"
                :data="list" tooltip-effect="dark" v-loading.body="listLoading"
                element-loading-text="拼命加载中" border fit
                highlight-current-row
                @row-click="clickOnRow"
                @row-dblclick="dblclickOnRow"
                @current-change="rowChange"
                :row-style="rowStyle">
        <el-table-column label='时间' show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.update_at}}
          </template>
        </el-table-column>
        <el-table-column label='金额' show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.amount}}
          </template>
        </el-table-column>
        <el-table-column label="变动原因" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.type | AmountChangeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            订单编号：{{scope.row.order_id}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange"
                     :current-page="searchObj.page"
                     :page-sizes="[10,15,20]"
                     :page-size='searchObj.pageSize'
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRecord">
      </el-pagination>
      <el-dialog
        title="余额充值"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <div class="dialog-main">
          <h2 class="title">充值须知</h2>
          <p>1、充值金额不提供发票</p>
          <p>2、充值收取1%的手续费，该费用为微信支付手续费</p>
          <h3 class="title">充值金额</h3>
          <ul class="selectOptions" ref="selectOptions">
            <li :class="{'active':this.currentTab=='first'}" @click="toggleTab('first')">200</li>
            <li :class="{'active':this.currentTab=='second'}" @click="toggleTab('second')">500</li>
            <li :class="{'active':this.currentTab=='third'}" @click="toggleTab('third')">2000</li>
            <li :class="{'active':this.currentTab=='fourth'}" @click="toggleTab('fourth')">自定义</li>
          </ul>
          <div v-show="this.currentTab=='fourth'">
            <el-input
              v-model="customMoney"
              class="payMoney"
              size="small"
              placeholder="输入充值金额"
              clearable
              min="0"
              @keyup.native="number"
            ></el-input>
            <span class="unit">元</span>
          </div>
          <h3 class="title">应付金额</h3>
          <span class="shouldPayMoney">{{payMoney}}元</span>(含手续费{{payMoney*0.01}}元)
          <h3 class="title">支付方式</h3>
          <img class="payIcon pay" src="@/assets/image/zfb.png" alt="">
          <img class="payIcon wechat" src="@/assets/image/wx.png" alt="">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="pay">付款</el-button>
        </span>
      </el-dialog>
    </div>
    <div v-show="showCodeFlag">
      <div class="wrapper">
        <div class="payTitle">
          <div>
            <span class="wxLogo"><img src="" alt=""></span>
            <span class="tip">微信支付</span>
          </div>
        </div>
        <div class="payMain">
          <div class="moneyWrap">
            <span class="unit">￥</span>
            <span class="money">{{shouldPayMoney}}</span>
          </div>
          <Qrcode v-if="code_url" :qrcode="code_url"></Qrcode>
          <div class="scanTipWrap">
            <span class="scanLogo"><img src="" alt=""></span>
            <div class="scanTip">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码完成支付</p>
            </div>
          </div>
        </div>
        <div class="close" @click="close">×</div>
      </div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getBalanceList, payMoney, getPayState} from '@/api/balance'
  import {getTextById, AmountChangeState} from "@/utils/enums"
  import Qrcode from '@/components/shareBase/Qrcode'

  export default {
    name: "AccountBalance",
    data() {
      return {
        currentRow: null,
        totalRecord: 0,
        list: [],
        listLoading: false,
        searchObj: {
          page: 1,
          pageSize: 5
        },
        balance: '',  // 当前余额
        dialogVisible: false,
        currentTab: '',
        payMoney: '',     // 选择充值金额
        customMoney: '',   //  自定义金额
        showCodeFlag: false,
        code_url: '',   // 返回充值的二维码
        order_id: null, // 充值订单id
        time: null
      }
    },
    filters: {
      AmountChangeFilter(value) {
        return getTextById(AmountChangeState, value)
      }
    },
    created() {
      this.fetchData()
      // this.$store.dispatch('GetUserInfo').then(res => {
      //   let isCredential = res.data.is_credential
      //   if (isCredential != '2') {
      //     this.$router.push('/aptitude')
      //     this.$message.warning('请先完善商家信息!')
      //   }
      // })
    },
    computed: {
      shouldPayMoney() {
        return this.payMoney * 1.01
      }
    },
    watch: {
      currentTab(newVal) {
        switch (newVal) {
          case 'first':
            this.payMoney = 200
            break
          case 'second':
            this.payMoney = 500
            break
          case 'third':
            this.payMoney = 2000
            break
          default:
            this.payMoney = ''        // 切换到自定义金额时，先清空之前payMoney保留的值
            this.customMoney = ''
        }
      },
      customMoney(newVal) {
        this.payMoney = newVal
      },
      // 当充值二维码弹出时，开始监听该订单号充值是否成功!
      showCodeFlag(newVal) {
        if (newVal) {
          this.time = setInterval(() => {
            getPayState({order_id: this.order_id}).then(res => {
              if (res.code == '000') {
                this.$message.success('充值成功!')
                this.showCodeFlag = false
                clearInterval(this.time)
                this.payMoney = ''
                this.currentTab = ''
              }
            })
          }, 2000)
        }
      }
    },
    methods: {
      fetchData() {
        this.listLoading = true
        let params = {
          page: this.searchObj.page,
          limit: this.searchObj.pageSize
        }
        getBalanceList(params).then(res => {
          if (res.code == '000') {
            this.list = res.data.list.data
            this.totalRecord = res.data.list.count
            this.balance = res.data.user.balance
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
      // 充值
      recharge() {
        this.dialogVisible = true
      },
      // 关闭修改商品类目弹框
      handleClose() {
        this.dialogVisible = false
      },
      toggleTab(className) {
        this.currentTab = className
      },
      number() {
        this.customMoney = this.customMoney.replace(/^((-\d+)|(0+))$/, '')
        this.customMoney = this.customMoney.replace('.', '')
      },
      // 付款
      pay() {
        if (!this.payMoney) {
          this.$message.warning('请先填写充值金额!')
          return
        }
        let params = {
          amount: this.payMoney
        }
        payMoney(params).then(res => {
          if (res.code == '000') {
            this.code_url = res.data.code_url
            this.order_id = res.data.order_id
            this.dialogVisible = false
            this.showCodeFlag = true
          }
        })
      },
      close() {
        this.showCodeFlag = false
        clearInterval(this.time)
        this.payMoney = ''
        this.currentTab = ''

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
      }
    },
    components: {
      Qrcode
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  .app-container {
    .app-header {
      width: calc(100% - 20px * 2);
      margin: 20px;
    }
    .app-main {
      position: absolute;
      top: 80px;
      left: 20px;
      right: 20px;
      bottom: 20px;
      .search-bar {
        &.tip {
          line-height: 60px;
          margin-bottom: 20px;
          background: rgba(242, 242, 242, 1);
          span {
            color: #333;
          }
        }
        .balance {
          font-size: 15px;
        }
        .payBtn {
          margin-left: 20px;
        }
      }
      .table {
        margin-top: 20px;
      }
      .dialog-main {
        .title {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .shouldPayMoney {
          color: #F56C6C;
        }
        .selectOptions {
          overflow: hidden;
          border: 1px solid #ccc;
          box-sizing: border-box;
          li {
            float: left;
            width: 25%;
            height: 30px;
            border-right: 1px solid #ccc;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            &.active {
              color: #fff;
              background: #409EFF;
            }
          }
        }
        .payMoney {
          width: 175px;
          margin-top: 10px;
        }
        .unit {
          display: inline-block;
          margin-top: 6px;
        }
        .payIcon {
          display: inline-block;
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
      }
    }

    .searchBtn {
      border: 1px solid #3D95FB;
    }
    .wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 500px;
      height: 500px;
      margin: 200px auto;
      z-index: 99;
      background: #fff;
      .payTitle {
        height: 80px;
        margin: 0 auto;
        line-height: 80px;
        text-align: center;
        background: rgba(0, 0, 0, 0.21);
        .wxLogo {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: green;
        }
        .tip {
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .payMain {
        text-align: center;
        .moneyWrap {
          line-height: 90px;
          font-size: 41px;
          font-weight: 400;
        }
        .scanTipWrap {
          margin-top: 50px;
          .scanLogo {
            display: inline-block;
            width: 35px;
            height: 35px;
            background: green;
          }
          .scanTip {
            display: inline-block;
            margin-left: 10px;
            line-height: 20px;
            text-align: left;
            p {
              font-size: 15px;
            }
          }
        }
      }
      .close {
        position: absolute;
        top: 78px;
        right: 5px;
        font-size: 30px;
        color: black;
        cursor: pointer;
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.21);
      z-index: 98;
    }
  }

</style>
