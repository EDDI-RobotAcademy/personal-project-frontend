
import axiosInst from "@/router/utility/axiosInst"

export default {
    requestSpringToCheckNickNameDuplication ({ }, payload) {
        const { nickName } = payload
        console.log('email: ' + nickName)

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

        const { email, nickName, password } = payload

        return axiosInst.post('/member/sign-up', { email, nickName, password })
            .then((res) => {
                alert('회원 신청하기 성공!')
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
}