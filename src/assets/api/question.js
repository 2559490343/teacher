import req from '../js/axios'
const api = {
    // 上传题目
    importQuestions: (params) => {
        return req.apiAxios("POST", '/api/title/addtitle', params)
    },
    // 删除题目
    delTitle: (params) => {
        return req.apiAxios("POST", '/api/title/deltitle', params)
    },
    // 编辑题目
    editTitle: (params) => {
        return req.apiAxios("POST", '/api/title/udtitle', params)
    },
    // 获取题目列表
    getQuestions: (params) => {
        return req.apiAxios('POST', '/api/title/alltype', params)
    }
}

export default api