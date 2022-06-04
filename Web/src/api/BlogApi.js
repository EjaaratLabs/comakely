import apiUtil from '../utilities/apiHelper'


export function GetBlogList(token) {
  return apiUtil.getApi('blog/list', token, {})
}

