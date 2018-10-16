/*
* 活动明细
* creater：gaoyue
*/
<template>
  <div class="details">
    <div class="tit">
      <p> 高返 /<span @click="goBack">活动列表</span> / 明细</p>
    </div>
    <div class="containers">
      <div class="innerContainer">
        <div class="search-bar search">
          <el-form :inline="true" :model="searchObj">
            <el-form-item>
              <el-date-picker v-model="searchObj.start_time" align="right" type="date" placeholder="请选择提交时间">
              </el-date-picker> -
              <el-date-picker v-model="searchObj.end_time" align="right" type="date" placeholder="请选择提交时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchObj.status" placeholder="请选择状态">
                <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="searchObj.type" placeholder="请选择平台">
                <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="searchObj.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tableBox">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="create_at" label="提交时间" width="180">
            </el-table-column>
            <el-table-column prop="nickname" label="微信昵称">
            </el-table-column>
            <el-table-column prop="account" label="淘宝号/京东号">
            </el-table-column>
            <el-table-column prop="active_info.shop_name" label="店铺">
            </el-table-column>
            <el-table-column prop="people" label="中奖状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status==1">待开奖</span>
                <span v-if="scope.row.status==3||scope.row.status==4">待开奖</span>
                <span v-if="scope.row.status==2||scope.row.status==5||scope.row.status==6||scope.row.status==7||scope.row.status==8">中奖</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handlePageNumChange" :current-page="searchObj.page" :page-sizes="[8,10,12]" :page-size='searchObj.limit' layout="total, sizes, prev, pager, next, jumper" :total="totalRecord">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { checkInfo } from "@/api/scrm/activity"
export default {
  data () {
    return {
      searchObj: {
        type: '',
        status: '',
        page: 1,
        limit: 10,
        active_id: '',
        start_time: '',
        end_time: '',
      },
      status: [
        { label: '全部', value: '1' },
        { label: '中奖', value: '2' },
        { label: '未中奖', value: '3' },
        { label: '待开奖', value: '4' },
      ],
      type: [
        { label: '微信昵称', value: '0' },
        { label: '淘宝号', value: '1' },
        { label: '京东号', value: '2' },
      ],
      tableData: [],
      totalRecord: 0,
      account: ''

    }
  },
  created () {
    this.searchObj.active_id = this.$route.query.id
    this.init();
  },
  methods: {
    handleSizeChange (val) {
      this.searchObj.limit = val
      this.init()
    },
    handlePageNumChange (val) {
      this.searchObj.page = val
      this.init()
    },
    search () {
      this.init()
    },
    changePlat (id) {
      for (let item of this.type) {
        if (item.value == id) {
          this.text = item.label
        }
      }
    },
    goBack(){
       this.$router.push({
        name: 'Activity',
      })
    },
    init () {
      checkInfo(this.searchObj).then(res => {
        if (res.success) {
          this.tableData = res.data.data
          this.totalRecord = res.data._count
        }
      })
    }

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
  z-index:99;
}
.tit p {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 0 20px;
  box-shadow: 0px 1px 0px 0px rgba(209, 219, 229, 1);
  span{
    cursor: pointer;
    color:#409EFF
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
</style>