
import router from "@/router"
import axiosInst from "@/router/utility/axiosInst"
import { LOGIN_COMPLETE, SET_NICKNAME } from "./mutation-types"

export default {
    requestSpringToCheckNickNameDuplication ({ }, payload) {
        const { nickName } = payload
        return axiosInst.axiosInst.get(`/member/check-nickName/${nickName}`)
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
        return axiosInst.axiosInst.post('/member/sign-up', { email, nickName, password, roleType })
            .then((res) => {
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestSpringToLogin(context, payload){
        const { email, password,roleType,nickName } = payload
        return axiosInst.axiosInst.post('/member/login', { email, password, roleType, nickName })
            .then((res) => {
                localStorage.setItem("userToken", res.data.userToken)
                localStorage.setItem("roleType", res.data.roleType)
                context.commit(LOGIN_COMPLETE, true)
                context.commit(SET_NICKNAME, res.data.nickName)
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })  
    }, 
    requestSpringToAddresskakaoOauthLogin(){
        axiosInst.axiosInst.get('kakao/oauth')
        .then((res)=>{
         console.log(res.data)
         window.location.href = res.data;
        })
     }, 
     getTokenToSpring(context, payload) {
        axiosInst.axiosInst.get("http://localhost:7777/klogin?code=" + payload)
          .then((res) => {
            console.log(res.data)
            localStorage.setItem("userToken", res.data.userToken)
            localStorage.setItem("roleType", res.data.roleType)
            context.commit(LOGIN_COMPLETE, true)
            context.commit(SET_NICKNAME, res.data.nickname)
            
        });

      },
}