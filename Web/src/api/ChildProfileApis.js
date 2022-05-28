import apiUtil from '../utilities/apiHelper'

export function CreateNewProfile(data,token) {
  return apiUtil.postApi('child/newprofile', token, data)
}

export function GetProfilesList(data,token) {
  return apiUtil.getApi('child/list', token, {})
}
export function GetAvailableProfilesList(token) {
  return apiUtil.getApi('child/list', token, {isLinked:0})
}
export function LinkDonor(data,token) {
  return apiUtil.postApi('donor/link/child', token, data)
}

export function DeLinkDonor(data,token) {
  return apiUtil.postApi('donor/delink/child', token, data)
}
