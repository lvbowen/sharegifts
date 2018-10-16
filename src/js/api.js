var root = ''
// 开发环境或者测试环境公共url
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  root = 'https://sharegifts.ecbao.cn'
} else if (process.env.NODE_ENV == 'production') {
  // 生产环境公共url
  root = 'https://xfs.aiju.com'
}

let qiNiuUrl = process.env.NODE_ENV == "development" ? "https://shareimage.ecbao.cn" : 'https://shareimage.ecbao.cn';
let qiNiuUpload = process.env.NODE_ENV == "development" ? "https://up.qbox.me" : 'https://up.qbox.me';
export let api = {}
api.root = root
api.qnGetToken = root + "/qiniuApi/getQiniuToken" //上传七牛的token
api.qiNiuUrl = qiNiuUrl;//七牛的图片的外链域名
api.qiNiuUpload = qiNiuUpload;//七牛上传图片的地址
// 商品管理
api.goodsList = root + '/goods/Goods/goodsList' //商品列表
api.applyForSale = root + '/goods/Goods/applyForSale' //商品申请上架
api.unShelve = root + '/goods/Goods/unShelve' //商品申请下架
api.addGoods = root + '/goods/Goods/addGoods' //新增商品
api.goodsDetail = root + '/goods/Goods/goodsDetail' //商品详情
api.editGoods = root + '/goods/Goods/editGoods' //商品编辑paj
api.getShelveReason = root + '/goods/Goods/getShelveReason' //商品下架原因
api.getRefuseReason = root + '/goods/Goods/getRefuseReason' //商品拒绝原因
api.updateStock = root + '/goods/Goods/updateStock' //更新库存
api.skuList = root + '/goods/Goods/skuList' //获取sku
api.goodCateList = root + '/goods/Category/cateList' //商品分类
api.goodTaoBao = root + '/goods/Goods/fetchGoods' //获取淘宝链接的商品详情


// 订单管理
api.orderList = root + '/order/Order/index' //获取订单列表
// 商户结算
api.merchantList = root + '/merchants/Commission/lists' //商户结算列表
api.merchantDetail = root + '/merchants/Commission/detail' //商户结算详情
api.exportDetail = root + '/merchants/Commission/detailExport' //导出

// 获取用户信息
api.getUserInfo = root + "/merchants/MerchantUser/userInfo"
// 审核
api.aptitude = root + '/merchants/CredentialAudit/create' //资质审核
api.aptitudeDetail = root + '/merchants/CredentialAudit/info' //资质审核详情
// 登录接口
api.login = root + '/website/Passport/loginSite' //资质审核详情
//注册接口
api.regester = root + '/website/Passport/registerSite' //资质审核详情
api.sendCode = root + '/website/Passport/sendCode' //获取验证码
// 商户资料申请接口
api.audit = root + '/website/Passport/audit' //商户资料申请

api.orderOrderdaDan = root + '/order/Order/daDan' //商户资料申请
api.orderOrderorderExport = root + '/order/Order/orderExport' //订单导出
api.orderOrderimport = root + '/order/Order/import' //订单导入发货


// e


