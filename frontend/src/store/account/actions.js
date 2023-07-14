import router from '@/router'
import axiosInst from '@/utility/axiosInst'

export default {
    requestRegisterAccountToSpring ({ }, payload) {

        return axiosInst.post('/account/register', payload)
            .then((resNormalRegister) => {
                if(resNormalRegister.data == true) {
                    alert('회원 가입 성공')
                    router.push('/login')
                } else {
                    alert('회원가입 실패!')
                }
            })
    },
    requestLoginAccountToSpring({ }, payload){
        
        return axiosInst.post('/account/login', payload)
            .then((res)=>{
                if(res.data==null){
                    alert('입력을 확인해 주세요!')
                } else{
                  localStorage.setItem('userToken',res.data[0])
                  localStorage.setItem('nickname',res.data[1])
                    router.push('/')
                }
            })
    }
}