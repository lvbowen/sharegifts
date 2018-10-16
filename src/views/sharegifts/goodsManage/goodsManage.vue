<template>
  <div class="app-container">
    <div class="app-header">商品管理</div>
    <div class="app-main">
      <div class="search-bar search">
        <el-form :inline="true" :model="searchObj">
          <el-form-item>
            <el-input v-model="searchObj.goodName" placeholder="商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="searchObj.goodNum" placeholder="商品编码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="search-bar">
        <el-button type="primary" @click="addGood">新建商品</el-button>
        <el-button type="primary" @click="importGoods">从优选商品库导入</el-button>
      </div>
      <el-table class="table"
                :data="list" tooltip-effect="dark" v-loading.body="listLoading"
                element-loading-text="拼命加载中" border fit
                highlight-current-row
                @row-dblclick="dblclickOnRow" @current-change="rowChange" :row-style="rowStyle" @row-click="clickOnRow">
        <el-table-column label='商品信息' show-overflow-tooltip align="left">
          <template slot-scope="scope">
            <img :src="scope.row.main_pic" alt="" style="width: 48px;height: 48px">
            {{scope.row.title}}
          </template>
        </el-table-column>
        <el-table-column label="商品编码" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.goods_sn}}
          </template>
        </el-table-column>
        <el-table-column label="销量" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.sale_num}}
          </template>
        </el-table-column>
        <el-table-column label="进行中的活动" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{scope.row.activity}}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center" width="250">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editor(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
            <el-button type="success" size="mini" @click="createActivity(scope.row.id)">创建活动</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handlePageNumChange"
                     :current-page="searchObj.page"
                     :page-sizes="[8,10,12]"
                     :page-size='searchObj.pageSize'
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRecord">
      </el-pagination>
    </div>
    <el-dialog title="导入优选商品" :visible.sync="dialogFormVisible" :before-close="ai_dialog_close" width="700px">
      <div class="search-bar">
        <el-form :inline="true" :model="searchObj">
          <el-form-item>
            <el-input v-model="searchObj.goodTitle" size="small" placeholder="商品名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="searchBtn" type="text" size="small" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" size="small" @click="confirm">确认导入</el-button>
          </el-form-item>
        </el-form>
        <div class="goodList">
          <div style="max-height: 400px;overflow: auto;">
            <el-table :data="importList"
                      tooltip-effect="dark"
                      border fit
                      highlight-current-row
                      @selection-change="handleSelectionChange"
                      @current-change="rowChange"
                      :row-style="rowStyle">
              <el-table-column
                type="selection"
                width="55"
                :selectable="calSelectable"
              >
              </el-table-column>
              <el-table-column label='主图' show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <img :src="scope.row.main_pic" alt="" style="width: 48px;height: 48px;">
                </template>
              </el-table-column>
              <el-table-column label='信息' show-overflow-tooltip align="left">
                <template slot-scope="scope">
                  {{scope.row.title}}<br>
                  {{scope.row.status}}
                </template>
              </el-table-column>
              <el-table-column label="状态" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  <el-button size="small" @click="singelImport">{{scope.row.is_store=='1'?'已导入':'导入'}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <el-pagination @size-change="handleImportSizeChange" @current-change="handleImportPageNumChange"
                         :current-page="searchObj.importPage"
                         :page-size='searchObj.importPageSize'
                         layout="total, prev, pager, next, jumper"
                         :total="inportTotalRecord">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <transition name="slide">
      <div class="XCXcodeWrapper" v-show="showCodeFlag">
        <BindXCX :codeUrl="codeUrl"></BindXCX>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getGoodsList, deleteGood, getCode, importGoodsList, importGoods} from "@/api/goodsManage"
  import {getUserInfo} from '@/api/user'
  import {setToken} from '@/utils/auth'
  import BindXCX from '@/components/shareBase/BindXCX'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "GoodsManage",
    data() {
      return {
        currentRow: null,
        totalRecord: 0,
        inportTotalRecord: 0,
        list: [],
        listLoading: false,
        searchObj: {
          page: 1,
          pageSize: 8,
          goodName: '',
          goodNum: '',
          importPage: 1,
          importPageSize: 8,
          goodTitle: ''
        },
        dialogFormVisible: false,
        checkList: [],    // 导入选中商品列表
        codeUrl: '',  // 小程序二维码
        showCodeFlag: false,
        importList: [],            // 导入商品列表
        multipleSelection: [],
        curSelect: {},
        ids: []    // 多选时商品id数组
      }
    },
    filters: {},
    created() {
      let tokenInfo = window.location.search
      if (tokenInfo) {
        let tokenArr = tokenInfo.split('=')
        setToken(tokenArr[1])
        this.setToken(tokenArr[1])
      }
      this.fetchData()
      this.getCode()
      this.$store.dispatch('GetUserInfo').then(res => {
        // let isCredential = res.data.is_credential
        // if (isCredential != '2') {
        //   this.$router.push('/aptitude')
        //   this.$message.warning('请先完善商家信息!')
        // }
      })
      this.fetchImportData()
    },
    computed: {
      ...mapGetters(['avatar', 'nickName'])
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
      ...mapMutations({
        setToken: 'SET_TOKEN'
      }),
      fetchData() {
        this.listLoading = true
        let params = {
          page: this.searchObj.page,
          limit: this.searchObj.pageSize,
          name: this.searchObj.goodName,
          goods_sn: this.searchObj.goodNum
        }
        getGoodsList(params).then(res => {
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
      fetchImportData() {
        let params = {
          page: this.searchObj.importPage,
          limit: this.searchObj.importPageSize,
          title: this.searchObj.goodTitle
        }
        importGoodsList(params).then(res => {
          if (res.code == '000') {
            this.importList = res.data.data
            this.inportTotalRecord = parseInt(res.data.total)
          } else {
            this.importList = []
            this.inportTotalRecord = 0
          }
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
      handleImportSizeChange(val) {
        this.searchObj.importPageSize = val
        this.fetchImportData()
      },
      handleImportPageNumChange(val) {
        this.searchObj.importPage = val
        this.fetchImportData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        this.curSelect = val[val.length - 1]
        this.ids = []
        this.multipleSelection.forEach(item => {
          this.ids.push(item.id)
        })
      },
      search() {
        this.fetchData()
      },
      addGood() {
        this.$router.push({
          name: 'AddGood',
          query: {
            isEdit: false
          }
        })
      },
      // 导入优选商品
      importGoods() {
        this.dialogFormVisible = true
      },
      editor(id) {
        this.$router.push({
          name: 'AddGood',
          query: {
            id: id,
            isEdit: true
          }
        })
      },
      deleteItem(id) {
        this.$confirm('是否确定删除该商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            id: id
          }
          deleteGood(params).then(res => {
            if (res.code == '000') {
              this.$message.success('删除成功!')
              this.fetchData()
            } else {
              this.$message.warning('删除失败!')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getCode() {
        getCode().then(res => {
          if (res.code == '000') {
            this.codeUrl = res.data.url
          }
        })
      },
      createActivity(id) {
        if (!this.nickName) {
          this.showCodeFlag = true
          return
        }
        this.$router.push({
          name: 'CreateActivity',
          params: {
            id: id
          }
        })
      },
      query() {
        this.fetchImportData()
      },
      calSelectable(row) {
        if (row.is_store == '1') {
          return false
        } else {
          return true
        }
      },
      confirm() {
        if (!this.multipleSelection.length) {
          this.$message.error("请至少选择一件商品!")
          return
        }
        let params = {
          id: this.ids.toString()
        }
        importGoods(params).then(res => {
          if (res.code == '000') {
            this.$message.success('导入商品成功!')
            this.dialogFormVisible = false
            this.fetchData()
            this.fetchImportData()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      singelImport() {
        if (!this.curSelect.id) {
          this.$message.error("请先选择该商品!")
          return
        }
        let params = {
          id: this.curSelect.id
        }
        importGoods(params).then(res => {
          if (res.code == '000') {
            this.$message.success('导入商品成功!')
            this.dialogFormVisible = false
            this.fetchData()
            this.fetchImportData()
            this.curSelect = {}
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      ai_dialog_close() {
        this.dialogFormVisible = false
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
      BindXCX
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
    .goodList {
      overflow: auto;
      min-height: 228px;
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
  }

</style>
