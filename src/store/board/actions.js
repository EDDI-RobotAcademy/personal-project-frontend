import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/router/utility/axiosInst'

export default {
    requestBoardListToSpring({ commit }) {
        return axiosInst.axiosInst.get('/member-board/list')
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestCreateBoardToSpring({ }, payload) {
        return axiosInst.axiosInst.post('/member-board/register', payload)
            .then((res) => {
                console.log(res)
                if (res.data != '') {
                    alert('게시물 등록 성공!')
                    return res
                } else {
                    alert('회원이 아닙니다.')
                }
            })
            .catch(() => {
                alert('문제 발생!')

            })
    },
    requestBoardToSpring({ commit }, boardId) {
        return axiosInst.axiosInst.get(`/member-board/${boardId}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },
    requestSearchTextToSpring({ commit }, payload) {
        return axiosInst.axiosInst.get('/member-board/search', payload)
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestDeleteBoardToSpring({ }, boardId) {
        const userToken = localStorage.getItem("userToken")
        return axiosInst.axiosInst.delete(`/member-board/${boardId}`, { headers: { Authorization: userToken } })
            .then((res) => {
                if (res.data) {
                    alert("삭제 성공!")
                } else {
                    alert("삭제 권한이 없습니다.")
                }
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestBoardModifyToSpring({ }, payload) {
        return axiosInst.axiosInst.put(`/member-board/${payload.boardId}`, payload)
            .then((res) => {
                if (res.data != '') {
                    console.log(res.data)
                    alert("수정 성공!")
                } else {
                    alert("문제 발생")
                }
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestTotalPage() {
        return axiosInst.axiosInst.get('/member-board/list/total-page')
            .then((res) => {
                return res.data
            })
    },
    requestBoardListWithPageToSpring({ commit }, payload) {
        return axiosInst.axiosInst.get('/member-board/list', { params: { page: payload } })
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestMyBoardListToSpring({ commit }, payload) {
        const { page, userToken } = payload
        return axiosInst.axiosInst.get(`member-board/list/member/${page}`, { headers: { Authorization: userToken } })
            .then((res) => {
                console.log(res.data)
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestMyBoardTotalPage({ }, payload) {
        const userToken = payload
        return axiosInst.axiosInst.get('/member-board/list/my-board-total-page', { headers: { Authorization: userToken } })
            .then((res) => {
                return res.data
            })
    },
}