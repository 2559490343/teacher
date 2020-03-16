import req from '../js/axios'
const api = {
    // 添加学期
    addTerm: (params) => {
        return req.apiAxios('POST', '/api/term/add', params)
    },
    // 删除学期
    delTerm: (params) => {
        return req.apiAxios("POST", '/api/term/delterm', params)
    },
    // 查询所有学期
    getTerm: (params) => {
        return req.apiAxios('GET', '/api/term/all', params)
    },
    // 给学期添加课程
    addCourse: (params) => {
        return req.apiAxios("POST", '/api/course/addcourse', params)
    },
    //删除课程
    delCourse: (params) => {
        return req.apiAxios('POST', '/api/course/delcourse', params)
    },
    // 获取某个学期的课程
    getCourse: (params) => {
        return req.apiAxios("POST", '/api/course/allterm', params)
    },
    // 查询课程详情信息
    getCourseInfo: (params) => {
        return req.apiAxios("POST", '/api/course/allstudent', params)
    },
    // 课程邀请码相关
    getCourseCode: (params) => {
        return req.apiAxios("POST", '/api/course/code', params)
    }
}
export default api;