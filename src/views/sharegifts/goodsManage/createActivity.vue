<template>
  <div class="app-container">
    <div class="app-header"><span @click="back" class="back"> 返回> </span>创建活动</div>
    <div class="appwrapper" ref="appMain">
      <div class="app-neck">
        <el-form class="createActivityForm" label-width="110px" :label-position="labelPosition"
                 :model="createActivityForm"
                 status-icon
                 :rules="createActivityRules"
                 ref="createActivityForm">
          <el-form-item label="活动类型" prop="goodType">
            <el-radio-group v-model="createActivityForm.activityType">
              <el-radio :label="1" border>一口价</el-radio>
              <el-radio :label="2" border>抽奖</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-show="createActivityForm.activityType=='1'">
            <div v-show="createActivityForm.sku_type=='1'">
              <el-form-item>
                <ul class="activityParams">
                  <li>红花</li>
                  <li>运费</li>
                  <li>商品数量</li>
                </ul>
              </el-form-item>
              <el-form-item>
                <ul class="setActivityParams">
                  <li>
                    <el-input
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                      v-model="createActivityForm.integral" placeholder="输入红花" clearable></el-input>
                  </li>
                  <li>
                    <el-input
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                      v-model="createActivityForm.freight" clearable></el-input>
                  </li>
                  <li>
                    <el-input
                      onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                      onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                      v-model="createActivityForm.goodsAmount" clearable></el-input>
                  </li>
                </ul>
              </el-form-item>
            </div>
            <div v-show="createActivityForm.sku_type=='2'">
              <el-form-item>
                <el-table :data="sku" border style="width: 100%"
                          @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55" align="center">
                  </el-table-column>
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
                  <el-table-column prop="sku_sn" label="规格编码" align="center">
                    <template slot-scope="scope">
                      {{scope.row.goods_sku_sn}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="integral" label="红花(朵)" label-class-name="require" align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                                v-model.number="scope.row.integral"
                                :disabled="!selectedIndexArr.includes(scope.$index)"
                                clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="post_fee" label="邮费(元)" label-class-name="require" align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^0-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                                v-model.number="scope.row.post_fee"
                                :disabled="!selectedIndexArr.includes(scope.$index)"
                                clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="stock_num" label="商品数量" label-class-name="require" align="center">
                    <template slot-scope="scope">
                      <el-input size="small"
                                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                                v-model.number="scope.row.stock_num"
                                :disabled="!selectedIndexArr.includes(scope.$index)"
                                clearable></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </div>
          <div v-show="createActivityForm.activityType=='2'">
            <el-form-item label="开奖方式">
              <el-radio-group v-model="createActivityForm.rewardType">
                <el-radio :label="1">定时开奖</el-radio>
                <el-radio :label="2">满人开奖</el-radio>
                <el-radio :label="3">直接开奖</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开奖时间" v-show="createActivityForm.rewardType=='1'">
              <el-date-picker
                v-model="createActivityForm.rewardTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
                placeholder="选择日期" clearable>
              </el-date-picker>
            </el-form-item>
            <el-form-item label="开奖人数" v-show="createActivityForm.rewardType=='2'">
              <el-input
                v-model="createActivityForm.personNum"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                onafterpaste="this.value=this.value.replace(/\D/g,'')"
                placeholder="请输入开奖人数" style="width: 220px;" clearable></el-input>
              人
            </el-form-item>
            <el-form-item label="中奖概率" v-show="createActivityForm.rewardType=='3'">
              <el-input
                v-model="createActivityForm.rewardPercent"
                onkeyup="this.value=this.value.replace(/\D/g,'');if(this.value>100){this.value = 100}"
                onafterpaste="this.value=this.value.replace(/\D/g,'')"
                placeholder="请输入中奖概率"
                style="width: 220px;" clearable></el-input>
              %
            </el-form-item>
            <el-form-item label="中奖人数" prop="stockNum">
              <el-input
                v-model="createActivityForm.stockNum"
                onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
                onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}"
                placeholder="请输入中奖人数" style="width: 220px;" clearable></el-input>
              人
            </el-form-item>
            <el-form-item>
              <p>请选择商品规格(单选)</p>
              <el-table :data="sku" border style="width: 100%">
                <el-table-column label="" width="50">
                  <template slot-scope="scope">
                    <el-radio :label="scope.$index" v-model="createActivityForm.radio"
                              @change.native="getCurrentRow(scope.$index)">&nbsp;
                    </el-radio>
                  </template>
                </el-table-column>
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
                <el-table-column prop="sku_sn" label="规格编码" align="center">
                  <template slot-scope="scope">
                    {{scope.row.goods_sku_sn}}
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <!-- <el-form-item>
              <el-checkbox v-model="createActivityForm.guide">引导用户查看本商品关联的其他活动</el-checkbox>
            </el-form-item> -->
            <el-form-item label="自定义(选填)" prop="copyContent">
              <el-input v-model="createActivityForm.buyType" placeholder="可设置直接购买方式" style="width: 350px;"
                        onkeyup="if(this.value.length>200){this.value = this.value.substr(0,200)}"
                        clearable
              ></el-input>
              <br>
              <div style="margin-top: 5px;">
                <el-checkbox v-model="createActivityForm.isCopy">一键复制内容</el-checkbox>
                <el-input v-model="createActivityForm.copyContent" placeholder="如淘口令、微信号"
                          style="width: 239px;" clearable></el-input>
              </div>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="applyPublish('createActivityForm')">申请发布</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="app-body">
        <el-form class="createActivityForm" label-width="110px" :label-position="labelPosition"
                 status-icon>
          <pic-detail :data="data"></pic-detail>
        </el-form>
      </div>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top @scrollTo="scrollTo" :scTop="scTop" :custom-style="myBackToTopStyle" :visibility-height="300"
                   :back-position="50"
                   transition-name="fade"/>
    </el-tooltip>
  </div>
