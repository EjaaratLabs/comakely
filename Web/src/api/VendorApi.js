import apiUtil from '../utilities/apiHelper'


export function GetVendors(token, adType) {
  return apiUtil.getApi('vendors', token, { adType })
}

export function GetVendorProducts(token) {
  return apiUtil.getApi('product/list', token)
}
export function GetProductDetails(token, productId) {
  return apiUtil.getApi('product/details', token, { productId })
}
export function GetVendorDetails(token, id) {
  return apiUtil.getApi("vendor/" + id + "/details", token, {})
}
export function CreateUpdateVendorProfile(data, token) {
  return apiUtil.postApi('user/vendorprofile', token, data)
}
export function CreateVendorProductProfile(data, token) {
  return apiUtil.postApi('product/newproduct', token, data)
}

export function CreateVendorServices(data, token) {
  return apiUtil.postApi('services/newservice', token, data)
}

export function GetVendorServices(token) {
  return apiUtil.getApi('services/vendor/list', token)
}