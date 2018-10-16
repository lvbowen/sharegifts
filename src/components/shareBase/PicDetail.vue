<template>
  <div>
    <el-form-item label="商品类目:">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>{{data.first && data.first.cate_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{data.second && data.second.cate_name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-form-item>
    <el-form-item label="商品标题:">
      <div>{{data.title}}</div>
    </el-form-item>
    <el-form-item label="商品规格:" v-show="data.type=='3'">
      <div>{{data.sku && data.sku[0] && data.sku[0].attr_names}}</div>
    </el-form-item>
    <el-form-item label="商品编码:">
      <div>{{data.goods_sn}}</div>
    </el-form-item>
    <el-form-item label="商品图片">
      <div class="desc">商品主图</div>
      <div class="mainPic"><img :src="data.main_pic" alt=""></div>
      <div class="desc">商品轮播图（限5张）</div>
      <ul class="loopPic">
        <li v-for="(item,index) of loopList" :key="index"><img :src="item" alt=""></li>
      </ul>
    </el-form-item>
    <el-form-item label="商品详情">
      <div v-html="data.description"></div>
    </el-form-item>
  </div>
</template>

<script>

  export default {
    name: "PicDetail",
    props: {
      data: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      loopList() {
        return this.data.pics && this.data.pics.split(',')
      }
    },
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .desc {
    font-size: 14px;
    font-weight: 400;
    color: rgba(96, 98, 102, 1);
  }

  .mainPic, .loopPic > li {
    width: 148px;
    height: 148px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .loopPic > li {
    float: left;
    margin-right: 20px;
  }
</style>
