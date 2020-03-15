import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        courseId: sessionStorage.getItem('courseId') || '',  //当前选中的课程id
        courseName: sessionStorage.getItem('courseName') || '',  //当前选中的课程名字
        teacherName: sessionStorage.getItem('teacherName') || '',  //当前选中的课程名字
        changeCourse: false,  //切换课程的flag
        editInfo: false,   //修改个人信息的flag
        editPwd: false   //修改密码的flag
    },
    mutations: {
        setEditInfo(state, data) {
            state.editInfo = data
        },
        setEditPwd(state, data) {
            state.editPwd = data
        },
        setCourseId(state, data) {
            state.courseId = data;
            sessionStorage.setItem('courseId', data);
        },
        setTeacherName(state, data) {
            state.teacherName = data;
        },
        setCourseName(state, data) {
            state.courseName = data;
            sessionStorage.setItem('courseName', data);
        },
        setChangeCourse(state, data) {
            state.changeCourse = data
        }
    },
    actions: {
        setTeacherName(context, data) {
            context.commit("setTeacherName", data)
        },
        setEditInfo(context, data) {
            context.commit("setEditInfo", data)
        },
        setEditPwd(context, data) {
            context.commit("setEditPwd", data)
        },
        setCourseId(context, data) {
            context.commit("setCourseId", data)
        },
        setCourseName(context, data) {
            context.commit("setCourseName", data)
        },
        setChangeCourse(context, data) {
            context.commit("setChangeCourse", data)
        }
    }
})
