import apiUtil from '../utilities/apiHelper'

export function CreateNewMessage(data, token) {
  return apiUtil.postApi('messagecenter/send', token, data)
}
