import request from '@/utils/request'
// 修改密码
export const editPassword = (data: any) =>
  request({
    'url': '/employee/editPassword',
    'method': 'put',
    data
  })
// 获取营业状态
export const getStatus = () =>
  request({
    'url': `/shop/status`,
    'method': 'get'
  })
// 设置营业状态
export const setStatus = (data: any) =>
  request({
    'url': `/shop/status/` + data,
    'method': 'put',
    'data': data
  })
// 获取店铺信息
export const getInfo = () =>
  request({
    'url': `/shop/info`,
    'method': 'get'
  })
// 设置店铺信息
export const setInfo = (data: any) =>
  request({
    'url': `/shop/info`,
    'method': 'post',
    'data': data
  })