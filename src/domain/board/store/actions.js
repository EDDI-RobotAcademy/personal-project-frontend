import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
    REQUEST_COMMENT_LIST_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestBoardListToSpring ({ commit }, ticker) {
        return axiosInst.spring.get(`/board/list/${ticker}`)
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestBoardToSpring ({ commit }, payload) {
        const { ticker, id } = payload
        return axiosInst.spring.get(`/board/${ticker}/${id}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },
    requestCreateBoardToSpring ({}, payload) {

        const { title, content, writer, ticker, password, nickname } = payload

        return axiosInst.spring.post(`/board/register/${ticker}`, { title, content, writer, password, nickname })
            .then((res) => {
                alert('게시물 등록 성공!')
                return res
                
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestBoardModifyToSpring ({}, payload) {
        const { title, content, id, writer, ticker } = payload

        console.log("title: " + title + ", content: " + content + 
                    ", writer: " + writer + ", id: " + id)

        return axiosInst.spring.put(`/board/${ticker}/${id}`, { title, content, writer })
            .then((res) => {
                alert("수정 성공!")
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestDeleteBoardToSpring ({}, payload) {
        const { ticker, id } = payload
        return axiosInst.spring.delete(`/board/${ticker}/${id}`)
            .then((res) => {
                alert('삭제 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestRegisterCommentToSpring({}, payload) {
        const {writer, content, password, nickname, id } = payload
        return axiosInst.spring.post('/board/comment/register', {writer, content, password, nickname, id})
        .then(() => {
            window.location.reload();
          })
          .catch(error => {
            console.error("Error during comment registration:", error);
          });
    },
    requestCommentListToSpring({ commit }, payload) {
        const { id } = payload
        return axiosInst.spring.get(`/board/comment/${id}`)
        .then((res) => {
            commit(REQUEST_COMMENT_LIST_TO_SPRING, res.data)
        })
        .catch(() => {
            alert('문제 발생!')
        })
    },
    requestDeleteCommentToSpring({}, payload) {
        const {selectedCommentId, deletePassword, nickname} = payload
        return axiosInst.spring.post('/board/comment/delete', {selectedCommentId, deletePassword, nickname})
        .then((res) => {
            if (res.data) {
                window.location.reload();
            } else {
                alert('기존 정보와 기입하신 정보가 다릅니다!')
            }
            
        })
        .catch(() => {
            alert('문제 발생!')
        })
    }
}