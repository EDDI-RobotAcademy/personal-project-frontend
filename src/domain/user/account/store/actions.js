


import axiosInst from '@/utility/axiosInst'
import { REQUEST_LOG_IN_TO_SPRING } from './mutation-types'

export default {
    // requestSpringToCheckEmailDuplication ({ }, payload) {
    //     const { email } = payload
    //     console.log('email: ' + email)

    //     return axiosInst.spring.get(`/account/check-email/${email}`)
    //         .then((res) => {
    //             if (res.data) {
    //                 alert('사용 가능한 이메일입니다')
    //                 return true
    //             } else {
    //                 alert('중복된 이메일입니다')
    //                 return false
    //             }
    //         })
    //         .catch((res) => {
    //             alert("문제 발생!")
    //         })
    // },
    requestRegisterAccountToSpring ({ }, payload) {

        const { email, password } = payload

        return axiosInst.spring.post('/account/sign-up', { email, password })
            .then((res) => {
                alert('회원 신청하기 성공')
                return res.data
            })
            .catch(() => {
                alert('문제 발생')
            })
    },
    requestLoginAccountToSpring({}, payload) {
        const{ email, password } = payload

        return axiosInst.spring.post('/account/sign-in', { email, password })
        .then((res) => {
            alert('로그인 성공')
            let userToken = res.data;
            localStorage.setItem("userToken", userToken)
            // console.log('userToken', userToken)
            // console.log('res.data', res.data)
            // commit(REQUEST_LOG_IN_TO_SPRING, res.data)
        })
        .catch(() => {
            alert('문제 발생')
        })
    },
    requestLogOutAccountToSpring({}, ) {
        const userToken = localStorage.getItem('userToken')
        return axiosInst.spring.post('/account/sign-out', { userToken })
        .then(() => {
            alert('로그아웃 되셨습니다')
            localStorage.removeItem("userToken", userToken)
            // commit(REQUEST_LOG_OUT_TO_SPRING, res.data)
        })
    }
}