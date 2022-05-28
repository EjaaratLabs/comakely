import apiUtil from '../utilities/apiHelper'

export function Login(data) {
  return apiUtil.postApi('api/user/login', "", { "f8996da763b7a969b1": data.userName, "d74ff0ee8da3b9806b": data.password })
}

export function Register(data) {
  return apiUtil.postApi('registeruser', "", { "userName": data.userName, "password": data.password,"name":data.name,"userType":data.userType,"phone":data.phone })
}


export function getUserProfile(token) {
  return apiUtil.getApi('user/details', token)
}

