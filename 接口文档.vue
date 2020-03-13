约定规范：
    1.1 请求数据成功返回：
        {
            "code": 0, "message": "操作成功", "data": []
        }
    
    1.2 请求数据失败返回：
        {
           "code": 1, "message": "操作失败", "data": []
        }

PC端：
  1.登录相关:
    1.1 登录:
        请求方法：post	
        请求地址：
        请求参数：
            {
                username:'123456',
                password:'123456'
            }
        返回结果: 
            {
                "code": 0, "message": "操作成功", "data": []
            }

    1.2 注册:
        请求方式：post
        请求地址: 
        请求参数:
            {
                username:'123456',
                password:'123456',
            }
        返回结果: 
            {
               "code": 0, "message": "操作成功", "data": []

            }

    1.3 注销:
        请求方式:get
        请求地址：
        返回结果: 
            {
                "code": 0, "message": "操作成功", "data": []

                }
            }
  2.课程管理:
    2.1 添加学期：
        请求方式:post
        请求地址：
        请求参数: 
            {
                term_year:'2019-2020',  //学年
                term_no:'1'             //学期号（第一学期或者第二学期）
            }
        返回结果: 
            {
               "code": 0, "message": "操作成功", "data": [...]

            }
    2.2 获取所有已添加的学期
        请求方式：get
        请求地址：
        返回结果: 
            {
                "code": 0, "message": "操作成功", "data": [......]

            }

    2.3 根据所选学期添加课程
        请求方式：post
        请求地址：
        请求参数：
            {
                id: 1, //学期对应id
                course_name:'java', //课程名
                course_intro:'使用Java语言进行应用程序设计的课程', //课程简介
                course_detail: '《Java程序设计》课程是使用Java语言进行应用程序设计的课程，针对各专业的大学本科生开设'  // 课程详情
            }
        返回结果: 
            {
               "code": 0, "message": "操作成功", "data": []

            }
    2.4 根据所选学期获取已添加课程列表
        请求方式：post
        请求地址：
        请求参数：
            {
                id: 1 //学期对应id
            }
         返回结果: 
            {
                obj:{
                    totalSize: 1,
                    list:[
                        {
                            id:1, // 课程对应id
                            course_name: 'java', //课程名
                            course_intro: 'xxx', //课程简介
                            counts: 35, //选课人数
                            status: false, //发布状态
                        }
                    ]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    
    2.5 根据课程id查询课程详情 (查看详情按钮)
        请求方式：post
        请求地址：
        请求参数：
            {
               id: 1 //课程对应id 
            }
         返回结果: 
            {
                obj:{
                    totalSize: 1,
                    list:[
                        {
                            course_name: 'java', //课程名
                            course_intro: 'xxx', //课程简介
                            counts: 35, //选课人数
                            status: false, //发布状态
                            student_list: [] //课程的学生列表
                        }
                    ]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    
    2.6 发布课程（发布按钮）
        请求方式：post
        请求地址：
        请求参数：
            {               
               id: 1, //课程对应id 
               code: '123456', //临时6位课程邀请码
               long: '300', //课程临时发布持续时长
               now_time:'xxxx' //点击发布的时间
            }
        返回结果: 
            {
                obj:{
                    list:[]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    
    2.7 下线课程（下线按钮）
        请求方式：post
        请求地址：
        请求参数：
            {
                id: 1, //课程对应id 
            }
        返回结果：
            {
                obj:{
                    
                    list:[]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    2.8 查询发布中的课程的相关信息

        请求方式：post
        请求地址：
        请求参数：
            {
                id: 1,// 课程id
            }
        返回结果：
            {
                "code": 0, 
                "message": "操作成功", 
                "data": [
                    {
                       code: '123456', //临时6位课程邀请码
                       end_time:'xxx' //根据发布时间以及持续时长计算出结束时间返回给我
                        
                    }
                ]
            }
  3课堂签到
    3.1 发起签到
        请求方式：post
        请求地址：
        请求参数：
            {
                title: 'xxxxx', //签到主题 
                late_time: 'xxx',  //迟到时间
                truancy_time:'xxx', //旷课时间
                code:'xxxx'  //签到验证码
            }
        返回结果：
            {
                obj:{
                    list:[]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    
    3.2 获取签到列表
        请求方式：post
        请求地址：
        请求参数：
            {
               id: 1 //对应课程id
            }
        返回结果：
            {
                obj:{
                    totalSize: 1,
                    list:[
                        {
                            title:'xxx',//签到主题
                            create_time:'xxx', //签到发起的时间
                            late_time:'xxx',//迟到时间
                            truancy_time:'xxx',//旷课时间（持续时间）
                            code:'xxx',//签到验证码
                            status:'xxx',//签到的状态（进行中、已过期）
                        }
                    ]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
    3.3 签到详情
        请求方式：post
        请求地址：
        请求参数：
            {
                sign_id: 1, //签到对应id
                course_id:1,// 课程对应id
            }
        返回结果：
            {
                obj:{
                    totalSize: 1,
                    list:[
                        {
                            title:'xxx',//签到主题
                            create_time:'xxx', //签到发起的时间
                            late_time:'xxx',//迟到时间
                            truancy_time:'xxx',//旷课时间（持续时间）
                            code:'xxx',//签到验证码
                            status:'xxx',//签到的状态（进行中、已过期）
                            counts: xxx, //签到人数
                            student_list:[  //返回这门课所有学生列表
                                {
                                    name:'xxx',// 学生名字
                                    number:'xxxx', //学号
                                    status: 'xxx', //签到状态（已签到、迟到、未签到）
                                    time:'xxx' //签到时间
                                }
                            ]
                        }
                    ]
                },
                error:{
                    err_msg:'',
                    err_code: 0
                }
            }
  4.题库管理
   
    4.1 添加题目（批量导入）
        请求方式：post
        请求地址：
        请求参数：
            {
                list:[ //批量导入的题目列表数组
                    {
                        type: 'xxx',//题目类型（选择、填空、判断、简答）
                        title: 'xxxx',//题目
                        answer:'xxx', //题目答案
                        A:'xxxx', //选择题选项（选择题之外的类型没有）
                        B:'xxxx',//选择题选项（选择题之外的类型没有）
                        C:'xxxx',//选择题选项（选择题之外的类型没有）
                        D:'xxxx'//选择题选项（选择题之外的类型没有）
                    },
                    {
                        type: 'xxx',//题目类型（选择、填空、判断、简答）
                        title: 'xxxx',//题目
                        answer:'xxx', //题目答案
                        A:'xxxx', //选择题选项（选择题之外的类型没有）
                        B:'xxxx',//选择题选项（选择题之外的类型没有）
                        C:'xxxx',//选择题选项（选择题之外的类型没有）
                        D:'xxxx'//选择题选项（选择题之外的类型没有）
                    },
                    {
                        type: 'xxx',//题目类型（选择、填空、判断、简答）
                        title: 'xxxx',//题目
                        answer:'xxx', //题目答案
                        A:'xxxx', //选择题选项（选择题之外的类型没有）
                        B:'xxxx',//选择题选项（选择题之外的类型没有）
                        C:'xxxx',//选择题选项（选择题之外的类型没有）
                        D:'xxxx'//选择题选项（选择题之外的类型没有）
                    }
                ]
            }
        返回结果：
            {
                obj:{},
                error:{
                    err_code:0,
                    err_msg:''
                }
            }
    4.2 获取题库列表（可以按类型返回，也可以所有题目一次性返回）
        请求方式：post
        请求地址：
        请求参数：
            {
                type: 'xxx' //题目类型（选择、填空、判断、简答）
            } 
        返回结果：
            {
                obj:{
                    totalSize:1
                    list:[
                        {
                            type: 'xxx',//题目类型（选择、填空、判断、简答）
                            title: 'xxxx',//题目
                            answer:'xxx', //题目答案
                            A:'xxxx', //选择题选项（选择题之外的类型没有）
                            B:'xxxx',//选择题选项（选择题之外的类型没有）
                            C:'xxxx',//选择题选项（选择题之外的类型没有）
                            D:'xxxx'//选择题选项（选择题之外的类型没有） 
                        }
                    ]
                },
                error:{
                    err_code:0,
                    err_msg:''
                }
            }
    
  5.作业发布
    5.1 发布作业
        请求方式：post
        请求地址：
        请求参数：
            {
                type: 'xxx', // 作业类型（课堂测试、课后作业）
                title: 'xxx', //作业标题
                list:[ //题库中题目的id列表
                    {
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    },
                ],
                time:'xxx',//作业添加的时间  
            }
        返回结果：
            {
               obj:{},
               error:{
                   err_code:0,
                   err_msg:''
               } 
            }
    
    5.2 获取作业列表
        请求方式：post
        请求地址：
        请求参数：
            {
                type: 'xxx',//作业类型（课堂测试、课后作业）
                course_id: 1,//作业对应的课程的id
            }
        返回结果：
            {
               obj:{
                   list:[
                       {
                           id: 1, //作业id
                           title:'xxxx', //作业主题
                           counts: 'xxx', //题目数量
                           status:'xxx' //发布状态（已发布、未发布）
                       }
                   ],
                   totalSize:1
               },
               error:{
                   err_code:0,
                   err_msg:''
               } 
            }
    
    5.3 修改作业发布状态
        请求方式：post
        请求地址
        请求参数：
            {
                id: xx, //作业的id
                status：'xxx',//修改作业的状态（已发布、未发布）
            }
        返回结果：
            {
                obj:{},
                error:{
                    err_code:0,
                    err_msg:''
                }
            }

    5.4 查看作业详情
        请求方式：post
        请求地址
        请求参数：
            {
                id: xx, //作业的id
            }
        返回结果：
            {
                obj:{
                    list:[
                        {
                            title: 'xxx', // 作业主题
                            counts: 1 , // 作业题目数量
                            time:'xxxx', // 作业添加的时间
                            list:[ //作业包含的题目列表
                                {
                                    title:'xxxx',//题目
                                    answer:'xxx',//答案
                                    A:'XXX', //选择题选项（仅选择题有）
                                    B:'XXX',//选择题选项（仅选择题有）
                                    C:'XXX',//选择题选项（仅选择题有）
                                    D:'XXX',//选择题选项（仅选择题有）
                                }
                            ]
                        }
                    ],
                    totalSize: 1
                },
                error:{
                    err_code:0,
                    err_msg:''
                }
            }










小程序端：