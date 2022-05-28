import apiUtil from '../utilities/apiHelper'

export function postNewAd(data,token) {
  return apiUtil.postApi('newad', token, data)
}
export function GetAds(token,adType) {
  return apiUtil.getApi('ads', token, {adType})
}
export function GetAdDetails(token,id) {

  return apiUtil.getApi("ads/"+id+"/details", token, {})
}
