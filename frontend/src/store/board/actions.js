import axiosInst from "@/utility/axiosInst";
import {REQUEST_BOARD_LIST_TO_SPRING, REQUEST_BOARD_TO_SPRING} from "./mutation-types"
import router from "@/router";

export default{
  requestBoardRegisterToSpring({ }, payload) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    return axiosInst.post("/board/register", payload, config)
      .then((resRegister) => {
        if (resRegister.data) {
          return resRegister.data;
        } else {
          alert("산책로 저장 불가!");
        }
      });
  },
  requestBoardListToSpring({ commit }) {
   return axiosInst.post("/board/list")
      .then((res)=>{
        commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  requestBoardToSpring({commit}, id){
    console.log(id)
    return axiosInst.post(`/board/read/${id}`)
        .then((res)=>{
          commit(REQUEST_BOARD_TO_SPRING, res.data)
        })
    },
    requestBoardDeleteToSpring({},id){
    return axiosInst.delete(`/board/${id}`)
       .then((res)=>{
        router.push('/myBoardList')
    })
       .catch((res)=>{
      alert('상품 삭제가 실패하였습니다.')
    })
   },
   requestBoardModifyToSpring({}, payload){

    const {boardTitle, boardInfo, id} = payload
    return axiosInst.put(`/board/${id}`,{boardTitle, boardInfo, id})
    .then((res)=>{
      alert('게시물이 수정되었습니다.')
    })
    .catch(()=>{
      alert('상품 수정 실패')
    })
   
  }
}