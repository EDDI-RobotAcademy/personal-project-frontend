import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestRegisterAccountToSpring ({ }, payload) {

        return axiosInst.post('/account/register', payload)
            .then((resNormalRegister) => {
                if(resNormalRegister.data == true) {
                    alert('회원 가입 성공')
                    router.push('/account-login')
                } else {
                    alert('회원가입 실패!')
                }
            })
    },
}