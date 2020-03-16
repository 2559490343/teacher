import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/views/layout/index.vue"
import store from '@/store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Router)
Vue.use(Element, { size: 'small' })
var vm = new Vue({
    // 选项
})
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
let routes = [
    {
        path: '/',
        redirect: '/login',
        component: Layout,
        meta: { title: '课堂辅助系统' },
        children: [
            {
                path: '/course',
                name: 'course',
                meta: {
                    title: '课程管理',
                    hidden: false,
                    icon: 'el-icon-document'
                },
                redirect: '/course/courseList',
                component: () => import('@/views/course/index.vue'),
                children: [
                    {
                        path: '/course/courseList',
                        name: 'courseList',
                        meta: {
                            title: '课程列表',
                            hidden: false,
                            icon: ''
                        },
                        component: () => import('@/views/course/courseList/index.vue'),
                    },
                    {
                        path: '/course/addCourse',
                        name: 'addCourse',
                        meta: {
                            title: '添加课程',
                            hidden: false,
                            icon: ''
                        },
                        component: () => import('@/views/course/addCourse/index.vue'),
                    },
                    {
                        path: '/course/courseDetail',
                        name: 'courseDetail',
                        meta: {
                            title: '课程详情',
                            hidden: false,
                            icon: ''
                        },
                        component: () => import('@/views/course/courseDetail/index.vue'),
                    }
                ]
            },
            {
                path: '/signIn',
                name: 'signIn',
                meta: {
                    title: '课堂签到',
                    hidden: false,
                    icon: 'el-icon-date'
                },
                component: () => import('@/views/signIn/index.vue'),
                redirect: '/signIn/signList',
                children: [
                    {
                        path: '/signIn/signList',
                        name: 'signList',
                        meta: {
                            title: '历史签到列表',
                            hidden: false
                        },
                        component: () => import('@/views/signIn/signList/index.vue'),
                    },
                    {
                        path: '/signIn/signDetail',
                        name: 'signDetail',
                        meta: {
                            title: '签到详情',
                            hidden: false
                        },
                        component: () => import('@/views/signIn/signDetail/index.vue'),
                    }


                ]
            },
            {
                path: '/job_publish',
                name: 'job_publish',
                meta: {
                    title: '作业发布',
                    hidden: false,
                    icon: 'el-icon-folder-add'
                },
                component: () => import('@/views/jobPublish/index.vue'),
                redirect: '/job_publish/job_list',
                children: [
                    {
                        path: '/job_publish/job_list',
                        name: 'job_list',
                        meta: {
                            title: '作业列表',
                            hidden: false
                        },
                        component: () => import('@/views/jobPublish/jobList/index.vue'),
                    },
                    {
                        path: '/job_publish/job_detail',
                        name: 'job_detail',
                        meta: {
                            title: '作业详情',
                            hidden: false
                        },
                        component: () => import('@/views/jobPublish/jobDetail/index.vue'),
                    },
                    {
                        path: '/job_publish/add_job',
                        name: 'add_job',
                        meta: {
                            title: '添加作业',
                            hidden: false
                        },
                        component: () => import('@/views/jobPublish/addJob/index.vue'),
                    },
                ]
            },
            {
                path: '/job_correct',
                name: 'job_correct',
                meta: {
                    title: '作业批改',
                    hidden: false,
                    icon: 'el-icon-edit'
                },
                component: () => import('@/views/jobCorrect/index.vue'),
                redirect: '/job_correct/correct_list',
                children: [
                    {
                        path: 'correct_list',
                        name: 'correct_list',
                        meta: {
                            title: '提交作业列表',
                            hidden: false,
                        },
                        component: () => import('@/views/jobCorrect/correctList/index.vue'),

                    },
                    {
                        path: 'correct_detail',
                        name: 'correct_detail',
                        meta: {
                            title: '提交作业详情',
                            hidden: false,
                        },
                        component: () => import('@/views/jobCorrect/correctDetail/index.vue'),

                    },
                    {
                        path: 'correct_page',
                        name: 'correct_page',
                        meta: {
                            title: '批改作业',
                            hidden: false,
                        },
                        component: () => import('@/views/jobCorrect/correctPage/index.vue'),

                    },
                ]
            },
            {
                path: '/question_bank',
                name: 'question_bank',
                meta: {
                    title: '题库管理',
                    hidden: false,
                    icon: 'el-icon-wallet'
                },
                component: () => import('@/views/questionBank/index.vue'),
                redirect: "/question_bank/question_list",
                children: [
                    {
                        path: '/question_bank/question_list',
                        name: 'question_list',
                        meta: {
                            title: '题库列表',
                            hidden: false
                        },
                        component: () => import('@/views/questionBank/questionList/index.vue'),
                    },
                    {
                        path: '/question_bank/upload_question',
                        name: 'upload_question',
                        meta: {
                            title: '导入题目',
                            hidden: false
                        },
                        component: () => import('@/views/questionBank/uploadQuestion/index.vue'),
                    },
                ]
            },
            {
                path: '/student',
                name: 'student',
                meta: {
                    title: '学生管理',
                    hidden: false,
                    icon: 'el-icon-user'
                },
                component: () => import('@/views/student/index.vue'),
                redirect: '/student/student_list',
                children: [
                    {
                        path: 'student_list',
                        name: 'student_list',
                        meta: {
                            title: '学生列表',
                            hidden: false
                        },
                        component: () => import("@/views/student/studentList/index.vue")
                    },
                    // {
                    //     path: 'student_detail',
                    //     name: 'student_detail',
                    //     meta: {
                    //         title: '学生详情',
                    //         hidden: false
                    //     },
                    //     component: () => import("@/views/student/studentDetail/index.vue")
                    // },
                    {
                        path: 'upload_student',
                        name: 'upload_student',
                        meta: {
                            title: '导入学生',
                            hidden: false
                        },
                        component: () => import("@/views/student/uploadStudent/index.vue")
                    },
                ]
            },

        ]
    },
    {
        path: '/login',
        name: "login",
        component: () => import("@/views/login/index.vue")
    },
    {
        path: '/register',
        name: "register",
        component: () => import("@/views/register/index.vue")
    },

]
const router = new Router({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.name === 'signList' || to.name === 'job_list' || to.name === 'correct_list' || to.name === 'student_list') {
        if (!store.state.courseId) {
            next({ name: 'courseList' })
            vm.$message.warning("请选择当前课程！")
            store.dispatch("setChangeCourse", true);
        } else {
            next()
        }
    } else {
        next()
    }

})

export default router