import router from "@/router";
import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
    requestBoardToSpring({ commit }, boardId) {
        // console.log("boardId: " + boardId)
        return axiosInst.get(`/board/read/${boardId}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },

    requestBoardListToSpring({ commit }) {
        axiosInst.get('/board/list')
        .then((res) => {
            commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
        })
    },
    requestRegisterBoardToSpring({}, payload) {
        const { title, content, userEmail} = payload;

        return axiosInst
        .post("/board/register", payload)
        .then((res) => {
            alert("게시물이 등록 되었습니다.");
            router.push('/boardListPage')
            return res;
        })
        .catch(()=>{
            alert("게시물 등록 실패");
        });
    },
    requestDeleteBoardToSpring({ }, boardId){
        console.log("boardId: " + boardId)
        return axiosInst
        .delete(`/board/delete/${boardId}`)
        .then((res) =>  {
            alert('삭제 성공!')
            router.push('/boardListPage')
        }).catch(() => {
            alert('문제 발생!')
        })
    }
}