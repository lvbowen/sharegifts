<template>
  <div class="details">
    <div class="tit">
      <p>高返 / <span @click="goBackList">活动列表</span> / <span @click="back"> 审核 </span>/ 审核详情</p>
    </div>
    <div class="containers">
      <div class="innerContainer">
        <div class="addContainer">
          <div class="mainBox">
            <div class="mainTitle">基本信息</div>
            <div class="mainShow">
              <div class="left">昵称 ：</div>
              <div class="right">{{checkInfo.nickname}}</div>
            </div>
            <div class="mainShow">
              <div class="left">淘宝号/京东号 ：</div>
              <div class="right">{{checkInfo.account}}</div>
            </div>
            <div class="mainShow">
              <div class="left">店铺 ：</div>
              <div class="right">{{checkInfo.active_info.shop_name}}</div>
            </div>
            <div class="mainShow">
              <div class="left">商品标题 ：</div>
              <div class="right">{{checkInfo.active_info.goods_name}}</div>
            </div>
            <div class="mainShow">
              <div class="left">商品主图：</div>
              <div class="right">
                <img :src="checkInfo.active_info.item_cover_image" alt="">
              </div>
            </div>

            <div class="mainShow">
              <div class="left">商品金额 ：</div>
              <div class="right">{{checkInfo.active_info.price}}</div>
            </div>
            <div class="mainShow">
              <div class="left">返现金额 ：</div>
              <div class="right">{{checkInfo.active_info.return}}</div>
            </div>
            <div class="mainShow">
              <div class="left">订单编号：</div>
              <div class="right">{{checkInfo.order_id}}</div>
            </div>
          </div>
          <div class="mainBox">
            <div class="mainTitle">上传的截图</div>
            <div class="mainShow">
              <div class="left">货比三家关键词截图 ：</div>
              <div class="right">
                <img :src="this.compareArr.link1" alt="">
                <img :src="this.compareArr.link2" alt="">
                <img :src="this.compareArr.link3" alt="">
              </div>
            </div>

            <div class="mainShow" v-if="checkInfo.concern_shop">
              <div class="left">收藏店铺截图 ：</div>
              <div class="right">
                <img :src="checkInfo.concern_shop" alt="" @click='showImg(checkInfo.concern_shop)'>
              </div>
            </div>

            <div class="mainShow" v-if="checkInfo.collection_goods">
              <div class="left">收藏宝贝截图 ：</div>
              <div class="right">
                <img :src="checkInfo.collection_goods" alt="" @click='showImg(checkInfo.collection_goods)'>
              </div>
            </div>
            <div class="mainShow" v-if="checkInfo.five_star_praise">
              <div class="left">五星好评截图 ：</div>
              <div class="right">
                <img :src="checkInfo.five_star_praise" alt="" @click='showImg(checkInfo.five_star_praise)'>
              </div>
            </div>
            <div class="mainShow" v-if="checkInfo.buyer_show">
              <div class="left">买家秀截图 ：</div>
              <div class="right">
                <img :src="checkInfo.buyer_show" alt="" @click='showImg(checkInfo.buyer_show)'>
              </div>
            </div>

            <div class="mainShow" v-if="checkInfo.share_friends">
              <div class="left">分享朋友圈截图 ：</div>
              <div class="right">
                <img :src="checkInfo.share_friends" alt="" @click='showImg(checkInfo.share_friends)'>
              </div>
            </div>
          </div>
          <div class="mainBox btnBox">
            <div class="mainShow">
              <div class="left"></div>
              <div class="right">
                <el-button type="primary" @click="agree">同意</el-button>
                <el-button type="info" @click="viewDialog=true">拒绝</el-button>
                <el-button @click="back">返回</el-button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
    <el-dialog title="大图浏览" :visible.sync="imgDialogVisible" width="30%" center>
      <img :src="imgDialogUrl" alt="" width="80%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="imgDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 审核拒绝 -->
    <el-dialog :title="activeTit" :visible.sync="viewDialog" width="30%">
      <el-input type="textarea" v-model="refuseText"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refuse()" type="primary">确认</el-button>
        <el-button @click="viewDialog = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { agreeReturn, refuseReturn } from "@/api/scrm/activity"
export default {
  data () {
    return {
      imgDialogUrl: '',
      imgDialogVisible: false,
      checkInfo: {},
      compareArr: {},
      viewDialog: false,
      activeTit: '',
      refuseText: ''
    }
  },
  created () {
    this.checkInfo = JSON.parse(sessionStorage.getItem('chekObj'))
    this.activeTit = this.checkInfo.active_info.active_name
    this.compareArr = JSON.parse(this.checkInfo.active_info.goods_compared)
  },
  methods: {
    showImg (url) {
      this.imgDialogUrl = url
      this.imgDialogVisible = true

    },
    agree () {
      let id = JSON.parse(sessionStorage.getItem('chekObj')).id;
      agreeReturn({ id: id }).then(res => {
        if (res.success) {
          this.$message.success(res.msg)
        }
      })
    },
    refuse () {
      let id = JSON.parse(sessionStorage.getItem('chekObj')).id;
      refuseReturn({ id: id, refuse_cause: this.refuseText }).then(res => {
        if (res.success) {
          this.viewDialog = false
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    goBackList(){
      this.router.push({
        path:'/activity'
      })
    },
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.details {
  position: relative;
  height: 100%;
  width: 100%;
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
    p {
      height: 100%;
      background: rgba(255, 255, 255, 1);
      padding: 0 20px;
      box-shadow: 0px 1px 0px 0px rgba(209, 219, 229, 1);
      span{
        cursor: pointer;
        color:#409EFF;
      }
    }
  }
  .containers {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 80px 40px 40px;
    box-sizing: border-box;

    .innerContainer {
      height: 100%;
      background: #f4f6f9;
      overflow-y: scroll;
      .addContainer {
        padding: 20px;
        background: #fff;
        .mainBox {
          margin-bottom: 14px;
          background: #fff;
          overflow: hidden;
          .mainTitle {
            font-size: 14px;
            color: #333;
            border-bottom: 1px solid #e6e6e6;
            padding: 15px 20px;
            box-sizing: border-box;
            margin-bottom: 30px;
          }
          .mainShow {
            display: flex;
            margin-bottom: 30px;
            .left {
              flex: 0 0 200px;
              text-align: right;
              color: #666;
              font-size: 14px;
            }
            .right {
              flex: 1;
              color: #666;
              font-size: 14px;
              margin-left: 40px;
              display: flex;
              img {
                width: 180px;
                height: 180px;
                margin-right: 30px;
              }
            }
          }
        }
        .btnBox {
          margin: 30px;
          button {
            margin-right: 30px;
          }
        }
      }
    }
  }
}
</style>