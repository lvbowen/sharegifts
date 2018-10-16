<template>
  <div>
    <div class="qrCode">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import QRCode from 'qrcode'

  Vue.use(QRCode)

  export default {
    name: 'Qrcode',
    props: {
      qrcode: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this.createQRcode()
    },
    methods: {
      // 生成二维码
      createQRcode() {
        let canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, this.qrcode, function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .qrCode {
    #canvas {
      width: 116px;
      height: 116px;
    }
  }

  .tip {
    font-size: 12px;
    color: #797979;
  }

</style>
