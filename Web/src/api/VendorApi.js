import apiUtil from '../utilities/apiHelper'


export function GetVendors(token,adType) {
  return apiUtil.getApi('vendors', token, {adType})
}
export function GetVendorDetails(token,id) {
  return apiUtil.getApi("vendor/"+id+"/details", token, {})
}
export function CreateUpdateVendorProfile(data,token) {
  return apiUtil.postApi('user/vendorprofile', token, data)
}