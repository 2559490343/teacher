import req from '../js/axios'
const api = {
    // 发起签到
    addSign: (params) => {
        return req.apiAxios("POST", '/api/course/checkcode', params)
    },
    // 获取签到列表
    getSignList: (params) => {
        return req.apiAxios("POST", '/api/course/allsign' , params)
    },
    // 查询签到详情
    getSignDetail:(params)=>{
        return req.apiAxios('POST','/api/course/signdetail',params)
    }
}

export default api