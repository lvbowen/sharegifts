import fetch from '@/utils/fetch'

const qs = require('qs')

// 获取店铺详情
export function getShopInfo(params) {
  return fetch({
    url: '/gaofan/Shop/get_shop_info',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 商户绑定店铺
export function bindShop(params) {
  return fetch({
    url: '/gaofan/Shop/bind_shop',
    method: 'post',
    data: qs.stringify(params)
  })
}
// 获取验证码
export function getVerity(params) {
  return fetch({
    url: '/gaofan/Shop/get_verification_code',
    method: 'post',
    data: qs.stringify(params)
  })
}
export function getToken(params) {
  return fetch({
    url: '/QiniuApi/getQiniuToken',
    method: 'get',
    params
  })
}

export function putb64(str){
  var pic = str;
  var url = "http://upload.qiniup.com/putb64/20264"; //非华东空间需要根据注意事项 1 修改上传域名
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange=function(){
    if (xhr.readyState==4){
      document.getElementById("myDiv").innerHTML=xhr.responseText;
    }
  }
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.setRequestHeader("Authorization", "UpToken 填写你从服务端获取的上传token");
  xhr.send(pic);
}
export function uperweima(params) {
  let formdata = new FormData();
  formdata.append("file", req.file);
  formdata.append("token", res.data.up_token);
  formdata.append("key", keyname);
  return fetch({
    url: '/qiNiuUpload',
    method: 'post',
    params
  })
}
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
