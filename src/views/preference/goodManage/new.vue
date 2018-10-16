<!-- 新建商品 -->
<template>
  <div>
    <div class="title ft14 c4 pl24 bgf">
      <h6 class="dib curp" style="font-weight:500" @click="goBack">商品管理</h6>
      <span> &gt; 新建商品</span>
    </div>
    <div class="main bgf mt24 ft14 ">
        <div class="top">
          <div class="df">
            <span class="c1"> <span class="cf">*</span> 商品类目：</span>
            <div>
              <span class="c4">{{setObj.first.cate_name}}&nbsp;>&nbsp;{{setObj.second.cate_name}}&nbsp; </span>
              <span type="text" class="c5 curp" @click="goSet">修改</span>
              <p class="ft12 c9" style="margin-top:5px;">商品上架后不可修改，请谨慎选择，如需修改，请先将商品下架</p>
            </div>
          </div>
          <div class="df mt32" style="margin-left:5px">
            <span class="c1" style="line-height:32px">通过淘宝链接获取商品信息：</span>
            <div>
             <el-input placeholder="输入淘宝链接，点击按钮或者回车键获取商品详情" v-model="top.taoBaoUrl"
                       style="width:468px" size="small"
                       :disabled="$route.params.id?true:false"
                      @keyup.enter.native="getDetialTaoBao">
                 <el-button slot="append"   @click="getDetialTaoBao" >获取</el-button>
              </el-input>
            </div>
          </div>
          <div class="df mt24">
            <span class="c1" style="line-height:32px"> <span class="cf">*</span> 商品标题：</span>
            <div>
             <el-input v-model="top.name" size="small" style="width:468px" placeholder="请输入" :maxlength="60"></el-input>
             <span style="margin:0 5px">{{top.name.length}}/60</span>
            </div>
          </div>
          <div class="df mt32">
            <span class="c1" style="line-height:32px"> <span class="cf">*</span> 商品编码：</span>
            <div>
             <el-input v-model="top.code" size="small" style="width:468px" placeholder="请输入"></el-input>
            </div>
          </div>

          <div class="df mt24">
            <span class="c1" style="line-height:32px"> <span class="cf">*</span> 商品轮播图：</span>
            <div>
              <div class="ft12 c9">
                <p style="margin-top:7px">图片上传限制：支持jpg/ipeg 格式，文件最大为1M，建议尺寸 <span class="cf">750*750</span> </p>
              </div>
              <div class="mt24 df">
                <span class="ft12 c4"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;主图</span>
                &nbsp;
                &nbsp;
                <div >
                  <div>
                    <img :src="top.main_url" alt="" style="" class="main-img" v-if="top.main_url">
                     <div class="main-img no-img" v-else>
                        <i class=" iconfont icon-icon--"></i>
                      </div>
                  </div>
                  <el-upload
                    class="upload-demo ft14"
                    style="margin-top:12px"
                    :action="action"
                    :http-request="uplodMainPic"
                    name="file"
                    :show-file-list="false"
                    accept="image/jpg,image/jpeg, image/png"
                    >
                    <el-button size="small" class="btn">添加</el-button>
                  </el-upload>
                </div>
              </div>
              <div class="mt24 df">
               <div  class="ft12 c4">
                  <p>轮播图片</p>
                  <p>（限5张）</p>
               </div>
                &nbsp;
                &nbsp;
                <div >
                  <div class="df">
                    <div class="posr img-box" v-for="(x,index) in top.shopImg" :key="index" v-show="top.shopImg.length!=0">
                      <img :src="x" alt=""  class="img" >
                      <div class="mask">
                        <i class="el-icon-delete curp cff del" @click="delShopPic(index)"></i>
                      </div>
                    </div>
                    <div class="posr img-box"  v-show="top.shopImg.length==0">
                      <div class="img no-img" >
                        <i class=" iconfont icon-icon--"></i>
                      </div>
                    </div>
                  </div>
                  <el-upload
                    class="upload-demo ft14"
                    style="margin-top:12px"
                    :action="action"
                    :http-request="uplodShopPic"
                    name="file_name"
                    :show-file-list="false"
                    accept="image/jpg,image/jpeg, image/png"
                    >
                    <el-button size="small" class="btn">添加</el-button>
                  </el-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mid ml32 mt24">
          <el-button type="primary" size="small" style="width:74px" class="mt32" @click="addNorms">添加规格 </el-button>
          <div class="attr" v-show="!isShowSku&&isShowAdd">
            <div>
              属性名称：
              <el-input size="small"  class="w272" v-model="name"></el-input>
            </div>
            <div style="margin-top:10px">
              &nbsp;&nbsp;&nbsp;属性值：
              <div size="small"  class="text"  ref="text" >
                 <div >
                   <el-tag
                    v-for="tag in attr[skuIndex].value"
                    :key="tag.attr_name"
                    closable
                    @close="delTag(tag.attr_name)"
                    style="margin:2px 5px"
                    >
                    {{tag.attr_name}}
                  </el-tag>
                  <el-input size="small"  class="tag" v-model="tag" @keyup.native.enter="addTag"  @blur="addTag" autofocus="true" style="width:70px"></el-input>
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
                  <p> {{x.attr}}：<span class="c5 curp" style="margin-left:20px" @click="editSKu(index)">编辑</span> &nbsp;&nbsp;&nbsp;&nbsp; <span class="cf curp" @click="delSku(index)">删除</span>   </p>
                </div>
                <div style="margin-left:30px" class="checkList-box">
                    <el-checkbox-group v-model="x.checkList" @change="selectValue(index)">
                        <el-checkbox :label="tag.attr_name"  v-for="(tag,index)  in x.value " :key="index"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <p class="ft14 c9" style="margin-top:5px">说明：最多添加三种规格属性，勾选属性值自动生成规格名称</p>
          </div>
          <div class="df mt24">
            <span class="c1" style="line-height:32px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  价格&库存：</span>
            <div>
              <span class="c9">批量填充</span>
             <el-input size="small" style="width:120px"  v-model="fill.code" placeholder="规格编码"></el-input>
             <el-input size="small" style="width:120px" v-model="fill.outer_price" placeholder="商品市场价"></el-input>
             <el-input size="small" style="width:120px" v-model="fill.inner_price" placeholder="平台售价"></el-input>
             <el-input size="small" style="width:120px"  v-model="fill.store_num"  placeholder="库存"></el-input>
             <el-button size="small" type="primary" @click="batchFill">确定</el-button>
            </div>
          </div>
          <div class="table" v-show="tableData.length!=0">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
               <el-table-column
                prop="value"
                :label="attr[0].attr"
                v-if="isShowFirst"
                >
              </el-table-column>
               <el-table-column
                 prop="value1"
                :label="attr[1].attr"
                v-if="isShowTwo"
                >
              </el-table-column>
               <el-table-column
                prop="value2"
                :label="attr[2].attr"
                v-if="isShowThree"
                >
              </el-table-column>
              <el-table-column
                prop="sku_sn"
                label="规格编码"
              >
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.goods_sku_sn"></el-input>
              </template>
              </el-table-column>
              <el-table-column
                prop="outer_price"
                label="商品市场价"
                label-class-name="require"
              >
              <template slot-scope="scope">

                <el-input size="small" v-model="scope.row.outer_price" @change="fillinfo()"></el-input>
              </template>
              </el-table-column>
              <el-table-column
                prop="inner_price"
                label="平台售价"
                label-class-name="require"
              >
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.inner_price" @change="fillinfo()"></el-input>
              </template>
              </el-table-column>
              <el-table-column
                prop="stock_num"
                label="库存"
                label-class-name="require"

              >
               <template slot-scope="scope">
                 <el-input size="small" v-model="scope.row.stock_num" :maxlength="6" @change="fillinfo()"></el-input>
              </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作">
                <template slot-scope="scope">
                  <div class="c5">
                    <span class="curp" @click="delNorms(scope.$index,scope.row)">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="df" style="margin-top:32px;">
            <span class="c1" style="line-height:32px"> <span class="cf">*</span> 商品市场价：</span>
            <div>
             <el-input v-model="mid.tmallPrice" size="small" style="width:240px" placeholder="请输入"></el-input>
             <span style="margin:0 5px;">元</span>
            </div>
          </div>
          <div class="df mt24">
            <span class="c1" style="line-height:32px">&nbsp;&nbsp;&nbsp;&nbsp;<span class="cf">*</span> 平台售价：</span>
            <div>
             <el-input v-model="mid.distributionPrice" size="small" style="width:240px" placeholder="请输入"></el-input>
             <span style="margin:0 5px;">元</span>
             <span class="c9 ft12">建议平台售价低于商品市场价</span>
            </div>
          </div>
          <div class="df mt24">
            <span class="c1" style="line-height:32px">&nbsp;&nbsp;<span class="cf">*</span>可售库存数：  </span>
            <div>
             <el-input v-model="mid.stock" size="small" style="width:240px" placeholder="请输入" :maxlength="6"></el-input>
             <span style="margin:0 5px;">件</span>
             <span class="c9 ft12">如果添加规格，商品库存可不填</span>
            </div>
          </div>
          <!-- <div class="df mt24">
            <span class="c1" style="line-height:32px">&nbsp;&nbsp;&nbsp; 商品优惠券：</span>
            <div>
             <el-select v-model="mid.status" placeholder="请选择" style="width:240px" size="small" >
                <el-option
                  v-for="item in mid.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
             </el-select>
             <span class="c9 ft12">平台售价必须必商品市场价低，如果设置规格，则下单用规格价</span>
            </div>
          </div> -->
          <div class="df mt24" style="margin-left:-10px">
            <span class="c1 cf" style="line-height:32px"><span class="cf">*</span> 设置商品佣金：  </span>
            <div>
             <el-input v-model="mid.commission" size="small" style="width:240px" placeholder="请输入" ></el-input>
             <span style="margin:0 5px;" class="c4">%<!--预计佣金：XX元--></span>
             <!-- <span class="c9 ft12">（佣金=（平台售价-优惠券）*佣金比例）</span> -->
            </div>
          </div>
          <p class="c1 ft14" style="line-height:32px;margin-top:10px" > 商品详情：</p>
          <div class="df">
            <div id="ueditor"></div>
          </div>
          <el-button type="primary" size="small" style="width:74px" class="mt32" @click="save" v-if="!$route.params.id">保存 </el-button>
          <el-button type="primary" size="small" style="width:74px" class="mt32" @click="openTip" v-else>保存 </el-button>
        </div>
    </div>
    <div>


    </div>
  </div>
