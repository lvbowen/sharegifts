<template>
  <div class="app-container">
    <div class="app-header"><span @click="back" class="back"> 返回> </span>活动详情</div>
    <div class="app-main" ref="appMain">
      <el-form class="activityDetailForm" label-width="95px" :label-position="labelPosition"
               status-icon
               ref="createActivityForm">
        <el-form-item label="活动类型:">
          <div>{{data.type | activityTypeFilter}}</div>
        </el-form-item>
        <div v-show="data.type=='1'">
          <div v-show="this.skuType=='1'">
            <el-form-item label="红花:">
              <div>{{sku && sku[0] && sku[0].integral}}红花</div>
            </el-form-item>
            <el-form-item label="运费:">
              <div>{{sku && sku[0] && sku[0].post_fee}}元</div>
            </el-form-item>
            <el-form-item label="商品数量:">
              <div>{{sku && sku[0] && sku[0].stock_num}}</div>
            </el-form-item>
          </div>
          <div v-show="this.skuType=='2'" style="margin-bottom: 25px">
            <el-table :data="sku"
                      tooltip-effect="dark"
                      border fit
                      highlight-current-row
                      :row-style="rowStyle">
              <el-table-column :label="attr[0].attr" v-if="attr && attr[0]" align="center">
                <template slot-scope="scope">
                  {{scope.row.attr_names && scope.row.attr_names.split(',')[0]}}
                </template>
              </el-table-column>
              <el-table-column :label="attr[1].attr" v-if="attr && attr[1]" align="center">
                <template slot-scope="scope">
                  {{scope.row.attr_names && scope.row.attr_names.split(',')[1]}}
                </template>
              </el-table-column>
              <el-table-column :label="attr[2].attr" v-if="attr && attr[2]" align="center">
                <template slot-scope="scope">
                  {{scope.row.attr_names && scope.row.attr_names.split(',')[2]}}
                </template>
              </el-table-column>
              <el-table-column label="规格编码" align="center">
                <template slot-scope="scope">
                  {{scope.row.goods_sku_sn}}
                </template>
              </el-table-column>
              <el-table-column label="红花" align="center">
                <template slot-scope="scope">
                  {{scope.row.integral}}
                </template>
              </el-table-column>
              <el-table-column label="邮费" align="center">
                <template slot-scope="scope">
                  {{scope.row.post_fee}}
                </template>
              </el-table-column>
              <el-table-column label="商品数量" align="center">
                <template slot-scope="scope">
                  {{scope.row.stock_num}}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-show="data.type=='3'">
          <el-form-item label="开奖方式">
            <div>{{data.cj_type | rewardTypeFilter}}</div>
          </el-form-item>
          <el-form-item label="开奖时间" v-if="data.cj_type=='1'">
            <div>{{data.cj_select}}</div>
          </el-form-item>
          <el-form-item label="开奖人数" v-else-if="data.cj_type=='2'">
            <div>{{data.cj_select}}人</div>
          </el-form-item>
          <el-form-item label="中奖概率" v-else-if="data.cj_type=='3'">
            <div>{{data.cj_select}}%</div>
          </el-form-item>
          <el-form-item label="奖品数量">
            <div>{{data.stock_num}}</div>
          </el-form-item>
          <!-- <el-form-item label="说明">
            <div>仅限通过发起者的分享链接参与抽奖</div>
          </el-form-item> -->
          <el-form-item label="自定义内容">
            <div>{{data.cj_custom}}</div>
            <div>{{data.cj_copy}}</div>
          </el-form-item>
        </div>
        <pic-detail :data="data"></pic-detail>
      </el-form>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top @scrollTo="scrollTo" :scTop="scTop" :custom-style="myBackToTopStyle" :visibility-height="300"
                   :back-position="50"
                   transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
  import {getActivityDetail} from '@/api/activityList'
  import {getTextById, ActivityType, ActivityState, rewardType} from '@/utils/enums'
  import PicDetail from '@/components/shareBase/PicDetail'
  import BackToTop from '@/components/shareBase/BackToTop'

  export default {
    name: "ActivityDetail",
    data() {
      return {
        labelPosition: 'right',
        data: {},
        skuType: '',   // 详情页是否展示多规格1：单规格，2：多规格
        attr: [],
        sku: [],
        myBackToTopStyle: {
          right: '70px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        },
        appMain: {},
        scTop: 0
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      // 父组件绝对定位，产生滚动条，监听滚动条距离顶部的距离
      this.appMain = this.$refs.appMain
      this.appMain.addEventListener('scroll', () => {
        this.scTop = this.$refs.appMain.scrollTop
      })
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
    methods: {
      fetchData() {
        let params = {
          id: this.$route.params.id
        }
        getActivityDetail(params).then(res => {
          if (res.code == '000') {
            this.data = res.data
            this.skuType = this.data.sku_type
            this.attr = this.data.attr
            this.sku = this.data.sku
          }
        }).catch(e => {
          console.log(e)
        })
      },
      back() {
        this.$router.back()
      },
      // 点击返回顶部按钮，跳转到顶部
      scrollTo(e) {
        this.$refs.appMain.scrollTo(0, e)
      },
      rowStyle(row) {
        return row.unread ? {fontWeight: 'bold'} : {}
      }
    },
    components: {
      PicDetail,
      BackToTop
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .app-container {
    .app-header {
      width: calc(100% - 20px - 50px);
      margin: 20px;
      .back {
        display: inline-block;
        width: 50px;
        height: 40px;
        text-align: center;
        line-height: 35px;
        cursor: pointer;
        &:hover {
          color: #5AA2E7;
        }
      }
    }
    .app-main {
      position: absolute;
      top: 80px;
      left: 20px;
      right: 50px;
      bottom: 0;
      overflow-y: scroll;
      .activityDetailForm {
        padding: 20px;
      }
    }
  }
</style>
