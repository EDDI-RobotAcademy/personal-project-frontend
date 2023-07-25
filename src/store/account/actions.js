import router from "@/router";
import {
    REQUEST_ACCOUNT_LIST_TO_SPRING,
    REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
    requestRegisterAccountToSpring({}, payload) {
        const { email, password} = payload;

        return axiosInst
        .post("/account/register", payload)
        .then((res) => {
            alert("회원가입 되었습니다.");
            router.push('/loginPage')
            return res;
        })
        .catch(()=>{
            alert("회원가입 실패");
        });
    } 
}