</template>

<script>
  import {getSkuList} from '@/api/goodsManage'
  import {createActivity, createRewardActivity} from '@/api/activityList'
  import {getGoodDetail} from '@/api/goodsManage'
  import PicDetail from '@/components/shareBase/PicDetail'
  import BackToTop from '@/components/shareBase/BackToTop'

  export default {
    name: "CreateActivity",
    data() {
      return {
        labelPosition: 'right',
        createActivityForm: {
          id: '',                  // 商品id
          activityType: 1,        // 活动类型
          sku_type: '',           // 是否多规格 ?
          integral: '',           // 红花
          freight: '',            // 运费
          goodsAmount: '',        // 商品数量
          rewardType: 1,          // 开奖方式
          rewardTime: '',         // 开奖时间
          personNum: '',          // 中奖人数
          rewardPercent: '',       // 中奖概率
          stockNum: '',             // 库存
          // guide: false,           // 引导用户开关
          buyType: '',            // 购买方式
          isCopy: false,          //一键复制内容
          copyContent: '',        // 复制内容
          radio: '',               // 抽奖单选选中的序号
          radioContent: {}        // 抽奖单选选中的对象
        },
        createActivityRules: {
          stockNum: [{required: true, message: '请填写中奖人数!', trigger: 'blur'}]
        },
        multipleSelection: [],  // 表格多选后所有行的值
        data: {},
        attr: [],
        sku: [],
        skuArr: [],    // 单规格
        skuList: [],
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
        scTop: 0,
        selectedIndexArr: [],  // 多规格表格第几行被选中序号数组
        selectedItemArr: []   // 表格中被选中的项
      }
    },
    watch: {
      radio(newVal) {
        console.log(newVal)
      }
    },
    created() {
      // 跳转到详情页后获取商品的id
      this.createActivityForm.id = this.$route.params.id
      this.fetchData()
    },
    mounted() {
      // 父组件绝对定位，产生滚动条，监听滚动条距离顶部的距离
      this.appMain = this.$refs.appMain
      this.appMain.addEventListener('scroll', () => {
        this.scTop = this.$refs.appMain.scrollTop
      })
      this.fetchData()
    },
    methods: {
      // 根据id获取活动详情页的数据
      fetchData() {
        let params = {
          id: this.createActivityForm.id
        }
        getGoodDetail(params).then(res => {
          if (res.code == '000') {
            this.data = res.data
            this.createActivityForm.sku_type = this.data.sku_type
            this.attr = this.data.attr
            this.sku = this.data.sku
          }
        }).catch(e => {
          console.log(e)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        // 生成表格选中的数组
        this.selectedIndexArr = []
        let _this = this
        val.forEach((val, index) => {
          _this.sku.forEach((v, i) => {
            // id 是每一行的数据id
            if (val.sku_id == v.sku_id) {
              this.selectedIndexArr.push(i)
            }
          })
        })
      },
      // 申请发布活动
      applyPublish() {
        if (this.createActivityForm.activityType == '1') {
          this.selectedItemArr = []
          // 对象数组的深拷贝，去除一些不必要的属性
          this.skuList = JSON.parse(JSON.stringify(this.sku))
          this.skuList.forEach((item, index) => {
            this.selectedIndexArr.forEach((v, i) => {
              if (index == v) {
                this.selectedItemArr.push(item)
              }
            })
          })
          this.selectedItemArr.forEach(item => {
            item.goods_sku_id = item.sku_id
            delete item.sku_id
            delete item.attr_ids
            delete item.attr_names
            delete item.goods_sku_sn
            delete item.goods_sku_title
          })
          if (this.createActivityForm.sku_type == '1') {
            let params = {
              goods_id: this.createActivityForm.id,
              type: this.createActivityForm.activityType,
              sku_type: 1,
              integral: this.createActivityForm.integral,
              post_fee: this.createActivityForm.freight,
              stock_num: this.createActivityForm.goodsAmount,
              sku: JSON.stringify([{
                // goods_sku_id: this.data.sku_id,
                goods_sku_id: this.data.sku[0].sku_id,
                post_fee: this.createActivityForm.freight,
                integral: this.createActivityForm.integral,
                stock_num: this.createActivityForm.goodsAmount
              }])
            }
            if (!this.createActivityForm.integral || !this.createActivityForm.freight || !this.createActivityForm.goodsAmount) {
              this.$message.error('请填写完整信息!')
              return
            }
          
            createActivity(params).then(res => {
              if (res.code == '000') {
                this.$message.success('创建活动成功!')
                this.$router.push('/activityList')
              } else {
                this.$message.warning(res.msg)
              }
            })
          } else if (this.createActivityForm.sku_type == '2') {
            let params = {
              goods_id: this.createActivityForm.id,
              type: this.createActivityForm.activityType,
              sku_type: 2,
              sku: JSON.stringify(this.selectedItemArr)
            }
            if (!this.selectedItemArr.length) {
              this.$message.error('请至少选择一种规格属性!')
              return
            }
            for (let i = 0; i < this.selectedItemArr.length; i++) {
              if (Object.keys(this.selectedItemArr[i]).length < 4) {
                this.$message.error('请输入完整的规格属性!')
                return
              }
              for (let j in this.selectedItemArr[i]) {
                if (this.selectedItemArr[i][j] === '') {
                  this.$message.error('请输入完整的规格属性!')
                  return
                }
              }
            }
            createActivity(params).then(res => {
              if (res.code == '000') {
                this.$message.success('创建活动成功!')
                this.$router.push('/activityList')
              } else {
                this.$message.warning(res.msg)
              }
            })
          }
        } else if (this.createActivityForm.activityType == '2') {
          this.$refs.createActivityForm.validate((valid) => {
            if (valid) {
              if(this.createActivityForm.rewardType == 2&&this.createActivityForm.personNum<this.createActivityForm.stockNum){
                this.$message.error('中奖人数不得大于开奖人数！')
                return
              }
              if (this.createActivityForm.rewardType == 1 && !this.createActivityForm.rewardTime) {
                this.$message.error('请选择开奖时间!')
                return
              } else if (this.createActivityForm.rewardType == 2 && !this.createActivityForm.personNum) {
                this.$message.error('请填写开奖人数!')
                return
              } else if (this.createActivityForm.rewardType == 3 && !this.createActivityForm.rewardPercent) {
                this.$message.error('请填写中奖概率!')
                return
              } else if (this.createActivityForm.radio === '') {
                this.$message.error('请选择商品规格!')
                return
              }
              let params = {
                goods_id: this.createActivityForm.id,
                sku_type: this.createActivityForm.sku_type,
                goods_sku_id: this.createActivityForm.radioContent.sku_id,
                stock_num: this.createActivityForm.stockNum,
                cj_type: this.createActivityForm.rewardType,
                cj_select: this.selectVal(),
                // cj_is_guide: this.createActivityForm.guide ? 1 : 0,
                cj_custom: this.createActivityForm.buyType,
                cj_copy: this.createActivityForm.isCopy ? this.createActivityForm.copyContent : ''
              }
              createRewardActivity(params).then(res => {
                if (res.code == '000') {
                  this.$message.success(res.msg)
                  this.$router.push('/activityList')
                } else {
                  this.$message.error(res.msg)
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          })
        }
      },
      selectVal() {
        if (this.createActivityForm.rewardType == '1') {
          return this.createActivityForm.rewardTime
        } else if (this.createActivityForm.rewardType == '2') {
          return this.createActivityForm.personNum
        } else if (this.createActivityForm.rewardType == '3') {
          return this.createActivityForm.rewardPercent
        }
      },
      getCurrentRow(index) {
        this.createActivityForm.radioContent = this.sku[index]
      },
      cancel() {
        this.$router.back()
      },
      back() {
        this.$router.back()
      },
      // 点击返回顶部按钮，跳转到顶部
      scrollTo(e) {
        this.$refs.appMain.scrollTo(0, e)
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
    .app-header, .app-neck, .app-body {
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

    .appwrapper {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: auto;
      .app-neck {
        padding-bottom: 1px;
        .createActivityForm {
          padding-top: 20px;
          .activityParams > li {
            float: left;
            width: 155px;
            height: 44px;
            padding-left: 20px;
            line-height: 44px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(96, 98, 102, 1);
            background: rgba(244, 246, 249, 1);
            border-radius: 4px 4px 0 0;
          }
          .setActivityParams > li {
            float: left;
            width: 135px;
            height: 32px;
            margin-left: 20px;
          }
        }
      }
      .app-body {
        .createActivityForm {
          padding-top: 20px;
          .desc {
            font-size: 14px;
            font-weight: 400;
            color: rgba(96, 98, 102, 1);
          }
          .mainPic, .loopPic > li {
            width: 148px;
            height: 148px;
            border: 1px solid #ccc;
          }
          .loopPic > li {
            float: left;
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
