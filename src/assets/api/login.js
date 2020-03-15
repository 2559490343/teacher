import req from '../js/axios'
const api = {
  // 登录
  login: (params) => {
    return req.apiAxios("POST", "/api/teacher/login", params)
  },
  // 发送验证码
  sendCode: (params) => {
    return req.apiAxios("POST", "/api/teacher/mailcheck", params)
  },
  // 注册
  register: (params) => {
    return req.apiAxios("POST", "/api/teacher/register", params)
  },
  // 获取老师信息
  getTeacherInfo: (params) => {
    return req.apiAxios("POST", "/api/teacher/message", params)
  },
  editName: (params) => {
    return req.apiAxios("POST", '/api/teacher/upname', params)
  },
  editPwd: (params) => {
    return req.apiAxios("POST", '/api/teacher/uppwd', params)
  }
}
export default api;