</template>

<script>
import {check} from '@/js/reg'
export default {
  data () {
    return {
        editor:null,
        config: {
          serverUrl:this.$api.root+"/qiniu/controller",
          BaseUrl: "",
          UEDITOR_HOME_URL: "static/UE/",
          toolbars: [[
                    'undo', 'redo', '|', 'fontsize', '|', 'blockquote', 'horizontal', '|', 'removeformat', 'formatmatch'
                    ], ['bold', 'italic', 'underline', 'forecolor', 'backcolor', '|', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'insertorderedlist', 'insertunorderedlist', '|',
                        'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter',
                    ]],
          //设置编辑器初始化高度
          initialFrameWidth: 1000, //初始化编辑器宽度,默认1000
          initialFrameHeight: 500, //初始化编辑器高度,默认320
          minFrameWidth: 600, //编辑器拖动时最小宽度,默认800
          minFrameHeight: 220, //编辑器拖动时最小高度,默认220
          //允许编辑器input
          inputXssFilter: false,
          elementPathEnabled: false,
          wordCount: false,
          enableAutoSave: false, //禁止自动保存
          autoSyncData: false ,//自动同步编辑器要提交的数据
          autoFloatEnabled: false , //是否保持toolbar的位置不动，默认true
          autoHeightEnabled: false ,//是否自动长高，默认true
          imageScaleEnabled: false ,//启用图片拉伸缩放
        },
        action: this.$api.qiNiuUpload,
        top:{
          taoBaoUrl:'',
          code:"",
          name:"",
          main_url:"",
          shopImg:[
          ]
        },
        mid:{
          tmallPrice:"",
          distributionPrice:"",
          stock:"",
          options:[
            {value:"",label:"全部"},
            {value:"1",label:"在架中"},
            {value:"2",label:"上架"},
          ],
          status:"",
          commission:""//佣金
        },
        tableData:[

        ],
        id:'',
        num:0,
        setObj:{
          first:{
            cate_name:''
          },
          second:{
            cate_name:""
          },
        },
        attr:[ {attr:'',value:[ ],checkList:[]}, {attr:'',value:[ ],checkList:[]}, {attr:'',value:[ ],checkList:[]}],
        skuIndex:0,
        name:'',
        tag:'',
        isShowSku:false,//是不是要展示规格
        isShowAdd:false,//是不是增加规格
        isShowEdit:false,//是否是编辑
        isShowFirst:false, //是否显示第一个规格
        isShowTwo:false,
        isShowThree:false,
        // 填充数据
        fill:{
          code:'',
          outer_price:'',
          inner_price:'',
          store_num:''
        },
        // 编辑的时候传入sku_id
        sku_id:null,
        low:-1,
        hight:-1
    };
  },
  mounted(){
    this.editor = UE.getEditor('ueditor', this.config); // 初始化UE
    this.editor.addListener("ready", ()=>{
      if(this.$route.params.id){
          this.init()
      }else{
        this.setObj=  JSON.parse(sessionStorage.getItem('cateList'))
      }
    });
  },

  methods: {
    //价格自动填充
    fillinfo(){
      // console.log(this.tableData);
      var inner_price = [];  //平台售价
      var stoke = 0;  //库存
      for (let index = 0; index < this.tableData.length; index++) {
        inner_price.push(this.tableData[index].inner_price);
        stoke+=Number(this.tableData[index].stock_num);
      }
      this.mid.stock = stoke;//总库存数
      inner_price.sort(function (a, b) {
        return a-b;
      });
      this.mid.distributionPrice = inner_price[0];//平台售价最低价格
      this.low = inner_price[0];//平台售价最低价格;
      this.high = inner_price[inner_price.length-1];//平台售价最高价格
      for (let index = 0; index < this.tableData.length; index++) {
        if (this.tableData[index].inner_price == inner_price[0]) {
          this.mid.tmallPrice = this.tableData[index].outer_price;
          break;
        }
      }
    },
    goBack(){
      this.$router.push({
        name:"Good"
      })
    },
    // 去往设置页面
    goSet(){
      this.$router.push({
        name:"GoodSet",
        params:{
          id:this.$route.params.id,
          isEdit:true
        }
      })

    },
    // 上传主图
    uplodMainPic(req){
      this.$upload(req,'goods',(data)=>{
        this.top.main_url = this.$api.qiNiuUrl + '/' + data.key
      })
    },
     // 上传商品图片
    uplodShopPic(req){
      if(this.top.shopImg.length>=5){
        this.$message.error("商品主图最多上传5张");
        return;
      }
       this.$upload(req,'goods',(data)=>{
        var url = this.$api.qiNiuUrl + '/' + data.key;
        this.top.shopImg.push( url  )
      })
    },
    // 删除商品图片
    delShopPic(index){
      this.top.shopImg.forEach( (el,i,arr)=>{
        if(i==index){
          arr.splice(i,1)
        }
      } )
    },
    // 添加规格
    addNorms(){
      let num =0;
      this.attr.forEach( el=>{
        if(el.attr){
          num++
        }
      } )
      if(num==3){
        this.skuIndex = 2;
        return
      }
      this.skuIndex = num;
      this.isShowAdd=true
      this.isShowSku =false;
      this.isShowEdit =false

    },
    // 删除规格
    delNorms(i,obj){
      if(obj.id){
        this.id+=obj.id+','
      }
      this.tableData.forEach((el,index,arr) => {
          if(index==i){
            arr.splice(i,1)
          }
      });
    },
    getlowhigh(){
        var inner_price = [];  //平台售价
        for (let index = 0; index < this.tableData.length; index++) {
          inner_price.push(this.tableData[index].inner_price);
        }
        inner_price.sort(function (a, b) {
          return a-b;
        });
        this.low = inner_price[0];//平台售价最低价格;
        this.high = inner_price[inner_price.length-1];//平台售价最高价格
    },
    save(){
        this.getlowhigh();
        // 验证商品属性
        var arr =[
          { content: !(this.setObj.first.cate_id==0||this.setObj.second.cate_id==0),error:'请修改商品分类',num:false,},
          { content: this.top.code,error:'商品编码必填',num:false},
          { content: this.top.name,error:'商品名称必填',num:false},
          { content: this.top.main_url,error:'必须上传商品主图',num:false},
          { content: !(this.top.shopImg.length==0),error:'商品图片必须上传',num:false},
          { content: this.mid.tmallPrice,error:'商品市场价价必须填写,必须是数字保留两位小数',price:true},
          { content: this.mid.distributionPrice,error:'平台售价必须填写,且必须是数字保留两位小数',price:true},
          { content: !(+this.mid.distributionPrice>+this.mid.tmallPrice),error:'平台售价必须比商品市场价价低',num:false},
          { content: !(+this.mid.distributionPrice<this.low || +this.mid.distributionPrice>this.high),error:'商品的平台售价必须在规格（SKU）的平台售价区间内（'+this.low+"-"+this.high+'），请修改',num:false},
          { content: !(!this.mid.stock&&this.tableData.length==0),error:'如果不添加规格库存必须填写',num:false},
          { content: !((isNaN(this.mid.stock)||+this.mid.stock<=0)&&this.tableData.length==0),error:'库存必须是数字且必须大于零',num:false},
          { content: this.mid.commission,error:'佣金比例必须填写且是保留两位小数的数字',price:true},
          { content: !(+this.mid.commission>100||+this.mid.commission<=0),error:'佣金比例必须是1-100的数字',num:false},
        ]
        if(check( arr )) return;

        // 验证规格
        for( var i=0;i<this.tableData.length;i++ ){
              let el = this.tableData[i]
              let flag  = check( [
               { content: el.goods_sku_sn,error:`第${i+1}行商品编码必填`,num:false },
               {content: el.outer_price,error:`第${i+1}行商品售价必须填写,必须是数字保留两位小数`,price:true},
               {content: el.inner_price,error:`第${i+1}行平台售价必须填写,必须是数字保留两位小数`,price:true},
               { content: !(+el.inner_price>+el.outer_price),error: `第${i+1}行平台售价必须比商品市场价价低`,num:false},
               { content: el.stock_num,error:`第${i+1}行库存必须是数字且必须大于零`,num:true},
             ])
             if(flag) return
        }
        if(this.attr.length>3) { this.$message.error("规格最多只有三个，请合理删除");return }
        for( var i=0;i<this.attr.length;i++ ){
          let el = this.attr[i]
             if(!el.attr){
                this.attr.splice(i,1)
                i--
            }
            try{
              el.checkList =el.checkList.join()
            }catch(err){
              console.log(err)
            }
        }
        var pics = this.top.shopImg.join();
        var description;
            description = this.editor.getContent();
        var params ={
          title:this.top.name, //商品名字
          goods_sn:this.top.code,//编码
          main_pic:this.top.main_url,//主图
          pics:pics,//图片
          outer_price:this.mid.tmallPrice,//商品市场价
          inner_price:this.mid.distributionPrice, //分销价
          rebate_percent:this.mid.commission,//佣金
          description:description, //详情
          sku_type:this.tableData.length==0?1:2, //判断有没有添加规格
          cate_id:this.setObj.second.cate_id,
          attr: JSON.stringify(this.attr) ,
          sku:JSON.stringify(this.tableData),
          item_url:this.top.taoBaoUrl

        };
        if( this.tableData.length==0){
          params.stock_num=this.mid.stock;//库存
        }
        var url;
        if(this.$route.params.id){
          // 编辑
          params.id = this.$route.params.id;
          url = this.$api.editGoods;
          params.sku_id =  this.sku_id
        } else {
          // 新建
          url = this.$api.addGoods;
        }

        this.$post(url,params ).then( res=>{
          if(res.code=="000"){
            this.$message.success(res.msg)
            this.$router.push( {
              name:"Good"
            } )
          }
        })
    },
    init(){
      // this.$route.params.id
      // 设置编译器内容
        this.$post(this.$api.goodsDetail,{id:this.$route.params.id} ).then( res=>{
          if(res.code=="000"){
            this.top.name = res.data.title;
            this.top.code = res.data.goods_sn;
            this.top.main_url = res.data.main_pic;
            this.top.shopImg= res.data.pics.split(',')
            this.mid.tmallPrice =res.data.outer_price;
            this.mid.distributionPrice =res.data.inner_price;
            this.mid.stock =res.data.stock_num;
            this.mid.commission =res.data.rebate_percent;
            this.top.taoBaoUrl =res.data.item_url
            this.editor.setContent((res.data.description&&res.data.description)||"");
            this.sku_id = res.data.sku_id
            this.top.taoBaoUrl = res.data.item_url
            if(res.data.attr.length==0){
                res.data.attr.push(...[{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]},]  )
            }else if(res.data.attr.length==1){
                this.isShowFirst =true;
                res.data.attr.push(...[{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]}]  )
            }else if(res.data.attr.length==2){
                res.data.attr.push({attr:'',value:[ ],checkList:[]} );
            }
            res.data.attr.forEach( (el,i)=>{
                try {
                  el.checkList = el.checkList.split(',')
                } catch (error) {
                  el.checkList = []

                }
               if(i==0&& el.checkList.length!=0){
                  this.isShowFirst=true
               }
               if(i==1&& el.checkList.length!=0){
                  this.isShowTwo=true
               }
              if(i==2&& el.checkList.length!=0){
                  this.isShowThree=true
               }
             } )

            this.attr =res.data.attr

            this.isShowSku = true
            if(res.data.sku_type==2){
              res.data.sku.forEach(( (el,i)=>{
                el.value =  el.attr_names.split(',')[0]
                el.value1 =  el.attr_names.split(',')[1]||''
                el.value2 =  el.attr_names.split(',')[2]||''
               }))
               this.tableData =  res.data.sku
            }
            if(this.$route.params.isEdit){
             this.setObj = JSON.parse(sessionStorage.getItem('cateList'))
            }else{
              this.setObj ={first: res.data.first,second:res.data.second  }
            }
            if(res.data.first.cate_id!=0){
              sessionStorage.setItem('cateList',JSON.stringify(this.setObj))
            }else{
              sessionStorage.clear()
            }
          }
        } )

    },
    //  {attr:'',value:[ ],checkList:[]
    // 获取淘宝链接商品详情
    getDetialTaoBao(){
      this.$post( this.$api.goodTaoBao,{url:this.top.taoBaoUrl} ).then( res=>{
        if(res.code==0){
            if(!res.data.item_cover_image){
              this.$message.error( '此商品暂时无法获取' );
              return;
            }
          this.top.name =res.data.item_title;
          this.top.main_url = res.data.item_cover_image;
          this.top.shopImg= res.data.item_images;
          var str="";
          if(typeof res.data.item_content =='object'){
              res.data.item_content.img.forEach( el=>{
                  str+=`<img src='${el}' style='margin-top:-5px'>`
              } )
          }else{
            str =res.data.item_content
          }
         this.editor.setContent(str||"",true);
         res.data.attr.forEach((el,i,arr)=> {
            el.attr= el.prop_name
            el.value = el.values.sku_property_value.map( el2=>{
                return{
                  attr_name:el2.name
                }
              })
            el.checkList =res.data.attr.length<=3&&el.values.sku_property_value.map( el2=> el2.name ) ||[]
         })
         if(res.data.attr.length==0){
            res.data.attr.push(...[{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]},]  )
         }else if(res.data.attr.length==1){
            this.isShowFirst =true;
            res.data.attr.push(...[{attr:'',value:[ ],checkList:[]},{attr:'',value:[ ],checkList:[]}]  )
         }else if(res.data.attr.length==2){
            res.data.attr.push({attr:'',value:[ ],checkList:[]} );
            this.isShowFirst =true;
            this.isShowTwo =true
         }else {
            this.isShowThree =true
            this.isShowFirst =true;
            this.isShowTwo =true
         }
         this.attr = res.data.attr;
         this.isShowSku = true;
         this.isShowEdit=false
         this.tableData = res.data.attr.length<=3&&res.data.sku_list.map( el=>{
            return{
              // goods_sku_title:el.sku_name,
              outer_price:el.price,
              goods_sku_sn:'',
              inner_price:'',
              stock_num:el.stock_num,
              sku_attrs:el.sku_attrs,
              value:el.sku_attrs.length>0&&el.sku_attrs[0].attr_name,
              value1:el.sku_attrs.length>1&&el.sku_attrs[1].attr_name||'',
              value2:el.sku_attrs.length>2&&el.sku_attrs[2].attr_name||'',
              }
            } )||[]


        }
      } )

    },
    // 添加标签
    addTag(event){
      let flag =false;
      if(!this.tag){
        return
      }
      this.attr[this.skuIndex].value.forEach( el=>{
        if(el.attr_name==this.tag){
          flag =true;
          return;
        }
      } )
      if(flag) return;
      this.attr[this.skuIndex].value.push( {attr_name: this.tag})
      this.tag=""
    },
    // 删除标签
    delTag(tag){
       this.attr[this.skuIndex].value.forEach( (el,i,arr)=>{
         if(el.attr_name==tag){
           arr.splice(i,1)
         }
       }  )
    },
    // 保存规格
    saveSku(){
      if(!this.name){
        this.$message.error('请添加属性名称')
        return
      }
      if(this.attr[this.skuIndex].value.length==0){
        this.$message.error('请添加属性')
        return
      }
      this.attr[this.skuIndex].attr =this.name;
      this.name ="";
      this.isShowSku = true
      this.isShowAdd =false
    },
    // 取消规格
    cancleSku(){
        this.attr[this.skuIndex].attr=""
        this.attr[this.skuIndex].value=[];
        this.name ="";
        this.tag=""
        if(this.skuIndex==0){
          this.isShowSku = false
          this.isShowAdd =false
        }else{
          this.isShowSku = true
          this.isShowAdd =false
        }

    },
    // 编辑规格
    editSKu(index){
      if(this.attr.length>3) {this.$message.error('请保持规格不超过三条');return}
      this.isShowSku = false
      this.isShowAdd =true;
      this.isShowEdit=true
      this.skuIndex =index;
      this.name =  this.attr[index].attr
    },
    // 删除规格属性
    delSku(index){
      if(this.attr.length>3){
        this.attr.forEach( (el,i,arr)=>{
          if(i==index){
            arr.splice(i,1)
          }
        } )
      }else{
        this.attr[index].attr ='';
        this.attr[index].value =[];
        this.attr[index].checkList =[];
      }

       this.selectValue()

    },
    // 选择
    selectValue(){
        this.tableData=[]
        if( this.attr[0].checkList.length==0){
            if(this.attr[1].checkList.length!=0&&this.attr[2].checkList.length==0){
                 this.attr[1].checkList.forEach((el1)=>{
                    this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                                stock_num:"",
                                name1:this.attr[1].attr,
                                value1:el1,
                                sku_attrs:[ {attr:this.attr[1].attr,attr_name:el1 }]} )
                                })
              }else if(this.attr[2].checkList.length!=0&&this.attr[1].checkList.length==0){
                this.attr[2].checkList.length!=0&&this.attr[2].checkList.forEach((el2)=>{
                      this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                                stock_num:"",
                                name2:this.attr[2].attr,
                                value2:el2,
                                sku_attrs:[ {attr:this.attr[2].attr,attr_name:el2 }]}  )

                  } )
              }else if(this.attr[1].checkList.length!=0&&this.attr[2].checkList.length!=0){
                this.attr[1].checkList.length!=0&&this.attr[1].checkList.forEach((el1)=>{
                    this.attr[2].checkList.length!=0&&this.attr[2].checkList.forEach((el2)=>{
                          this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                                    stock_num:"",
                                    name1:this.attr[1].attr,
                                    name2:this.attr[2].attr,
                                    value1:el1,
                                    value2:el2,
                                    sku_attrs:[ {attr:this.attr[1].attr,attr_name:el1 },{attr:this.attr[2].attr,attr_name:el2 }]}  )

                      } )
              } )

            }
        }
        this.attr[0].checkList.forEach((el)=>{
            if( this.attr[1].checkList.length==0&&this.attr[2].checkList.length==0){
                    this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                                stock_num:"",
                                name:this.attr[0].attr,
                                value:el,
                                sku_attrs:[ {attr:this.attr[0].attr,attr_name:el }]}  )
              }

            if(this.attr[1].checkList.length==0&&this.attr[2].checkList.length!=0){

                this.attr[2].checkList.length!=0&&this.attr[2].checkList.forEach((el2)=>{
                  this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                            stock_num:"",
                            name:this.attr[0].attr,
                            name2:this.attr[2].attr,
                            value:el,
                            value2:el2,
                            sku_attrs:[ {attr:this.attr[0].attr,attr_name:el },{attr:this.attr[2].attr,attr_name:el2 }]}  )

              } )
              }
              this.attr[1].checkList.length!=0&&this.attr[1].checkList.forEach((el1)=>{
                  if( this.attr[2].checkList.length==0){
                    this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                                stock_num:"",
                                name:this.attr[0].attr,
                                name1:this.attr[1].attr,
                                value:el,
                                value1:el1,
                                sku_attrs:[ {attr:this.attr[0].attr,attr_name:el },{attr:this.attr[1].attr,attr_name:el1 }]}  )
                  }

              this.attr[2].checkList.length!=0&&this.attr[2].checkList.forEach((el2)=>{
                    this.tableData.push({goods_sku_sn:'',outer_price:"",inner_price:"",
                              stock_num:"",
                              name:this.attr[0].attr,
                              name1:this.attr[1].attr,
                              name2:this.attr[2].attr,
                              value:el,
                              value1:el1,
                              value2:el2,
                              sku_attrs:[ {attr:this.attr[0].attr,attr_name:el },{attr:this.attr[1].attr,attr_name:el1 },{attr:this.attr[2].attr,attr_name:el2 }]}  )
                } )
          } )
        } )

      this.isShowFirst = this.attr[0].checkList.length==0?false:true
      this.isShowTwo = this.attr[1].checkList.length==0?false:true
      this.isShowThree = this.attr[2].checkList.length==0?false:true

    },
    // 批量填充
    batchFill(){
      var arr =[
          // { content: this.fill.code,error:'请输入编码'},
          { content: this.fill.outer_price,error:'商品市场价必须填写且是保留两位小数的数字',price:true},
          { content: this.fill.inner_price,error:'平台售价必须填写且是保留两位小数的数字',price:true},
          { content: !(+this.fill.inner_price>+this.fill.outer_price),error:'平台售价必须比商品市场价低'},
          { content: this.fill.store_num,error:'库存必须填写且大于零的数字',num:true},
        ]
        if(check( arr )) return;
        if(this.tableData.length==0) return;
        var allstokenum = 0;
        this.tableData.forEach( el=>{
          el.goods_sku_sn = this.fill.code;
          el.outer_price = this.fill.outer_price;
          el.inner_price =this.fill.inner_price;
          el.stock_num = this.fill.store_num;
          allstokenum += Number(this.fill.store_num);
        })
        this.mid.stock = allstokenum; //总库存
        this.mid.tmallPrice = this.fill.outer_price; //市场价
        this.mid.distributionPrice = this.fill.inner_price; //平台售价
    },
    openTip(){
       this.$confirm('商品编辑后，需要重新申请上架，是否确定修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.save()
        }).catch(() => {

        });
    }
  },
  destroyed() {
    this.editor.destroy();
    },
}

