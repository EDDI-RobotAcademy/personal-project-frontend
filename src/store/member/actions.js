
import router from "@/router"
import axiosInst from "@/router/utility/axiosInst"
import { LOGIN_COMPLETE, SET_NICKNAME } from "./mutation-types"

export default {
    requestSpringToCheckNicknameDuplication({ }, payload) {
        const { nickname } = payload
        return axiosInst.axiosInst.get(`/member/check-nickName/${nickname}`)
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
    requestSpringToCheckEmailDuplication({ }, payload) {
        const { email } = payload
        return axiosInst.axiosInst.get(`/member/check-email/${email}`)
            .then((res) => {
                if (res.data) {
                    alert('사용 가능한 이메일입니다!')
                    return true
                } else {
                    alert('중복된 이메일입니다!')
                    return false
                }
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    },
    requestRegisterMemberToSpring({ }, payload) {

        const { email, nickname, password, roleType } = payload
        return axiosInst.axiosInst.post('/member/sign-up', { email, nickname, password, roleType })
            .then((res) => {
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestSpringToLogin(context, payload) {
        const { email, password, roleType, nickname } = payload
        return axiosInst.axiosInst.post('/member/login', { email, password, roleType, nickname })
            .then((res) => {
                if (res.data != '') {
                    localStorage.setItem("userToken", res.data.userToken)
                    localStorage.setItem("roleType", res.data.roleType)
                    context.commit(LOGIN_COMPLETE, true)
                    context.commit(SET_NICKNAME, res.data.nickname)
                    return true
                } else {
                    alert('이메일과 비밀번호를 다시 확인해주세요')
                    return false
                }
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestSpringCheckMember({ }, memberId) {
        const userToken = localStorage.getItem("userToken")
        return axiosInst.axiosInst.get(`/member/check/${memberId}`, { headers: { Authorization: userToken } })
            .then((res) => {
                return res.data
            })
    },
    requestSpringToAddresskakaoOauthLogin() {
        axiosInst.axiosInst.get('kakao/oauth')
            .then((res) => {
                console.log(res.data)
                window.location.href = res.data;
            })
    },
    getTokenToSpring(context, payload) {
        axiosInst.axiosInst.get("/klogin?code=" + payload)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem("userToken", res.data.userToken)
                localStorage.setItem("roleType", res.data.roleType)
                context.commit(LOGIN_COMPLETE, true)
                context.commit(SET_NICKNAME, res.data.nickname)

            });

    },
}