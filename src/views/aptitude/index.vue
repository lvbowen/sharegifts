<template>
  <div>
    <Header :title="'商户后台'"></Header>
    <div>
      <h4 class="top">商家信息</h4>
      <div class="aptitude bgf">
        <div class="base">
          <div class="base-info c1">
            <div class="base-info-title ft16">
              基本信息
            </div>
            <div class="base-info-content c1 ft14">
              <div>
                <span><span class="star cf">*</span>法人姓名：</span>
                <el-input v-model="name" placeholder="请输入" size="small" style="width:272px"
                          :disabled='ispass'></el-input>
              </div>
              <div style="margin:10px 0">
                <span><span class="star cf">*</span>法人电话：</span>
                <el-input v-model="tel" placeholder="请输入" size="small" style="width:272px"
                          :disabled='ispass'></el-input>
              </div>
              <div style="margin:10px 0">
                <span><span class="star cf">*</span>商户名称：</span>
                <el-input v-model="shopName" placeholder="请输入" size="small" style="width:272px"
                          :disabled='ispass'></el-input>
              </div>
              <div>
                <span><span class="star cf">*</span>公司名称：</span>
                <el-input v-model="companyName" placeholder="公司名请和执照上保持一致" size="small" style="width:272px"
                          :disabled='ispass'></el-input>
              </div>
              <div style="margin-top:10px">
                <span><span class="star cf">*</span>经营类目：</span>
                <el-select v-model="newPerson" placeholder="请选择" size="small" @change="changeCategory"
                           :disabled='ispass'>
                  <el-option
                    v-for="item in category"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="base-info c1">
            <div class="base-info-title ft16">
              资质信息
            </div>
            <div class="base-info-content c1 ft14">
              <div class="df">
                <span style="margin-right:5px"> <span class="star cf">*</span>法人身份证人像面：</span>
                <el-upload
                  :disabled='ispass'
                  class="upload-demo ft14"
                  :action="action"
                  :http-request="uplodID"
                  :show-file-list="false"
                  name="file"
                  accept="image/jpg,image/jpeg, image/png"
                >
                  <img :src="IDFace_url" alt="" class="id-img" v-if="IDFace_url"
                       style="width:160px;height:100px;margin-top:4px;">
                  <div class="id-img no-img" style="width:160px;height:100px;margin-top:4px;flex-direction:column"
                       v-else>
                    <i class="iconfont icon-jiahao c4" style="color:#98A9BF"></i>
                    <p class="c9 ft12" style="margin:2px 0">点击上传</p>
                  </div>
                </el-upload>

              </div>
              <div class="df" style="margin:15px 0">
                <span style="margin-right:5px"> <span class="star cf">*</span>法人身份证国徽面：</span>
                <el-upload
                  :disabled='ispass'
                  class="upload-demo ft14"
                  :action="action"
                  :http-request="uplodIDBack"
                  :show-file-list="false"
                  name="file"
                  accept="image/jpg,image/jpeg, image/png"
                >
                  <img :src="IDBack_url" alt="" class="id-img" v-if="IDBack_url"
                       style="width:160px;height:100px;margin-top:4px;">
                  <div class="id-img no-img" style="width:160px;height:100px;margin-top:4px;flex-direction:column"
                       v-else>
                    <i class="iconfont icon-jiahao c4" style="color:#98A9BF"></i>
                    <p class="c9 ft12" style="margin:2px 0">点击上传</p>
                  </div>
                </el-upload>
              </div>
              <div class="df" style="margin-left:28px">
                <span style="margin-right:5px"> <span class="star cf">*</span>企业营业执照：</span>
                <el-upload
                  :disabled='ispass'
                  class="upload-demo ft14"
                  :action="action"
                  :http-request="uplodLicense"
                  :show-file-list="false"
                  name="file"
                  accept="image/jpg,image/jpeg, image/png"
                >
                  <img :src="license_url" alt="" class="id-img" v-if="license_url"
                       style="width:160px;height:100px;margin-top:4px;">
                  <div class="id-img no-img" style="width:160px;height:100px;margin-top:4px;flex-direction:column"
                       v-else>
                    <i class="iconfont icon-jiahao c4" style="color:#98A9BF"></i>
                    <p class="c9 ft12" style="margin:2px 0">点击上传</p>
                  </div>
                </el-upload>

              </div>

            </div>
          </div>
          <div class="base-info c1" v-show="isShowPermit">
            <div class="base-info-title ft16">
              类目资质
            </div>
            <div class="base-info-content c1 ft14">
              <div class="df" style="margin-left:10px">
                <span style="margin-right:5px"> <span class="star cf">*</span>食品经营许可证：</span>
                <el-upload
                  :disabled='ispass'
                  class="upload-demo ft14"
                  :action="action"
                  :http-request="uplodPermit"
                  :show-file-list="false"
                  name="file"
                  accept="image/jpg,image/jpeg, image/png"
                >
                  <img :src="permit_url" alt="" class="id-img" v-if="permit_url"
                       style="width:160px;height:100px;margin-top:4px;">
                  <div class="id-img no-img" style="width:160px;height:100px;margin-top:4px;flex-direction:column"
                       v-else>
                    <i class="iconfont icon-jiahao c4" style="color:#98A9BF"></i>
                    <p class="c9 ft12" style="margin:2px 0">点击上传</p>
                  </div>
                </el-upload>

              </div>

            </div>
          </div>
        </div>
        <div>
          <el-button type="success" class="submit" size="small" @click="save" v-show="status==-2">提交审核</el-button>
          <el-button type="success" class="submit" size="small" v-show="status==1">审核中</el-button>
          <el-button type="success" class="submit" size="small" v-show="status==2">审核通过</el-button>
          <el-button type="warning" class="submit" size="small" v-show="status==3">冻结</el-button>
          <p class="c9 ft12">注：资质审核通过后不可修改，请仔细核对</p>
        </div>
        <div v-show="status==-1" style="margin-top:10px;">
          <p class="cf ft18">审核不通过</p>
          <p class="ft12 c9">拒绝原因：{{reason}}
            <el-button type="text" size="small" @click="save">重新提交</el-button>
          </p>
        </div>
        <div v-show="status==3" style="margin-top:10px;">
          <p class="ft12 c9">冻结原因：{{reason}}
            <el-button type="text" size="small" @click="save">重新提交</el-button>
          </p>
        </div>

        <!-- <div class="ft14 c1">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;姓名：</span>
            <el-input v-model="name" placeholder="请输入" size="small" style="width:272px"></el-input>
        </div>
        <div class="ft14 c1 tel" >
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机：</span>
            <el-input v-model="tel" placeholder="请输入" size="small" style="width:272px"></el-input>
        </div>
        <div class="ft14 c1">
            <span>公司名称：</span>
            <el-input v-model="companyName" placeholder="公司名请和执照上保持一致" size="small" style="width:272px"></el-input>
        </div>
        <div class="main">
          <el-upload
            class="upload-demo ft14"
            :action="action"
            :http-request ="uplodLicense"
            :show-file-list="false"
            name="file"
            accept="image/jpg,image/jpeg, image/png"
            >
            <a href="javascript:;" class="uplod dib">上传营业执照</a>
            <span class="ft10 license-tip"> 请上传执照副本</span>
          </el-upload>
          <img :src="license_url" alt="" class="license-img" v-if="license_url">
          <div class="license-img no-img" v-else>
              <i class=" iconfont icon-icon--"></i>
          </div>
          <div class="id-card df">
              <div>
                <el-upload
                  class="upload-demo ft14"
                  :action="action"
                  :http-request="uplodID"
                  name="file"
                  :show-file-list="false"
                  accept="image/jpg,image/jpeg, image/png"
                  >
                  <a href="javascript:;" class="uplod dib" style="width:116px">上传身份证正面</a>
                </el-upload>
                <img :src="IDFace_url" alt="" class="id-img" v-if="IDFace_url">
                <div class="id-img no-img" v-else>
                    <i class=" iconfont icon-icon--"></i>
                </div>
              </div>
              <div style="margin-left:80px">
                  <el-upload
                    class="upload-demo ft14"
                    :action="action"
                    :http-request="uplodIDBack"
                    name="file"
                    :show-file-list="false"
                    accept="image/jpg,image/jpeg, image/png"
                    >
                    <a href="javascript:;" class="uplod dib" style="width:116px">上传身份证反面</a>
                  </el-upload>
                  <img :src="IDBack_url" alt="" class="id-img" v-if="IDBack_url">
                  <div class="id-img no-img" v-else>
                    <i class=" iconfont icon-icon--"></i>
                  </div>
              </div>
          </div>
          <div class="ft14 c1" style="margin-left:-74px;margin-top:10px">
            <span>经营类目：</span>
            <el-select v-model="newPerson" placeholder="请选择" size="small" @change="changeCategory">
              <el-option
                v-for="item in category"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
             <div style="margin-left:80px;margin-top:10px" v-show="isShowPermit">
                  <el-upload
                    class="upload-demo ft14"
                    :action="action"
                    :http-request="uplodPermit"
                    name="file"
                    :show-file-list="false"
                    accept="image/jpg,image/jpeg, image/png"
                    >
                    <a href="javascript:;" class="uplod dib" style="width:116px">上传许可证</a>
                  </el-upload>
                  <img :src="permit_url" alt="" class="id-img" v-if="permit_url">
                  <div class="id-img no-img" v-else>
                    <i class=" iconfont icon-icon--"></i>
                  </div>
              </div>
          </div>
          <div>
              <el-button type="success" class="submit" size="small" @click="save" v-show="status==-2">提交审核</el-button>
              <el-button type="success" class="submit" size="small" v-show="status==1">审核中</el-button>
              <el-button type="success" class="submit" size="small" v-show="status==2">审核通过</el-button>
              <el-button type="warning" class="submit" size="small" v-show="status==3">冻结</el-button>
              <p class="c9 ft12">注：资质审核通过后不可修改，请仔细核对</p>
          </div>
          <div  v-show="status==-1" style="margin-top:10px;">
            <p class="cf ft18">审核不通过</p>
            <p class="ft12 c9">{{reason}} xxxxxxxxxxxxxxxxxxxxxxxxxx<el-button type="text" size="small" @click="save">重新提交</el-button>再次申请</p>
          </div>
          <div  v-show="status==3" style="margin-top:10px;">
            <p class="ft12 c9">{{reason}} xxxxxxxxxxxxxxxxxxxxxxxxxx<el-button type="text" size="small" @click="save">重新提交</el-button>再次申请</p>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
  import Header from '@/components/shareBase/Header'
  import {mapState} from "vuex";

  export default {
    data() {
      return {
        action: this.$api.qiNiuUpload,
        header: "",
        name: "",
        tel: "",
        companyName: "",
        shopName: "",//商户名称
        img:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529647402466&di=d754a753ddb58eef176539afe2853947&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201501%2F14%2F20150114145326_sQPjW.jpeg",
        license_url: "",
        IDBack_url: "",
        IDFace_url: "",
        category: [
          {label: "生鲜/食品", value: "生鲜/食品"},
          {label: "母婴", value: "母婴"},
          {label: "家居", value: "家居"},
          {label: "美妆/个人", value: "美妆/个人"},
          {label: "服饰", value: "服饰"},
          {label: "其他", value: "其他"},

        ],
        newPerson: "生鲜/食品",
        permit_url: "",
        status: -2,
        reason: "", //拒绝原因,
        isShowPermit: false,
        ispass: false
      };
    },
    mounted() {
      this.isShowPermit = this.newPerson == "生鲜/食品" ? true : false;
      this.init();
    },
    methods: {
      // 上传执照
      uplodLicense(req) {
        this.$upload(req, "default", data => {
          this.license_url = this.$api.qiNiuUrl + "/" + data.key;
        });
      },
      // 上传身份证背面
      uplodIDBack(req) {
        this.$upload(req, "default", data => {
          this.IDBack_url = this.$api.qiNiuUrl + "/" + data.key;
        });
      },
      // 上传身份证正面
      uplodID(req) {
        this.$upload(req, "default", data => {
          this.IDFace_url = this.$api.qiNiuUrl + "/" + data.key;
        });
      },
      // 上传许可证
      uplodPermit(req) {
        this.$upload(req, "default", data => {
          this.permit_url = this.$api.qiNiuUrl + "/" + data.key;
        });
      },
      // 更改类目
      changeCategory() {
        this.isShowPermit = this.newPerson == "生鲜/食品" ? true : false
      },
      // 审核
      save() {
        if (!this.name || !this.companyName || !this.tel || !this.shopName) {
          this.$message.error("请完善审核信息");
          return;
        }
        if (!/^1[3457896]\d{9}$/.test(this.tel)) {
          this.$message.error("手机号码填写有误");
          return;
        }
        if (!this.license_url || !this.IDFace_url || !this.IDBack_url) {
          this.$message.error("必须上传营业执照、身份证正反面");
          return;
        }
        if (this.isShowPermit && !this.permit_url) {
          this.$message.error("生鲜食品类目，必须上传许可证");
          return;
        }

        var params = {
          user_name: this.name,
          phone: this.tel,
          company_name: this.companyName,
          license_pic: this.license_url,
          id_face: this.IDFace_url,
          id_back: this.IDBack_url,
          permit_pic: this.permit_url || "",
          category: this.newPerson,
          shop_name: this.shopName
        };
        this.$post(this.$api.aptitude, params).then(res => {
          if (res.code == "000") {
            this.$message.success(res.msg);
            this.init();
          }
        });
      },
      // 初始化
      init() {
        this.$get(this.$api.aptitudeDetail, {}).then(res => {
          if (res.code == "000" && res.data.user_name && res.data.company_name) {
            this.name = res.data.user_name;
            this.tel = res.data.phone;
            this.companyName = res.data.company_name;
            this.license_url = res.data.license_pic;
            this.IDFace_url = res.data.id_face;
            this.IDBack_url = res.data.id_back;
            this.status = res.data.status;
            this.reason = res.data.reason;
            this.permit_url = res.data.permit_pic;
            this.isShowPermit = this.permit_url ? true : false;
            this.newPerson = res.data.category
            this.shopName = res.data.shop_name
          }
          if (this.status == '2' || this.status == '1') {
            this.ispass = true;
          }
        });
      }
    },
    components: {
      Header
    }
  };
