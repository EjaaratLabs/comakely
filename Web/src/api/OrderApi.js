import apiUtil from '../utilities/apiHelper'

export function CreateNewOrder(data, token) {
  return apiUtil.postApi('order/new', token, data)
}

export function GetVendorOrders(token) {
  return apiUtil.getApi('order/vendor/list', token, {})
}

export function UpdateOrderStatus(data, token) {
  return apiUtil.postApi('order/status/update', token, data)
}