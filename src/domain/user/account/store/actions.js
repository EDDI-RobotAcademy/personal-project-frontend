


import axiosInst from '@/utility/axiosInst'

export default {
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
        })
    }
}