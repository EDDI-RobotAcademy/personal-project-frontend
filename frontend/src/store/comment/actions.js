import axiosInst from "@/utility/axiosInst";
import { REQUEST_COMMENT_LIST_TO_SPRING } from "./mutation-types"
// import router from "@/router";

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
  // requestBoardListToSpring({ commit }) {
  //  return axiosInst.post("/board/list")
  //     .then((res)=>{
  //       commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
  //     })
  // },
  // requestBoardToSpring({commit}, id){
  //   console.log(id)
  //   return axiosInst.post(`/board/read/${id}`)
  //       .then((res)=>{
  //         commit(REQUEST_BOARD_TO_SPRING, res.data)
  //       })
  //   },
    requestCommentDeleteToSpring({},id){
    return axiosInst.delete(`/comment/${id}`)
       .then((res)=>{
       
    })
       .catch((res)=>{
      alert('상품 삭제가 실패하였습니다.')
    })
   },
  //  requestBoardModifyToSpring({}, payload){

  //   const {boardTitle, boardInfo,boardTransport, id} = payload
  //   return axiosInst.put(`/board/${id}`,{boardTitle, boardInfo,boardTransport, id})
  //   .then((res)=>{
  //     alert('게시물이 수정되었습니다.')
  //   })
  //   .catch(()=>{
  //     alert('상품 수정 실패')
  //   })
   
  // }
}