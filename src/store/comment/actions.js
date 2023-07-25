import {
    REQUEST_COMMENT_LIST_TO_SPRING,
} from './mutation-types'
import {
    REQUEST_BOARD_TO_SPRING
} from '../board/mutation-types'

import axiosInst from '@/router/utility/axiosInst'

export default {
    requestCreateCommentToSpring (context, payload) {
        return axiosInst.axiosInst.post(`/board/comment/${payload.boardId}/register`,payload)
            .then((res) => {
                if(res.data != ''){
                context.commit("boardModule/REQUEST_BOARD_TO_SPRING", res.data, {root:true})
                } else{
                    alert('회원이 아닙니다.')
                }
            })
            .catch(() => {
                alert('문제 발생!')
                
            })
    },
    // requestBoardToSpring ({commit}, boardId) {
    //     return axiosInst.axiosInst.get(`/member-board/${boardId}`)
    //         .then((res) => {
    //             commit(REQUEST_BOARD_TO_SPRING, res.data)
    //         })
    // },
    // requestSearchTextToSpring({commit}, payload){
    //     return axiosInst.axiosInst.get('/member-board/search', payload)
    //     .then((res) => {
    //         commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
    //     })
    // },
    // requestDeleteBoardToSpring ({}, boardId) {
    //     const userToken = localStorage.getItem("userToken") 
    //     return axiosInst.axiosInst.delete(`/member-board/${boardId}`,{headers: {Authorization: userToken}})
    //         .then((res) => {
    //             if(res.data){
    //                 alert("삭제 성공!")
    //             }else{
    //                 alert("문제 발생")
    //             }
    //         })
    //         .catch(() => {
    //             alert('문제 발생!')
    //         })
    // },
    // requestBoardModifyToSpring ({}, payload) {
    //     return axiosInst.axiosInst.put(`/member-board/${payload.boardId}`,payload)
    //         .then((res) => {
    //             if(res.data != ''){
    //                 console.log(res.data)
    //                 alert("수정 성공!")
    //             }else{
    //                 alert("문제 발생")
    //             }
    //         })
    //         .catch(() => {
    //             alert('문제 발생!')
    //         })
    // },
    // requestTotalPage(){
    //     return axiosInst.axiosInst.get('/member-board/list/total-page')
    //     .then((res)=>{
    //         return res.data
    //     })
    // },
    // requestBoardListWithPageToSpring ({ commit }, payload) {
    //     return axiosInst.axiosInst.get('/member-board/list', {params:{page : payload}})
    //         .then((res) => {
    //             commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
    //         })
    // },
}