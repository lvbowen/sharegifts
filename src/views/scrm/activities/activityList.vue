/*
* 高返活动列表
* creater：gaoyue
 */
<template>
  <div class="activityBox details">
    <div class="tit">
      <p>高返 / 活动列表</p>
    </div>
    <div class="containers">
      <div class="innerContainer">
        <div class="intrusion">
          <div class="intruBox">
            <div class="left iconBox">
              <i class="el-icon-info"></i>
            </div>
            <div class="left">
              <p>1、活动创建后需要申请发布，平台审核通过后才在平台展示</p>
              <p>2、 创建活动时，返现金额需冻结在该平台</p>
            </div>
          </div>
        </div>
        <div class="search-bar search">
          <el-form :inline="true" :model="searchObj">
            <el-form-item>
              <el-input v-model="searchObj.active_name" placeholder="活动名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchObj.status" placeholder="请选择状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="searchObj.start_time" align="right" type="datetime" placeholder="创建时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker> 至
              <el-date-picker v-model="searchObj.end_time" align="right" type="datetime" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
          <el-form>
            <el-button type="primary" @click="creatActivity">创建活动</el-button>
          </el-form>

        </div>
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%" v-loading.body="listLoading">
            <el-table-column prop="active_name" label="活动名称" width="180">
            </el-table-column>
            <el-table-column prop="create_at" label="起始时间">
              <template slot-scope="scope">
                {{fmtDate(scope.row.start_time*1000)}}-{{fmtDate(scope.row.end_time*1000)}}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待审核</span>
                <span v-if="scope.row.status==2">未通过</span>
                <span v-if="scope.row.status==3">未开始</span>
                <span v-if="scope.row.status==4">进行中</span>
                <span v-if="scope.row.status==5">已结束</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="价格">
            </el-table-column>
            <el-table-column prop="stock_num" label="库存">
            </el-table-column>
            <el-table-column prop="applicants" label="申请人数">
            </el-table-column>
            <el-table-column prop="shop_name" label="店铺名">
            </el-table-column>
            <el-table-column prop="refuse_cause" label="驳回原因">
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip align="center" width=180>
              <template slot-scope="scope">
                <el-button type="text" @click="edit(scope)" v-if="scope.row.status==2">编辑</el-button>
                <el-button type="text" @click="showDetail(scope.row.id)">明细</el-button>
                <el-button type="text" @click="check(scope.row)" v-if="scope.row.status>3">审核</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange" :current-page="searchObj
          .page" :page-sizes="[8,10,12]" :page-size='searchObj.pageSize' layout="total, sizes, prev, pager, next, jumper" :total="searchObj.totalRecord">
          </el-pagination>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div class="XCXcodeWrapper" v-show="showCodeFlag">
        <BindXCX :codeUrl="codeUrl"></BindXCX>
      </div>
    </transition>
  </div>
</template>
<script>
import { getAcityList } from "@/api/scrm/activity"
import { getCode} from "@/api/goodsManage"
import { mapGetters, mapMutations } from 'vuex'
import BindXCX from '@/components/shareBase/BindXCX'
export default {
  data () {
    return {
      totalRecord: 20,
      page: 1,
      searchObj: {
        page: 1,
        limit: 10,
        totalRecord: 0,
      },
      options: [
        { value: '', label: '全部' },
        { value: '4', label: '进行中' },
        { value: '5', label: '已结束' },
        { value: '3', label: '未开始' },
        { value: '1', label: '待审核' },
        { value: '2', label: '被驳回' },
      ],
      tableData: [],
      viewDialog: false,//是否显示查看狂
      viewDetail: {},//查看框内容
      listLoading:false,
      codeUrl: '',  // 小程序二维码
      showCodeFlag: false,
      userInfoData:{}
    }
  },
  created () {
    this.init();
    this.$store.dispatch('GetUserInfo').then(res => {
      this.userInfoData = res.data
      // let isCredential = res.data.is_credential
      // if (isCredential != '2') {
      //   this.$router.push('/aptitude')
      //   this.$message.warning('请先完善商家信息!')
      // }
    })
    this.getCode()
  },
  computed: {
    ...mapGetters([
      'activityDetail',
      'stock',
      'needMoney'
    ])
  },
  watch: {
    // 监听左滑出的二维码，过5秒后消失
    showCodeFlag(newVal) {
      if (newVal) {
        let time = setTimeout(() => {
          this.showCodeFlag = false
          clearTimeout(time)
        }, 5000)
      }

    }
  },
  methods: {
    //搜索
    search () {
      this.init();
    },
    //改变当前显示条数
    handleSizeChange (val) {
      this.searchObj.pageSize = val
      this.init();
    },
    //改变页数
    handlePageNumChange (val) {
      this.searchObj.page = val
      this.init();
    },
    getCode() {
      getCode().then(res => {
        if (res.code == '000') {
          this.codeUrl = res.data.url
        }
      })
    },
    //创建活动
    creatActivity () {
     if(!this.userInfoData.userInfo){
      this.showCodeFlag = true
       return
     }
      sessionStorage.setItem('obj','')
      this.setGoodDetail('')
      this.$router.push({
        path: 'addActivity',
        query: { name: '新增活动' }
      })
    },
    //点击编辑
    edit (data) {
      this.viewDetail = data.row
      this.$router.push({
        path: 'addActivity',
        query: { name: '编辑活动' }
      })
      sessionStorage.setItem('obj', JSON.stringify(this.viewDetail))
      this.viewDialog = true
    },
    //明细
    showDetail (id) {
      this.$router.push({
        path: 'activityInfo',
        query: {
          id: id
        }
      })
    },
    //审核
    check (data) {
      let need = parseInt(data.return) * parseInt(data.stock_num)
      this.setMoney(need)
      this.$router.push({
        path: '/examine',
        query: {
          id: data.id,
          status: data.status
        }
      })
    },


    //初始化
    init () {
      this.listLoading = true
      getAcityList(this.searchObj).then(res => {
        this.listLoading = false
        if (res.success) {
          this.tableData = res.data.data
          this.searchObj.totalRecord = res.data._count
        }
      })
    },
    fmtDate (obj) {
      var date = new Date(obj);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    },
    ...mapMutations({
      setGoodDetail: 'SET_GOOD_DETAIL',
      setMoney: 'SET_MONEY'
    })

  },
  components: {
    BindXCX
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
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
}
.tit p {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 0 20px;
  box-shadow: 0px 1px 0px 0px rgba(209, 219, 229, 1);
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
  padding: 0 20px;
}
.tableBox {
  padding: 20px;
  .el-table {
    border: 1px solid #ebebeb;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all 1s;
  transform: translateX(0)

}
.slide-enter, .slide-leave-to {
  transform: translateX(350px);
  opacity: 0;
}
.XCXcodeWrapper {
  position: absolute;
  right: 100px;
  bottom: 100px;
  width: 250px;
  height: 300px;
  z-index: 999;
}
</style>
