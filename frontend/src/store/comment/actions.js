import axiosInst from "@/utility/axiosInst";
import { REQUEST_COMMENT_LIST_TO_SPRING } from "./mutation-types"


export default{
  requestCommentRegisterToSpring({ }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return axiosInst.post("/comment/register", payload, config)
      .then((resRegister) => {
        if (resRegister.data) {
          return resRegister.data;
        } else {
          alert("댓글 작성 불가");
        }
      });
  },
  requestCommentListToSpring({ commit },payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   
    return axiosInst.post(`/comment/list/${payload}`,config)
       .then((res)=>{
        console.log("댓글 리스트야" , res)
         commit(REQUEST_COMMENT_LIST_TO_SPRING, res.data)
       })
   },
 
    requestCommentDeleteToSpring({},id){
    return axiosInst.delete(`/comment/${id}`)
       .then((res)=>{
       
    })
       .catch((res)=>{
      alert('댓글 삭제가 실패하였습니다.')
    })
   },

   requestReportedCommentToSpring({},payload) {
   console.log('액션에 받은 ID: '+payload)
     return  axiosInst.post(`/comment/${payload}/report`)
      .then((res) => {
        alert('댓글이 신고되었습니다.');
      })
      .catch((error) => {
        // 오류 처리 로직 추가
      });
  },
  requestRejectReportCommentToSpring({},payload){
    return axiosInst.delete(`/comment/reported-comment/${payload}`)
      .then((res)=>{
        alert('신고가 반려되었습니다.')
      })
      .catch((error)=>{
        
      })
  }
 
}