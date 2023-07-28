import {
    REQUEST_COMMENT_LIST_TO_SPRING,
} from './mutation-types'
import axiosInst from '@/router/utility/axiosInst'

export default {
    requestCreateCommentToSpring(context, payload) {
        return axiosInst.axiosInst.post(`/board/comment/${payload.boardId}/register`, payload)
            .then((res) => {
                if (res.data != '') {
                    context.commit("boardModule/REQUEST_BOARD_TO_SPRING", res.data, { root: true })
                } else {
                    alert('회원이 아닙니다.')
                }
            })
            .catch(() => {
                alert('문제 발생!')

            })
    },
    requestDeleteCommentToSpring(context, commentId) {
        const userToken = localStorage.getItem("userToken")
        return axiosInst.axiosInst.delete(`/board/comment/${commentId}`, { headers: { Authorization: userToken } })
            .then((res) => {
                if (res.data) {
                    alert("삭제 성공!")
                } else {
                    alert("문제 발생")
                }
            })
            .catch(() => {
                alert('지울 수 없습니다.')
            })
    },
    requestCommentModifyToSpring({ }, payload) {
        return axiosInst.axiosInst.put(`/board/comment/${payload.commentId}/modify`, payload)
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
    requestMyCommentListToSpring({ commit }, payload) {
        const { page, userToken } = payload
        return axiosInst.axiosInst.get(`board/comment/list/${page}`, { headers: { Authorization: userToken } })
            .then((res) => {
                console.log(res.data)
                commit(REQUEST_COMMENT_LIST_TO_SPRING, res.data)
            })
    },
    requestMyCommentTotalPage({ }, payload) {
        const userToken = payload
        return axiosInst.axiosInst.get('/board/comment/list/my-comment-total-page', { headers: { Authorization: userToken } })
            .then((res) => {
                return res.data
            })
    },
}