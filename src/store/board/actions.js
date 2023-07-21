import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/router/utility/axiosInst'

export default {
    requestBoardListToSpring ({ commit }) {
        return axiosInst.axiosInst.get('/member-board/list')
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestCreateBoardToSpring ({}, payload) {
        return axiosInst.axiosInst.post('/member-board/register',payload)
            .then((res) => {
                console.log(res)
                if(res.data != ''){
                alert('게시물 등록 성공!')
                return res
                } else{
                    alert('회원이 아닙니다.')
                }
            })
            .catch(() => {
                alert('문제 발생!')
                
            })
    },
    requestBoardToSpring ({commit}, boardId) {
        return axiosInst.axiosInst.get(`/member-board/${boardId}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },
    requestSearchTextToSpring({commit}, payload){
        return axiosInst.axiosInst.get('/member-board/search', payload)
        .then((res) => {
            commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
        })
    },
    requestDeleteBoardToSpring ({}, boardId) {
        return axiosInst.axiosInst.delete(`/member-board/${boardId}`)
            .then((res) => {
                alert('삭제 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestBoardModifyToSpring ({}, payload) {
        return axiosInst.axiosInst.put(`/member-board/${payload.boardId}`,payload)
            .then((res) => {
                alert("수정 성공!")
            })
            .catch(() => {
                alert('문제 발생!')
            })
    }
}