</script>
<style lang='less' scoped>
.title{
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
}
.main {
  padding-bottom: 24px;
  margin-bottom: 24px;
  .top{
    padding:40px 0 0 53px;
    .upload-demo/deep/.btn{
      color:#5CB3FF;
      border:1px solid #5CB3FF;
    }
    .mask{
      width: 120px;
      height: 120px;
      background-color: rgba(0,0,0,0.6);
      position:absolute;
      top:0;
      display: none;
    }
    .img{
      width:120px;
      height:120px;
      border:1px solid #DCDFE6;


    }
    .img-box{
      margin-right: 10px;
      &:hover .mask{
        display: block;
        }
     }

    .del{
      position: absolute;
      top:35%;
      left:48%;
      transform: translate(-50%);
      font-size: 35px;
    }

  }
  .table{
    margin-top:16px;
    padding-right: 30px;
    &/deep/.el-table--border th{
        border-right: 0;
      }
    &/deep/.el-table--border td{
      border-right: 0;
    }
    &/delep/.el-table th>.cell{
         color:red !important;
        }
  }
}

.main-img{
  width:120px;
  height:120px;
  border:1px solid #DCDFE6
}
.no-img{
    background-color: #DCDFE6;
    display: flex;
    justify-content: center;
    align-items: center;
    i{
      font-size: 40px;
      color:#FBFDFF
    }
}
.text{
  width: 350px;
  padding: 10px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  display: inline-block;
  height:100px;
  overflow: hidden;
  overflow-y: auto
}
.text/deep/.el-input__inner{
  border: none
}
.attr{
  border:1px solid #ebeef5;
  padding: 20px;
  margin-top:10px;
  width: 70%
}
.checkList-box/deep/.el-checkbox{
  margin: 0 10px;
}

</style>
<style>
.cell.require:before {
    color: red;
    content: "*";
    margin: 0 2px;
}
</style>
