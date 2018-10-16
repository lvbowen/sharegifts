import fetch from '@/utils/fetch'

// 获取上传七牛的token
export function getQiNiuToken(params) {
  return fetch({
    url: '/QiniuApi/getQiniuToken',
    method: 'get',
    params
  })
}


