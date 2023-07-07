
import router from "@/router"
import axiosInst from "@/router/utility/axiosInst"
import { LOGIN_COMPLETE } from "./mutation-types"

export default {
    requestSpringToCheckNickNameDuplication ({ }, payload) {
        const { nickName } = payload
        return axiosInst.get(`/member/check-nickName/${nickName}`)
            .then((res) => {
                if (res.data) {
                    alert('사용 가능한 닉네임입니다!')
                    return true
                } else {
                    alert('중복된 닉네임입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestRegisterMemberToSpring ({ }, payload) {

        const { email, nickName, password,roleType } = payload
        return axiosInst.post('/member/sign-up', { email, nickName, password, roleType })
            .then((res) => {
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestSpringToLogin(context, payload){
        const { email, password,roleType } = payload
        return axiosInst.post('/member/login', { email, password, roleType })
            .then((res) => {
                localStorage.setItem("userToken", res.data.userToken)
                localStorage.setItem("roleType", res.data.roleType)
                localStorage.setItem("isLogin", res.data.isLogin)
                context.commit(LOGIN_COMPLETE, true)
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })  
    }
}