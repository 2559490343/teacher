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
  },
  // 获取某门课所有学生的信息
  getAllStudentInfo: (params) => {
    return req.apiAxios("POST", "/api/student/allmessage", params)
  },
  // 获取所有老师列表
  getAllTeacher: (params) => {
    return req.apiAxios('POST', "/api/teacher/allteacher", params)
  },
  // 删除某个老师
  delTeacher: (params) => {
    return req.apiAxios("POST", '/api/teacher/delteacher', params)
  },
  // 查看某个老师的详情
  showTeacherDetail: (params) => {
    return req.apiAxios("POST", '/api/teacher/allcourse', params)
  },
  // 解绑微信
  unBind: (params) => {
    return req.apiAxios("POST", '/api/student/uptopenid', params)
  },
  // 删除某个学生
  delStudent: (params) => {
    return req.apiAxios("POST", "/api/student/delstu", params)
  }
}

export default api