</script>
<style lang="less" scoped>
  .top {
    height: 40px;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 30px;
  }

  .base-info {
    // height: 100px;
    border: 1px solid #e6e6e6;
    margin-top: 20px;
    .base-info-title {
      line-height: 40px;
      border-bottom: 1px solid #e6e6e6;
      background-color: #eaf4fe;
      padding-left: 20px;
    }
    .base-info-content {
      padding: 20px;
    }
    .star {
      margin: 0 2px;

    }
  }

  .aptitude {
    padding: 10px 28px 40px;
  }

  .tel {
    height: 80px;
    line-height: 80px;
  }

  .main {
    margin-left: 74px;
    padding-top: 32px;
    .uplod {
      border: 1px solid #5cb3ff;
      border-radius: 4px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      width: 102px;
      color: #5cb3ff;
    }
    .license-tip {
      color: #98a9bf;
    }
    .license-img {
      width: 200px;
      height: 276px;
      border: 1px solid #e6e6e6;
      margin: 24px 0 32px;
    }
    .id-img {
      width: 296px;
      height: 184px;
      border: 1px solid #e6e6e6;
      margin-top: 20px;
    }
    .submit {
      background-color: #49cc93;
      margin-top: 40px;
      margin-bottom: 16px;
    }
    .no-img {
      background-color: #eaf4fe;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 40px;
        color: #fbfdff;
      }
    }
  }

  .c1 {
    color: #1f2d3d;
  }
</style>

