import req from '../js/axios'
const api = {
    //创建一次作业
    addHomeWork: (params) => {
        return req.apiAxios("POST", '/api/homework/addhomework', params)
    },
    // 获取作业列表
    getHomeWorkList:(params)=>{
        return req.apiAxios('POST','/api/homework/allhomework',params)
    },
    // 修改作业发布状态
    changeHomeWorkStatus:(params)=>{
        return req.apiAxios('POST','/api/homework/updatestatus',params)
    },
    // 获取作业详情
    getHomeWorkDetail:(params)=>{
        return req.apiAxios('POST','/api/homework/homeworkdetail',params)
    }
}

export default api