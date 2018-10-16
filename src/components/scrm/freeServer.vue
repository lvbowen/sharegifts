/*
* 免费服务
* creater：gaoyue
*/
<template>
  <div class="mainBox">
    <div class="mianTit">
      <div>
        <span class="order">1</span>
        <span class="titText">免费服务</span>
      </div>
      <div class="editIcon" v-show="isShowEdit" @click="isShowEdit=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEdit">
      <div class="severCheckBox">
        <el-form ref="form" :model="form" label-width="160px" :rules="rules">
          <div v-for="item in serverArr">
            <div class="checkBox" @click="item.isfold=!item.isfold">
              <el-checkbox v-model="item.checked" v-bind:disabled="item.text!='指定竞品货比'">{{item.text}}</el-checkbox>
              <span class="foldBtn" v-if="item.isfold">点我展开
                <i class="el-icon-arrow-down"></i>
              </span>
              <span class="foldBtn" v-if="!item.isfold">点我关闭
                <i class="el-icon-arrow-up"></i>
              </span>

            </div>
            <p v-if="!item.isfold&&item.explain">{{item.explain}}</p>
            <div v-if="!item.isfold&&!item.explain&&item.text=='指定竞品关键词货比'" class="fromBoxs">
              <el-form-item label="占比：" prop="goods_compared.ratio" :rules="[{ required: true, message: '请输入占比', trigger: 'blur' }]">
                <el-input class="precent" v-model="form.goods_compared.ratio" max="100" min="0" placeholder="请输入1到100的整数"></el-input> %
              </el-form-item>
              <el-form-item label="竞品关键词1：" prop="goods_compared.link1" :rules="[{ required: true, message: '请输入竞品关键词1', trigger: 'blur' }]">
                <el-input v-model="form.goods_compared.link1"></el-input>
              </el-form-item>
              <el-form-item label="竞品关键词2：" prop="goods_compared.link2" :rules="[{ required: true, message: '请输入竞品关键词2', trigger: 'blur' }]">
                <el-input v-model="form.goods_compared.link2"></el-input>
              </el-form-item>
              <el-form-item label="竞品关键词3：" prop="goods_compared.link3" :rules="[{ required: true, message: '请输入竞品关键词3', trigger: 'blur' }]">
                <el-input v-model="form.goods_compared.link3"></el-input>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='买家回访宝贝'" class="fromBoxs">
              <el-form-item label="回访概率：">
                <el-select v-model="form.task_setting.backRateValue" placeholder="请选择">
                  <el-option v-for="item in backRate" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='细化控制行为/人群'" class="fromBoxs">
              <el-form-item label="宝贝浏览时长：">
                <el-select placeholder="请选择" v-model="form.task_setting.viewTresureValue">
                  <el-option v-for="item in viewTresure" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="深度浏览店铺副宝贝：">
                <el-select placeholder="请选择" v-model="form.task_setting.subShopValue">
                  <el-option v-for="item in subShop" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="查看产品参数比例：">
                <el-select placeholder="请选择" v-model="form.task_setting.viewParmasValue">
                  <el-option v-for="item in viewParmas" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="货比同类目宝贝时长：">
                <el-select placeholder="请选择" v-model="form.task_setting.compareValue">
                  <el-option v-for="item in compare" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="浏览宝贝评价比例：">
                <el-select placeholder="请选择" v-model="form.task_setting.viewSayValue">
                  <el-option v-for="item in viewSay" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='买家性别'" class="fromBoxs">
              <el-form-item label="买家性别：">
                <el-radio v-model="form.task_setting.sex" label="1">设置性别比例</el-radio>
                男：
                <el-input class="sexbox" v-model="form.task_setting.man"></el-input>% 女：
                <el-input class="sexbox" v-model="form.task_setting.woman"></el-input>% &nbsp;&nbsp;
                <el-radio v-model="form.task_setting.sex" label="2">无要求</el-radio>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='买家年龄'" class="fromBoxs">
              <el-form-item label="买家年龄：">
                <el-input class="precent" v-model="form.task_setting.min"></el-input>-
                <el-input class="precent" v-model="form.task_setting.max"></el-input>
                <span class="tips">注：年龄只能是大于15小于60</span>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='人群标签'" class="fromBoxs">
              <el-checkbox-group v-model="form.task_setting.zhiye">
                <el-checkbox v-for="(tao,index) in tagArr" :label="tao.label" :key="tao.label">{{tao.text}}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='买家淘气值'" class="fromBoxs">
              <el-form-item label="">
                <el-checkbox-group v-model="form.task_setting.taoqiLevel">
                  <el-checkbox v-for="(tao,index) in taoqiArr" :label="tao" :key="index">{{tao}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <div v-if="!item.isfold&&!item.explain&&item.text=='买家消费层级'" class="fromBoxs">
              <el-form-item label="">
                <el-radio-group v-model="form.task_setting.costLevelVal" size="small">
                  <el-radio :label="j.label" v-for="(j,index) in costLevel" :key="index">{{j.text}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="btnBox">
          <el-button type="primary" @click="firstSure">收起</el-button>
        </div>
      </div>
    </div>
    <div class="mianTit" style="margin-top:20px">
      <div>
        <span class="order">2</span>
        <span class="titText">任务设置</span>
      </div>
      <div class="editIcon" v-show="isShowEditS" @click="isShowEditS=false">
        <i class="el-icon-success"></i>
        <a href="javascript:void(0)">修改</a>
      </div>
    </div>
    <div class="mainContain" v-show="!isShowEditS">
      <div class="severCheckBox">
        <el-form ref="form" :model="form" label-width="160px">
          <div v-for="item in taskArr">
            <div class="checkBox" @click="item.isfold=!item.isfold">
              <el-checkbox v-model="item.checked" v-bind:disabled="item.text=='五星好评截图'" @change="send">{{item.text}}</el-checkbox>
              <span class="foldBtn" v-if="item.isfold">点我展开
                <i class="el-icon-arrow-down"></i>
              </span>
              <span class="foldBtn" v-if="!item.isfold">点我关闭
                <i class="el-icon-arrow-up"></i>
              </span>

            </div>
            <p v-if="!item.isfold&&item.explain">{{item.explain}}</p>
          </div>
        </el-form>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowEdit: false,

      rules: {
        'goods_compared.ratio': [{ required: true, message: "搜索关键词不能为空", trigger: 'blur' }]
      },
      serverArr: [
        {
          id: 0,
          checked: true,
          text: '货比多家',
          isfold: 'false',
          explain: '用户会浏览你的产品的同行产品，最终到你这里下单，更进一步提升你的搜索转化效果'
        },
        {
          id: 0,
          checked: true,
          text: '手机端下单',
          isfold: 'false',
          explain: '用户会通过手机淘宝/手机京东的方式领取任务，完成浏览/加购/收藏/下单/评价 等方式进一步提升你的单品转化权重和店铺转化权重！'
        },
        {
          id: 0,
          checked: true,
          text: '试用心得审核',
          isfold: 'false',
          explain: '用户提交试用心得—商家审核—审核通过后，用户复制到淘宝/京东；标准级、专业级会员享有该功能，请去升级。'
        },
        {
          id: 0,
          checked: true,
          text: '账号安全',
          isfold: 'false',
          explain: '中奖用户淘宝周订单量不超过5，月订单量不超过10，身份证实名验证（用户在参加高返活动时，整个平台的规则周订单量不超过5，月订单量不超过10）'
        },
        {
          id: 0,
          checked: true,
          text: '账号防重复',
          isfold: 'false',
          explain: '同个商品在规定时间内不会有人重复中奖'
        },
        {
          id: 0,
          checked: true,
          text: '猜你喜欢',
          isfold: 'false',
          explain: '免费提供猜你喜欢功能，用户下单后会显示购买路径为猜你喜欢的商品'
        },
        {
          id: 0,
          checked: true,
          text: '优先审核',
          isfold: 'false',
          explain: '你发布的活动系统会优先安排审核，审核通过之后获得最佳的发布曝光时间！'
        },
        {
          id: 0,
          checked: true,
          text: '查看买家记录',
          isfold: 'false',
          explain: '买家近期在淘宝中的购买记录'
        },
        {
          id: 0,
          checked: false,
          text: '指定竞品关键词货比',
          isfold: false,
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '买家回访宝贝',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '细化控制行为/人群',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '买家性别',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '买家年龄',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '人群标签',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '买家淘气值',
          isfold: 'false',
          explain: ''
        },
        {
          id: 0,
          checked: true,
          text: '买家消费层级',
          isfold: 'false',
          explain: ''
        }

      ],
      backRate: [
        {
          value: '',
          label: '请选择'
        },
        {
          value: '0',
          label: '10%'
        },
        {
          value: '1',
          label: '20%'
        },
        {
          value: '2',
          label: '30%'
        },
        {
          value: '3',
          label: '40%'
        },
        {
          value: '4',
          label: '50%'
        },
        {
          value: '5',
          label: '60%'
        },
        {
          value: '6',
          label: '70%'
        },
        {
          value: '7',
          label: '80%'
        },
        {
          value: '8',
          label: '90%'
        },
        {
          value: '9',
          label: '100%'
        },
      ],//回访概率
      backRateValue: '',
      viewTresure: [
        { value: '', label: '请选择' }, { value: '1', label: '20-40S' }, { value: '2', label: '40-80S' }, { value: '3', label: '80-120S' }, { value: '4', label: '120S以上' }],//宝贝浏览时长
      subShop: [
        { value: '', label: '请选择' }, { value: '1', label: '10%' }, { value: '2', label: '20%' }, { value: '3', label: '30%' }, { value: '4', label: '40%' }, { value: '5', label: '50%' }, { value: '6', label: '60%' }, { value: '7', label: '70%' }, { value: '8', label: '80%' }, { value: '9', label: '90%' }, { value: '10', label: '100%' }],//深度浏览店铺副宝贝

      viewParmas: [
        { value: '', label: '请选择' }, { value: '1', label: '10%' }, { value: '2', label: '20%' }, { value: '3', label: '30%' }, { value: '4', label: '40%' }],//查看产品参数比例

      compare: [
        { value: '', label: '请选择' }, { value: '1', label: '6-8min' }, { value: '2', label: '8-12min' }, { value: '3', label: '12-16min' }, { value: '4', label: '16-20min' }],//货比同类目宝贝时长

      viewSay: [
        { value: '', label: '请选择' }, { value: '1', label: '10%' }, { value: '2', label: '20%' }, { value: '3', label: '30%' }, { value: '4', label: '40%' }],

      sex: '',
      tagArr: [
        { label: '1', text: '在校学生' },
        { label: '2', text: '职场白领' },
        { label: '3', text: '技术蓝领' },
        { label: '4', text: '家庭主妇' },
        { label: '5', text: '公务员' },
        { label: '6', text: '医护人员' },
        { label: '7', text: '餐饮行业' },
        { label: '8', text: '自由职业' },
        { label: '9', text: '专职司机' }
      ],
      costLevel: [
        { label: '1', text: '10-50元' },
        { label: '2', text: '51-150元' },
        { label: '3', text: '151-250元' },
        { label: '4', text: '251-350元' },
        { label: '5', text: '351-500元' },
        { label: '6', text: '500元以上' },
        { label: '7', text: '无要求' },
      ],
      // taoqiArr: [
      //   { label: '1', text: '501-600' },
      //   { label: '2', text: '601-800' },
      //   { label: '3', text: '801-1000' },
      //   { label: '4', text: '1000以上' },
      // ],
      taoqiArr: ['501-600', '601-800', '801-1000', '1000以上'],
      taskArr: [
        {
          id: 1,
          checked: true,
          text: '五星好评截图',
          isfold: 'false',
          explain: '用户对该商品进行五星好评，并截图上传；增加商品的权重'
        },
        {
          id: 2,
          checked: false,
          text: '买家秀截图',
          isfold: 'false',
          explain: '用户对该商品在评价页面上传买家购买的实物，并截图上传'
        },
        {
          id: 3,
          checked: false,
          text: '追加评论截图',
          isfold: 'false',
          explain: '用户对该商品进行五星好评后，再次追加评价，并截图上传'
        },
        {
          id: 4,
          checked: false,
          text: '分享朋友圈截图',
          isfold: 'false',
          explain: '用户把商品分享到朋友/朋友圈，并截图上传，增加复购率'
        }
      ],

      rules: {
        shop: [{ required: true, message: "请选择店铺", trigger: 'change' }],
        title: [{ required: true, message: "请填写标题活动", trigger: 'change' }],
        url: [{ required: true, message: "请填写宝贝链接", trigger: 'change' }],
      },
      form: {
        goods_compared: {
          ratio: '',
          link1: '',
          link2: '',
          link3: ''
        },
        task_setting: {
          taoqiLevel: [],
          backRateValue: '',
          viewTresureValue: '',
          subShopValue: '',
          viewParmasValue: '',
          compareValue: '',
          viewSayValue: '',
          sex: 1,
          man: '',
          woman: '',
          min: '',
          max: '',
          zhiye: [],
          costLevelVal: ''
        },
        return_task_setting: {

        }
      },
      isShowEditS: false,
      objs: {
        five_star_praise: 1,
        buyer_show: 0,
        add_comment: 0,
        share_friends: 0
      }
    }
  },
  created () {
    let formContain = sessionStorage.getItem('obj')//获取信息
    if (formContain) {
      this.form = JSON.parse(formContain);
      this.form.task_setting = JSON.parse(this.form.task_setting);
      this.form.return_task_setting = JSON.parse(this.form.return_task_setting);
      this.form.goods_compared = JSON.parse(this.form.goods_compared);
      this.taskArr[1].checked = this.form.return_task_setting.buyer_show == 0 ? false : true
      this.taskArr[2].checked = this.form.return_task_setting.share_friends == 0 ? false : true
      this.taskArr[3].checked = this.form.return_task_setting.add_comment == 0 ? false : true
    }
  },
  watch: {
    'form': {
      handler (newValue, oldValue) {
        　　　　this.sendMsg()
      　　　},
      　　　deep: true
    }
  },
  methods: {
    send () {
      this.sendMsg()
    },
    firstSure () {
      this.isShowEdit = true
      this.sendMsg()
    },

    checkBoxVal (val) {
      return val == 1 ? true : false
    },
    sendMsg () {
      for (let item of this.taskArr) {
        if (item.id == 2) {
          this.objs.buyer_show = item.checked ? 1 : 0
        } else if (item.id == 3) {
          this.objs.add_comment = item.checked ? 1 : 0
        } else if (item.id == 4) {
          this.objs.share_friends = item.checked ? 1 : 0
        }
      }
      this.form.return_task_setting = this.isString(this.objs)
      let goods_compared = {
        ratio: this.form.goods_compared.ratio,
        link1: this.form.goods_compared.link1,
        link2: this.form.goods_compared.link2,
        link3: this.form.goods_compared.link3,
      };
      let obj = {
        goods_compared: this.isString(goods_compared),
        return_task_setting: this.form.return_task_setting,
        task_setting: this.isString(this.form.task_setting)
      }
      this.$emit('treasuredInfo', obj)
    },
    //对传值进行判断
    isString (val) {
      if (typeof (val) == 'string') {
        return val
      } else {
        return JSON.stringify(val)
      }
    }

  }
}
</script>
<style lang="less" rel="stylesheet/less" scope>
.mainBox {
  padding: 20px;
  color: #606266;
  .mianTit {
    height: 44px;
    width: 100%;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    background: #f4f6f9;
    .editIcon {
      align-items: center;
      line-height: 40px;
      i {
        color: #66bd6a;
      }
    }

    span {
      display: inline;
    }

    .order {
      line-height: 20px;
      font-weight: bold;
      text-align: center;
      margin: 8px 10px 0 20px;
      display: block;
      border: 2px solid #3d95fb;
      height: 25px;
      width: 25px;
      color: #3d95fb;
      border-radius: 12.5px;
      float: left;
    }
    .titText {
      height: 100%;
      line-height: 42px;
    }
  }
  .mainContain {
    border: 1px solid #e4e7ed;
    margin-top: 20px;
    padding: 20px;
    .severCheckBox {
      padding: 0 20px;
      .checkBox {
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        height: 42px;
        border-bottom: 1px solid #eee;
        line-height: 42px;
        color: #666;
        .el-checkbox__label {
          color: #303133;
        }
        .foldBtn {
          color: #e6a23c;
          cursor: pointer;
        }
      }
      p {
        height: 38px;
        line-height: 38px;
        width: 100%;
        background: #f4f6f9;
        font-size: 14px;
        padding: 0 12px;
      }
      .fromBoxs {
        width: 100%;
        font-size: 14px;
        padding: 0 12px;
        margin: 20px 0 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        .precent {
          width: 120px;
        }
      }
    }

    .btnBox {
      text-align: center;
      margin-top: 20px;
      width: 196px;
      height: 36px;
      line-height: 36px;
      margin: 20px auto;
      button {
        width: 100%;
      }
    }
    .el-input {
      width: 400px;
    }
    .sexbox {
      width: 80px;
    }
  }
}
</style>

