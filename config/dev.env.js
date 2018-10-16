'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://sharegifts.ecbao.cn/"',
  IMAGE_API: '"https://shareimage.ecbao.cn/"',
  UPLOAD_API: '"https://up.qbox.me"'
})
