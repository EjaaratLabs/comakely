import apiUtil from '../utilities/apiHelper'

export function CreateNewProfile(data,token) {
  return apiUtil.postApi('donor/newprofile', token, data)
}

export function GetProfilesList(data,token) {
  return apiUtil.getApi('donor/list', token, data)
}

export function GetLinkedChild(data,token) {
  return apiUtil.getApi('donor/link/list', token, data)
}


export function GetDonorDetails(data,token) {
  return apiUtil.getApi('donor/details', token, data)
}

