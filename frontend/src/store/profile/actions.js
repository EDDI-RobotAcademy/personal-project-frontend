import axiosInst from "@/utility/axiosInst";
import { REQUEST_MY_BOARD_LIST_TO_SPRING,REQUEST_REPORTED_COMMENT_LIST_TO_SPRING, REQUEST_MY_BOARD_LIST_RE_SET_ACTION,REQUEST_MY_ACCOUNT_TO_SPRING } from "./mutation-types";


export default{
    requestcheckPasswordToSpring({ }, payload){
        console.log(payload)
        return axiosInst.post('/account/passwordCheck', payload)
            .then((res)=>{
                console.log(res)
                if(res.data==true){
                    return true;
                    
                } else{
                    alert("비밀번호를 확인해 주세요")
                    return false;
                    
                }
            })
    },
    requestMyBoardListToSpring({ commit }, payload) {
        return axiosInst.post(`/board/myList`,payload)
           .then((res)=>{
             commit(REQUEST_MY_BOARD_LIST_TO_SPRING, res.data)
           })
       },
    requestMyboardListReSetAction({commit}){

        return commit(REQUEST_MY_BOARD_LIST_RE_SET_ACTION)
    },
    requestReportedCommentListToSpring({commit}){
        return axiosInst.get('/comment/reported-comments')
            .then((res)=>{
                commit(REQUEST_REPORTED_COMMENT_LIST_TO_SPRING, res.data)
            })

    },
    requestMyAccountToSpring({ commit } ,payload){
        return axiosInst.post('/account/myAccount',payload)
            .then((res)=>{
                console.log(res.data)
                commit(REQUEST_MY_ACCOUNT_TO_SPRING, res.data)
            })
    }
}
