import req from '../js/axios'
const api = {
  // 查看某次作业提交的详细信息
  getHomeWorkSubmitDetail: (params) => {
    return req.apiAxios('POST', '/api/homework/commitstudent', params)
  },
  // 查看某个学生提交的作业详情
  getStudentSubmitDetail:(params)=>{
    return req.apiAxios("POST",'/api/homework/correctdetail',params)
  },
  // 批改某题作业正确还是错误
  correctHomeWork:(params)=>{
    return req.apiAxios("POST",'/api/homework/updategrade',params)
  },
  // 分析单题
  analysisTitle:(params)=>{
    return req.apiAxios("POST",'/api/student/correctdetail',params)
  }
}
export default api;