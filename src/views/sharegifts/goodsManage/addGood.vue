<template>
  <div class="app-container">
    <div class="app-header"><span @click="back" class="back"> 返回> </span>{{pageTitle}}商品</div>
    <div class="app-main">
      <el-form class="addGoodForm" label-width="95px" :label-position="labelPosition" :model="addGoodForm" status-icon
               :rules="addGoodRules"
               ref="addGoodForm">
        <el-form-item label="商品类目" prop="firstCateName">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item>{{addGoodForm.firstCateName}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{addGoodForm.secondCateName}}</el-breadcrumb-item>
          </el-breadcrumb>
          <span class="reWrite" @click="rewrite">修改</span>
          <p class="wanring">商品上架后不可修改，请谨慎选择，如需修改，请先将商品下架</p>
        </el-form-item>
        <el-form-item label="商品链接">
          <div>
            <el-input v-model="addGoodForm.goodUrl" placeholder="输入淘宝链接，点击按钮或回车键获取商品详情"
                      clearable style="width: 360px;" @keyup.enter.native="getGoodInfo"
                      :disabled="urlDisable"></el-input>
            <el-button style="width: 72px;height: 36px;margin-left: -5px;padding-top:8px" @click="getGoodInfo">获取
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="商品标题" prop="goodTitle">
          <el-input v-model="addGoodForm.goodTitle" placeholder="输入标题"
                    clearable style="width: 430px;"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="goodNum">
          <el-input v-model="addGoodForm.goodNum" placeholder="输入商品编码"
                    clearable style="width: 430px;"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <div class="desc">商品主图</div>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :action="upload.action"
            :before-upload="beforeUpload"
            :data="upload"
            :on-exceed="overMainLimit"
            :on-success="handleMainSuccess">
            <img v-if="addGoodForm.goodMainPic" :src="addGoodForm.goodMainPic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="tip">上传图片支持jpg/jpeg格式，750*750px，大小不超过1M</div>
          <div class="desc">商品轮播图（限5张）</div>
          <el-upload
            :limit='5'
            :file-list="fileList"
            :action="upload.action"
            :before-upload="beforeUpload"
            :data="upload"
            :on-exceed="overLoopLimit"
            list-type="picture-card"
            :on-remove="handleRemove"
            :on-success="handleLoopSuccess">
            <i v-if="fileList.length<5" class="el-icon-plus" ref="plusIcon"></i>
          </el-upload>
          <div class="tip">上传图片支持jpg/jpeg格式，750*750px，大小不超过1M,</div>
          <el-button type="text" size="small" class="addSepcBtn" @click="addNorms">添加规格</el-button>
          <div class="attr" v-show="!isShowSku && isShowAdd">
            <div>
              属性名称：
              <el-input size="small" class="w272" v-model="name"></el-input>
            </div>
            <div style="margin-top:10px">
              &nbsp;&nbsp;&nbsp;属性值：
              <div size="small" class="text" ref="text">
                <div>
                  <el-tag v-for="tag in attr[skuIndex].value"
                          :key="tag.attr_name"
                          closable
                          @close="delTag(tag.attr_name)"
                          style="margin:2px 5px">
                    {{tag.attr_name}}
                  </el-tag>
                  <el-input size="small" class="tag" v-model="tag" @keyup.native.enter="addTag" @blur="addTag"
                            autofocus="true" style="width:70px"></el-input>
                </div>
              </div>
            </div>
            <div style="margin-top:20px;margin-left:72px">
              <el-button type="primary" size="small" @click="saveSku">确定</el-button>
              <el-button type="primary" size="small" @click="cancleSku" v-show="!isShowEdit">取消</el-button>
              <span class="c9" style="margin-left:10px">说明：属性值可输入多个，录入属性值“Enter"键编辑下一个值</span>
            </div>
          </div>
          <div class="attr" v-show="isShowSku">
            <div v-for=" (x,index) in attr " :key="index" v-show="x.attr">
              <div style="margin:10px 0">
                <p> {{x.attr}}：<span class="c5 curp" style="margin-left:20px" @click="editSKu(index)">编辑</span> &nbsp;&nbsp;&nbsp;&nbsp;
                  <span class="cf curp" @click="delSku(index)">删除</span></p>
              </div>
              <div style="margin-left:30px" class="check_list-box">
                <el-checkbox-group v-model="x.check_list" @change="selectValue(index)">
                  <el-checkbox :label="tag.attr_name" v-for="(tag,index)  in x.value " :key="index"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <p class="ft14 c9" style="margin-top:5px">说明：最多添加三种规格属性，勾选属性值自动生成规格名称</p>
          </div>
          <div class="table" v-show="tableData.length!=0">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="value" :label="attr[0].attr" v-if="isShowFirst">
              </el-table-column>
              <el-table-column prop="value1" :label="attr[1].attr" v-if="isShowTwo">
              </el-table-column>
              <el-table-column prop="value2" :label="attr[2].attr" v-if="isShowThree">
              </el-table-column>
              <el-table-column prop="sku_sn" label="规格编码">
                <template slot-scope="scope">
                  <el-input size="small" v-model="scope.row.goods_sku_sn"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <div class="c5">
                    <span class="curp" @click="delNorms(scope.$index,scope.row)">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item label="商品详情">
          <Editor :isEdit="isEdit"></Editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" id="saveBtn" @click="save('addGoodForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="请选择商品类目"
      :visible.sync="dialogVisible"
      width="470px"
      :before-close="handleClose">
      <el-cascader
        @change="handleItemChange"
        expand-trigger="hover"
        :options="options"
        v-model="selectedOptions"
        @active-item-change="changeParent">
      </el-cascader>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmRewrite">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {addGood, editGood, getGoodDetail, fetchGood, getCateList} from '@/api/goodsManage'
  import {getQiNiuToken} from '@/api/qiniu'
  import {setFirstCate, setSecondCate, getFirstCate, getSecondCate} from '@/utils/auth'
  import Editor from '@/components/shareBase/Editor'
  import {mapGetters, mapMutations} from 'vuex'


  export default {
    name: "AddGood",
    data() {
      return {
        pageTitle: '',  // 新建商品和编辑商品共用页面，标题可为"新建"或者"编辑"
        labelPosition: 'right',
        id: null,     // 待编辑商品的id
        isEdit: false,  // 新建还是编辑标识
        firstLoad: false, // 从列表页面跳转过来的标识
        urlDisable: false, // 商品url输入框是否禁用
        data: {},    // 商品编辑时原先的信息
        addGoodForm: {
          firstCateName: getFirstCate(),      // 一级商品类目
          secondCateName: getSecondCate(),    // 二级商品类目
          firstCateId: '',        // 一级商品类目id
          secondCateId: '',       // 二级商品类目id
          goodUrl: '',           // 商品链接
          goodTitle: '',         // 商品标题
          goodNum: '',           // 商品编号
          goodMainPic: '',      // 商品主图
          goodPics: [],         // 商品轮播图
          goodDetail: ''        // 商品详情
        },
        addGoodRules: {
          firstCateName: [{required: true}],
          // goodUrl: [{required: true, message: '请输入商品链接!'}],
          goodTitle: [{required: true, message: '请输入商品标题!'}],
          goodNum: [{required: true, message: '请输入商品编码!'}],
          goodMainPic:[{required: true, message: '请上传主图!'}],
        },
        fileList: [],
        upload: {
          token: '',
          action: '',
          key: ''
        },
        dialogVisible: false,
        options: [],      // 商品类目级联数据源
        vals: [],       // 选中的级联对象
        selectedOptions: [],  // 选中的级联父子id
        attr: [
          {attr: '', value: [], check_list: []},
          {attr: '', value: [], check_list: []},
          {attr: '', value: [], check_list: []}
        ],
        tableData: [],
        skuIndex: 0,
        name: '',
        tag: '',
        isShowSku: false,//是不是要展示规格
        isShowAdd: false,//是不是增加规格
        isShowEdit: false,//是否是编辑
        isShowFirst: false, //是否显示第一个规格
        isShowTwo: false,
        isShowThree: false
      }
    },
    computed: {
      ...mapGetters([
        'goodDesc'
      ])
    },
    created() {
      this.id = this.$route.query.id
      this.isEdit = Boolean(this.$route.query.isEdit)
      if (this.id) {
        this.pageTitle = '编辑'
        this.urlDisable = true
        // 如果由商品列表跳转过来的路由有id参数，说明执行编辑操作，否则执行新增商品操作
        getGoodDetail({id: this.id}).then(res => {
          if (res.code == '000') {
            this.data = res.data
            if (this.data.first) {
              this.addGoodForm.firstCateName = this.data.first.cate_name
            }
            if (this.data.second) {
              this.addGoodForm.secondCateName = this.data.second.cate_name
            }
            this.addGoodForm.firstCateId = this.data.top_cate_id
            this.addGoodForm.secondCateId = this.data.cate_id
            this.addGoodForm.goodUrl = this.data.item_url
            this.addGoodForm.goodTitle = this.data.title
            this.addGoodForm.goodNum = this.data.goods_sn
            this.addGoodForm.goodMainPic = this.data.main_pic
            this.fileList = this.data.pics.split(',').map(v => {
              return {
                url: v
              }
            })

            if (this.data.attr.length == 0) {
              this.data.attr.push(...[
                {attr: '', value: [], check_list: ''},
                {attr: '', value: [], check_list: ''},
                {attr: '', value: [], check_list: ''}
              ])
            } else if (res.data.attr.length == 1) {
              this.isShowFirst = true;
              res.data.attr.push(...[{attr: '', value: [], check_list: ''}, {attr: '', value: [], check_list: ''}])
            } else if (res.data.attr.length == 2) {
              res.data.attr.push({attr: '', value: [], check_list: ''});
              this.isShowFirst = true;
              this.isShowTwo = true
            } else {
              this.isShowThree = true
              this.isShowFirst = true;
              this.isShowTwo = true
            }
            res.data.attr.forEach(item => {
              item.check_list = item.check_list.split(',')
            })
            this.attr = res.data.attr


            this.isShowSku = true;
            this.isShowEdit = false
            this.tableData = res.data.attr.length <= 3 && res.data.sku.map(el => {
              return {
                goods_sku_sn: el.goods_sku_sn,
                value: el.attr_names.split(',').length > 0 && el.attr_names.split(',')[0],
                value1: el.attr_names.split(',').length > 1 && el.attr_names.split(',')[1],
                value2: el.attr_names.split(',').length > 2 && el.attr_names.split(',')[2],
              }
            }) || []

            this.setGoodDesc(res.data.description)
          }
        })
      } else {
        this.pageTitle = '新建'
      }
      // 获取商品类目
      this.getAll()
      let params = {
        type: 'goods'
      }
      // 获取七牛云token
      getQiNiuToken(params).then(res => {
        if (res.code = '000') {
          this.upload.token = res.data.up_token
          this.upload.action = process.env.UPLOAD_API
        }
      })
      // 如果跳转到新建商品页面，选择商品类目框则会弹出
      if (!this.isEdit) {
        this.dialogVisible = true
      }
    },
    methods: {
      // 获取商品类目级联数据的label值
      getCascaderObj(val, opt) {
        return val.map(function (value, index, array) {
          for (var itm of opt) {
            if (itm.value == value) {
              opt = itm.children
              return itm
            }
          }
          return null
        })
      },
      handleItemChange(val) {
        this.vals = this.getCascaderObj(this.selectedOptions, this.options);
      },
      // 获取商品类目级联数据
      getAll() {
        getCateList({parent_id: 0}).then(res => {
          if (res.code == '000') {
            let data = res.data
            this.options = data.map(v => {
              return {
                value: v.cate_id,
                label: v.cate_name,
                children: []
              }
            })
          }
        })
      },
      // 级联选择器选择父级选项时触发的函数
      changeParent([val]) {
        getCateList({parent_id: val}).then(res => {
          if (res.code == '000') {
            this.options.forEach(item => {
              item.children = res.data.map(v => {
                return {
                  value: v.cate_id,
                  label: v.cate_name
                }
              })
            })
          }
        })
      },
      beforeUpload(file) {
        // 限制上传文件类型和大小
        const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg')
        const isLt1M = file.size / 1024 / 1024 < 1

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或者JPEG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }

        let suffix = file.name
        let key = new Date().getTime() + "_" + Math.floor(Math.random() * 100) + "_" + encodeURI(`${suffix}`)
        this.upload.key = key
        return isJPG && isLt1M && this.upload
      },
      // 商品主图上传成功的回调
      handleMainSuccess(res, file) {
        this.addGoodForm.goodMainPic = process.env.IMAGE_API + encodeURI(res.key)
        console.log(this.addGoodForm.goodMainPic)
      },
      handleRemove(file, fileList) {
        // 删除选中的图片
        this.fileList.forEach((item, index) => {
          if (item.url == file.url) {
            this.fileList.splice(index, 1)
          }
        })
      },
      handleLoopSuccess(res, file) {
        this.fileList.push({url: process.env.IMAGE_API + res.key})
        if (this.fileList.length > 4) {
          // 当轮播图上传控件上传了5张图时，"+"号将不会显示
          this.$refs.plusIcon.parentNode.style.borderColor = '#fff'
        }
      },
      // 主图上传张数超出回调函数
      overMainLimit() {
        this.$message.warning('主图只能上传一张图片!')
      },
      // 轮播图上传张数超出回调函数
      overLoopLimit() {
        this.$message.warning('轮播图最多只能上传五张图片!')
      },
      // 点击修改商品类目
      rewrite() {
        this.dialogVisible = true
      },
      // 关闭修改商品类目弹框
      handleClose() {
        this.dialogVisible = false
      },
      confirmRewrite() {
        if (!this.selectedOptions.length) {
          this.$message.warning('请选择商品类目!')
          return
        }
        this.dialogVisible = false
        this.addGoodForm.firstCateName = this.vals[0].label
        this.addGoodForm.secondCateName = this.vals[1].label
        setFirstCate(this.vals[0].label)   // 将商品类目暂存到sessionStorage中，页面刷新数据不丢失
        setSecondCate(this.vals[1].label)
      },
      // 通过输入url获取商品信息
      getGoodInfo() {
        if (!this.addGoodForm.goodUrl) {
          this.$message.warning('请先输入商品链接!')
          return
        }
        let params = {
          url: this.addGoodForm.goodUrl
        }
        fetchGood(params).then(res => {
          if (res.code == '000') {
            let str = ''
            if (typeof res.data.item_content == 'object') {
              if (Array.isArray(res.data.item_content.img)) {
                res.data.item_content.img.forEach(item => {
                  str += `<img src='${item}' style='margin-top:-5px'>`
                })
              } else {
                str = `<img src='${res.data.item_content.img}'>`
              }
            } else {
              str = res.data.item_content
            }
            // 将商品的详情存放到vuex中
            this.setGoodDesc(str)
            this.addGoodForm.goodTitle = res.data.item_title
            this.addGoodForm.goodMainPic = res.data.item_cover_image
            this.fileList = res.data.item_images.map(v => {
              return {
                url: v
              }
            })
            res.data.attr.forEach((el, i, arr) => {
              el.attr = el.prop_name
              el.value = el.values.sku_property_value.map(el2 => {
                return {
                  attr_name: el2.name
                }
              })
              el.check_list = res.data.attr.length <= 3 && el.values.sku_property_value.map(el2 => el2.name) || []
            })
            if (res.data.attr.length == 0) {
              res.data.attr.push(...[
                {attr: '', value: [], check_list: []},
                {attr: '', value: [], check_list: []},
                {attr: '', value: [], check_list: []}
              ])
            } else if (res.data.attr.length == 1) {
              this.isShowFirst = true;
              res.data.attr.push(...[{attr: '', value: [], check_list: ''}, {attr: '', value: [], check_list: ''}])
            } else if (res.data.attr.length == 2) {
              res.data.attr.push({attr: '', value: [], check_list: ''});
              this.isShowFirst = true;
              this.isShowTwo = true
            } else {
              this.isShowThree = true
              this.isShowFirst = true;
              this.isShowTwo = true
            }
            this.attr = res.data.attr;
            this.isShowSku = true;
            this.isShowEdit = false
            this.tableData = res.data.attr.length <= 3 && res.data.sku_list.map(el => {
              return {
                goods_sku_sn: '',
                sku_attrs: el.sku_attrs,
                value: el.sku_attrs.length > 0 && el.sku_attrs[0].attr_name,
                value1: el.sku_attrs.length > 1 && el.sku_attrs[1].attr_name || '',
                value2: el.sku_attrs.length > 2 && el.sku_attrs[2].attr_name || '',
              }
            }) || []
          }
        })
      },
      // 添加规格
      addNorms() {
        let num = 0;
        if(this.attr&&this.attr.length!=0){
          this.attr.forEach(el => {
            if (el.attr) {
              num++
            }
          })
        }
        
        if (num == 3) {
          this.skuIndex = 2;
          return
        }
        this.skuIndex = num;
        this.isShowAdd = true
        this.isShowSku = false;
        this.isShowEdit = false

      },
      // 删除规格
      delNorms(i, obj) {
        if (obj.id) {
          this.id += obj.id + ','
        }
        this.tableData.forEach((el, index, arr) => {
          if (index == i) {
            arr.splice(i, 1)
          }
        });
      },
      // 添加标签
      addTag(event) {
        let flag = false;
        if (!this.tag) {
          return
        }
        this.attr[this.skuIndex].value.forEach(el => {
          if (el.attr_name == this.tag) {
            flag = true;
            return;
          }
        })
        if (flag) return;
        this.attr[this.skuIndex].value.push({attr_name: this.tag})
        this.tag = ""
      },
      // 删除标签
      delTag(tag) {
        this.attr[this.skuIndex].value.forEach((el, i, arr) => {
          if (el.attr_name == tag) {
            arr.splice(i, 1)
          }
        })
        // 删除对应的规格标签，下面表格删除对应的规格属性
        this.attr[this.skuIndex].check_list.forEach((el, i, arr) => {
          if (el == tag) {
            arr.splice(i, 1)
          }
        })
      },
      // 保存规格
      saveSku() {
        if (!this.name) {
          this.$message.error('请添加属性名称')
          return
        }
        if (this.attr[this.skuIndex].value.length == 0) {
          this.$message.error('请添加属性')
          return
        }
        this.attr[this.skuIndex].attr = this.name;
        this.name = "";
        this.isShowSku = true
        this.isShowAdd = false
        this.selectValue()
      },
      // 取消规格
      cancleSku() {
        this.attr[this.skuIndex].attr = ""
        this.attr[this.skuIndex].value = [];
        this.name = "";
        this.tag = ""
        if (this.skuIndex == 0) {
          this.isShowSku = false
          this.isShowAdd = false
        } else {
          this.isShowSku = true
          this.isShowAdd = false
        }

      },
      // 编辑规格
      editSKu(index) {
        if (this.attr.length > 3) {
          this.$message.error('请保持规格不超过三条');
          return
        }
        this.isShowSku = false
        this.isShowAdd = true;
        this.isShowEdit = true
        this.skuIndex = index;
        this.name = this.attr[index].attr
      },
      // 删除规格属性
      delSku(index) {
        if (this.attr.length > 3) {
          this.attr.forEach((el, i, arr) => {
            if (i == index) {
              arr.splice(i, 1)
            }
          })
        } else {
          this.attr[index].attr = '';
          this.attr[index].value = [];
          this.attr[index].check_list = [];
        }

        this.selectValue()

      },
      // 选择
      selectValue() {
        this.tableData = []
        if (this.attr[0].check_list.length == 0) {
          if (this.attr[1].check_list.length != 0 && this.attr[2].check_list.length == 0) {
            this.attr[1].check_list.forEach((el1) => {
              this.tableData.push({
                goods_sku_sn: '',
                name1: this.attr[1].attr,
                value1: el1,
                sku_attrs: [{attr: this.attr[1].attr, attr_name: el1}]
              })
            })
          } else if (this.attr[2].check_list.length != 0 && this.attr[1].check_list.length == 0) {
            this.attr[2].check_list.length != 0 && this.attr[2].check_list.forEach((el2) => {
              this.tableData.push({
                goods_sku_sn: '',
                name2: this.attr[2].attr,
                value2: el2,
                sku_attrs: [{attr: this.attr[2].attr, attr_name: el2}]
              })
            })
          } else if (this.attr[1].check_list.length != 0 && this.attr[2].check_list.length != 0) {
            this.attr[1].check_list.length != 0 && this.attr[1].check_list.forEach((el1) => {
              this.attr[2].check_list.length != 0 && this.attr[2].check_list.forEach((el2) => {
                this.tableData.push({
                  goods_sku_sn: '',
                  name1: this.attr[1].attr,
                  name2: this.attr[2].attr,
                  value1: el1,
                  value2: el2,
                  sku_attrs: [{attr: this.attr[1].attr, attr_name: el1}, {attr: this.attr[2].attr, attr_name: el2}]
                })
              })
            })
          }
        }
        this.attr[0].check_list.forEach((el) => {
          if (this.attr[1].check_list.length == 0 && this.attr[2].check_list.length == 0) {
            this.tableData.push({
              goods_sku_sn: '',
              name: this.attr[0].attr,
              value: el,
              sku_attrs: [{attr: this.attr[0].attr, attr_name: el}]
            })
          }

          if (this.attr[1].check_list.length == 0 && this.attr[2].check_list.length != 0) {
            this.attr[2].check_list.length != 0 && this.attr[2].check_list.forEach((el2) => {
              this.tableData.push({
                goods_sku_sn: '',
                name: this.attr[0].attr,
                name2: this.attr[2].attr,
                value: el,
                value2: el2,
                sku_attrs: [{attr: this.attr[0].attr, attr_name: el}, {attr: this.attr[2].attr, attr_name: el2}]
              })
            })
          }
          this.attr[1].check_list.length != 0 && this.attr[1].check_list.forEach((el1) => {
            if (this.attr[2].check_list.length == 0) {
              this.tableData.push({
                goods_sku_sn: '',
                name: this.attr[0].attr,
                name1: this.attr[1].attr,
                value: el,
                value1: el1,
                sku_attrs: [{attr: this.attr[0].attr, attr_name: el}, {attr: this.attr[1].attr, attr_name: el1}]
              })
            }

            this.attr[2].check_list.length != 0 && this.attr[2].check_list.forEach((el2) => {
              this.tableData.push({
                goods_sku_sn: '',
                name: this.attr[0].attr,
                name1: this.attr[1].attr,
                name2: this.attr[2].attr,
                value: el,
                value1: el1,
                value2: el2,
                sku_attrs: [{attr: this.attr[0].attr, attr_name: el}, {
                  attr: this.attr[1].attr,
                  attr_name: el1
                }, {attr: this.attr[2].attr, attr_name: el2}]
              })
            })
          })
        })
        this.isShowFirst = this.attr[0].check_list.length == 0 ? false : true
        this.isShowTwo = this.attr[1].check_list.length == 0 ? false : true
        this.isShowThree = this.attr[2].check_list.length == 0 ? false : true

      },
      // 保存提交新增商品
      save() {
        this.$refs.addGoodForm.validate((valid) => {
          if (valid) {
            if (!this.addGoodForm.goodMainPic) {
              this.$message.warning('请插入商品主图!')
              return
            }
            let arr = JSON.parse(JSON.stringify(this.attr))
            arr.forEach(item => {
              item.check_list = item.check_list.toString()
            })
            // 去掉去除勾选规格时，复选框选中的值实时更新
            for (let i = 0; i < arr.length; i++) {
              let valArr = arr[i].value
              let checkStr = arr[i].check_list
              for (let j = 0; j < valArr.length; j++) {
                if (checkStr.indexOf(valArr[j].attr_name) < 0) {
                  valArr.splice(j, 1)
                }
              }
            }
            if (this.tableData.some(v => !v.goods_sku_sn)) {
              this.$message.error('请填写完整规格编码!')
              return
            }
            let params = {
              title: this.addGoodForm.goodTitle,
              top_cate_id: this.selectedOptions[0] ? this.selectedOptions[0] : this.addGoodForm.firstCateId,
              cate_id: this.selectedOptions[1] ? this.selectedOptions[1] : this.addGoodForm.secondCateId,
              goods_sn: this.addGoodForm.goodNum,
              main_pic: this.addGoodForm.goodMainPic,
              pics: this.fileList.map(v => v.url).toString(),
              sku: JSON.stringify(this.tableData),
              sku_type: this.tableData.length == 0 ? 1 : 2, //判断有没有添加规格
              description: this.goodDesc,
              item_url: this.addGoodForm.goodUrl,
              attr: JSON.stringify(arr)
            }
            if(params.pics==''){
              this.$message.warning('至少上传一张轮播图！')
              return
            }
            if (this.isEdit) {
              this.$confirm('商品存在进行中的活动，编辑后，所有活动将自动下架。 是否继续编辑?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                Object.assign(params, {id: this.id})
                editGood(params).then(res => {
                  if (res.code == '000') {
                    this.$message.warning('商品编辑成功!')
                    this.$router.push('/goodsManage')
                  } else {
                    this.$message.warning('商品编辑失败!')
                  }
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消编辑'
                })
              })
            } else {
              addGood(params).then(res => {
                if (res.code == '000') {
                  this.$message.warning('新建商品成功!')
                  this.$router.push('/goodsManage')
                } else {
                  this.$message.warning('新建商品失败!')
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      back() {
        this.$router.back()
      },
      ...mapMutations({
        setGoodDesc: 'SET_GOOD_DESC'
      })
    },
    components: {
      Editor
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
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
      overflow: auto;
      .addGoodForm {
        padding-top: 32px;
        .breadcrumb {
          margin-top: -4px;
          display: inline-block;
        }
        .reWrite {
          margin-left: 20px;
          color: #409EFF;
          cursor: pointer;
        }
        .wanring {
          font-size: 12px;
          font-weight: 400;
          color: rgba(144, 147, 153, 1);
        }
        .desc {
          font-size: 14px;
          font-weight: 400;
          color: rgba(96, 98, 102, 1);
        }
        .tip {
          font-size: 12px;
          font-weight: 400;
          color: rgba(153, 169, 191, 1);
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 148px;
          height: 148px;
          line-height: 148px;
          text-align: center;
        }
        .avatar {
          width: 148px;
          height: 148px;
          display: block;
        }
        .addSepcBtn {
          font-size: 14px;
          font-weight: 400;
          color: rgba(64, 158, 255, 1);
          border: 1px solid rgba(95, 169, 252, 1);
          border-radius: 4px;
        }
        .table {
          margin-top: 16px;
          padding-right: 30px;
          & /deep/ .el-table--border th {
            border-right: 0;
          }
          & /deep/ .el-table--border td {
            border-right: 0;
          }
          & /delep/ .el-table th > .cell {
            color: red !important;
          }
        }
        .attr {
          border: 1px solid #ebeef5;
          padding: 20px;
          margin-top: 10px;
          width: 70%
        }
        .check_list-box /deep/ .el-checkbox {
          margin: 0 10px;
        }
        .text {
          width: 350px;
          padding: 10px;
          border: 1px solid #DCDFE6;
          border-radius: 4px;
          display: inline-block;
          height: 100px;
          overflow: hidden;
          overflow-y: auto
        }
        .text /deep/ .el-input__inner {
          border: none
        }
      }
    }
  }
</style>
