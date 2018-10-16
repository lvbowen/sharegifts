<template>
  <div class="app-container">
    <div class="app-header">活动列表</div>
    <div class="app-main">
      <div class="search-bar search">
        <el-form :inline="true" :model="searchObj">
          <el-form-item>
            <el-input v-model="searchObj.goodName" placeholder="商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchObj.goodNum" placeholder="商品编码" clearable></el-input>
          </el-form-item>
          <el-form-item label="活动类型:">
            <el-select v-model="searchObj.typeValue" placeholder="请选择" @change="typeChange">
              <el-option
                v-for="item in typeOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="searchObj.stateValue" placeholder="请选择" @change="stateChange">
              <el-option
                v-for="item in stateOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table class="table"
                :data="list" tooltip-effect="dark" v-loading.body="listLoading"
                element-loading-text="拼命加载中" border fit
                highlight-current-row
                @row-dblclick="dblclickOnRow" @current-change="rowChange" :row-style="rowStyle" @row-click="clickOnRow">
        <el-table-column label='活动' show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.unique_num}}<br>
            {{scope.row.create_at}}
          </template>
        </el-table-column>
        <el-table-column label='商品信息' show-overflow-tooltip align="left">
          <template slot-scope="scope">
            <img :src="scope.row.main_pic" alt="" style="width: 48px;height: 48px">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="活动类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.type | activityTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="活动规则" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.type=='1'">
              一口价：{{scope.row.integral}}红花<br>
              邮费：{{scope.row.post_fee}}元
            </div>
            <div v-else-if="scope.row.type=='3'">
              开奖方式：{{scope.row.cj_type | rewardTypeFilter}}<br>
              <span v-if="scope.row.cj_type=='1'">开奖时间：{{scope.row.cj_select}}<br></span>
              <span v-else-if="scope.row.cj_type=='2'">开奖人数：{{scope.row.cj_select}}人<br></span>
              <span v-else-if="scope.row.cj_type=='3'">中奖概率：{{scope.row.cj_select}}%<br></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="数量" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.stock_num}}
          </template>
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.status | activityStateFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center" width="250">
          <template slot-scope="scope">
            <!-- <el-button size="mini"
                       type="success"
                       @click="publish(scope.row.id)"
                       v-show="scope.row.status=='4'"
            >
              上架
            </el-button> -->
            <el-button size="mini"
                       type="warning"
                       @click="cancelPublish(scope.row.id)"
                       v-show="scope.row.status=='1'"
            >
              取消发布
            </el-button>
            <el-button size="mini"
                       type="warning"
                       @click="cancelPublish(scope.row.id)"
                       v-show="scope.row.status=='2'"
            >
              下架
            </el-button>
            <el-button type="info" size="mini"
                       @click="showReason(scope.row.id)"
                       v-show="scope.row.status=='4'"
            >下架原因
            </el-button>
            <el-button type="primary" size="mini" @click="detail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange"
                     :current-page="searchObj.page"
                     :page-sizes="[8,10,12]"
                     :page-size='searchObj.pageSize'
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRecord">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getActivityList, cancelActivity, publishActivity, getReasons } from "@/api/activityList"
  import {getTextById, ActivityType, ActivityState, rewardType} from '@/utils/enums'

  export default {
    name: "ActivityList",
    data() {
      return {
        currentRow: null,
        totalRecord: 0,
        list: [],
        listLoading: false,
        searchObj: {
          page: 1,
          pageSize: 8,
          goodName: '',
          goodNum: '',
          typeValue: '全部',
          typeVal: 0,
          stateValue: '全部',
          stateVal: 0
        },
        typeOptions: ["全部", "一口价", "抽奖"],
        // typeOptions: ["全部", "一口价"],
        stateOptions: ["全部", "待审核", "进行中", "已送出", "已下架"]
      }
    },
    filters: {
      activityTypeFilter(value) {
        return getTextById(ActivityType, value)
      },
      activityStateFilter(value) {
        return getTextById(ActivityState, value)
      },
      rewardTypeFilter(value) {
        return getTextById(rewardType, value)
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
    methods: {
      fetchData() {
        this.listLoading = true
        let params = {
          page: this.searchObj.page,
          limit: this.searchObj.pageSize,
          name: this.searchObj.goodName,
          goods_sn: this.searchObj.goodNum,
          type: this.searchObj.typeVal,
          status: this.searchObj.stateVal
        }
        getActivityList(params).then(res => {
          if (res.code == '000') {
            this.list = res.data.data
            this.totalRecord = res.data.count
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
        } else if (this.searchObj.typeValue === '抽奖') {
          this.searchObj.typeVal = 3
        }
      },
      stateChange() {
        if (this.searchObj.stateValue === '全部') {
          this.searchObj.stateVal = 0
        } else if (this.searchObj.stateValue === '待审核') {
          this.searchObj.stateVal = 2
        } else if (this.searchObj.stateValue === '进行中') {
          this.searchObj.stateVal = 3
        } else if (this.searchObj.stateValue === '已送出') {
          this.searchObj.stateVal = 7
        } else if (this.searchObj.stateValue === '已下架') {
          this.searchObj.stateVal = 4
        }
      },
      publish(id) {
        this.$confirm('是否申请上架该活动?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: id
          }
          publishActivity(params).then(res => {
            if (res.code == '000') {
              this.$message({
                type: 'success',
                message: '活动上架成功!'
              })
              this.fetchData()
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      cancelPublish(id) {
        this.$confirm('是否取消该活动的发布?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: id
          }
          cancelActivity(params).then(res => {
            if (res.code == '000') {
              this.$message.success(res.msg)
              this.fetchData()
            } else {
              this.$message.error(res.msg)
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      detail(id) {
        this.$router.push({
          name: 'ActivityDetail',
          params: {id: id}
        })
      },
      showReason(id) {
        getReasons({id}).then(res => {
          if(res.success){
            this.$alert(res.data.msg, '下架原因', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
          }
        })
      
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
        &.search {
          padding-top: 20px;
        }
      }
    }
    .table {
      margin-top: 20px;
    }
    .searchBtn {
      border: 1px solid #3D95FB;
    }
  }

</style>
