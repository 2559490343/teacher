import req from '../js/axios'
const api = {
  //  获取学生列表
  getStudentList: (params) => {
    return req.apiAxios('POST', '/api/student/allstudent', params)
  },
  // 导入学生列表
  addStudentList: (params) => {
    return req.apiAxios("POST", '/api/student/addstudent', params)
  },
  // 获取学生考勤信息
  getSignInfo: (params) => {
    return req.apiAxios("POST", '/api/student/totalcount', params)
  },
  // 获取作业情况信息
  getHomeWorkInfo: (params) => {
    return req.apiAxios("POST", '/api/student/totalcommit', params)
  },
  // 给学生打分
  editGrade: (params) => {
    return req.apiAxios("POST", "/api/student/updategrade", params)
  }
}

export default api