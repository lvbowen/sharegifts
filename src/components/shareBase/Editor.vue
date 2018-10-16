<template>
  <div>
    <div id="editorElem"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {mapGetters, mapMutations} from 'vuex'
  import { getQiNiuToken } from "@/api/qiniu"

  export default {
    name: "Editor",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        editor: {},
        editorContent: '',
        upload: {
          token: '',
          action: '',
          key: ''
        },
      }
    },
    created(){
      this.getToaken()
    },
    mounted() {
      this.initEditor()
     
    },
    methods: {
      ...mapMutations({
        setGoodDesc: 'SET_GOOD_DESC'
      }),
      getToaken () {
        getQiNiuToken({ type: 'goods' }).then(res => {
          if (res.success) {
            this.upload.token = res.data.up_token
            this.upload.action = res.data.upload_url
          }
        })
      },
      initEditor () { 
        this.editor = new E('#editorElem') /* 括号里面的对应的是html里div的id */
        /* 配置菜单栏 */  
        this.editor.customConfig.menu = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]    
        this.editor.customConfig.uploadImgMaxLength = 5 
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024 /* 将图片大小限制为 3M 默认为5M / 
        /* 自定义图片上传（支持跨域和非跨域上传，简单操作）*/ 
        this.editor.customConfig.customUploadImg = async (files, insert) => { 
            let req=files[0]
            let filetype = "";
            if (req.type === "image/png") {
              filetype = "png";
            } else {
              filetype = "jpg";
            }
            if (req.size / 1024 / 1024 > 2) {
              this.$message.error("上传图片不能大于2M");
              return;
            }
            /* files 是 input 中选中的文件列表 */ 
            let formdata = new FormData() 
            const keyname = "goods/" + new Date().getTime() + "_" + Math.floor(Math.random() * 100) + "." + filetype;
            formdata.append('file', req) 
            formdata.append("token", this.upload.token);
            formdata.append("key", keyname);
            /* upload方法是后台提供的上传图片的接口 */
            /* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中*/ 
            this.$post(process.env.UPLOAD_API, formdata, "multipart/form-data").then(data => {
              this.$nextTick(() => {
                insert(process.env.IMAGE_API + data.key)
              })
            });
        } 
        this.editor.customConfig.onchange = (html) => {
            this.editorContent = html
        } 
        this.editor.create() /* 创建编辑器 */ 
        if (this.isEdit) {
          this.editor.txt.html(this.goodDesc)  // 讲获取的内容展示在文本编辑器中
        } else {
          this.editor.txt.html('')
        }
      },
    },
    computed: {
      ...mapGetters(['goodDesc'])
    },
    watch: {
      // 如果从vuex获取的商品详情有更新，则在文本编辑器展示最新的内容
      goodDesc(newVal, oldVal) {
        if (newVal != oldVal) {
          this.editor.txt.html(newVal)
        }
      },
      // 如果通过商品链接获取商品详情后，自己再手动更改详情，则会将修改后的详情存储到vuex里
      editorContent(newVal, oldVal) {
        if (newVal != oldVal) {
          this.setGoodDesc(this.editorContent)
        }
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  #editorElem {
    width: 950px;
    margin-top: 10px;
    .w-e-text-container {
      height: 500px !important;
    }
  }

  #saveBtn {
    margin-top: 30px;
  }
</style>
