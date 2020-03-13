import req from '../js/axios'
const api = {
  // 登录
  login:(params)=>{
    return req.apiAxios("POST","/api/teacher/login",params)
  },
  // 发送验证码
  sendCode:(params)=>{
    return req.apiAxios("POST","/api/teacher/mailcheck",params)
  },
  // 注册
  register:(params)=>{
    return req.apiAxios("POST","/api/teacher/register",params)
  }
}
export default api;