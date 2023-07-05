import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestBoardListToSpring ({ commit }, ticker) {
        return axiosInst.spring.get(`/board/list/${ticker}`)
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestBoardToSpring ({ commit }, ticker, id) {
        return axiosInst.spring.get(`/board/${ticker}/${id}`)
            .then((res) => {
                commit(REQUEST_BOARD_TO_SPRING, res.data)
            })
    },
    requestCreateBoardToSpring ({}, payload) {

        const { title, content, writer, ticker } = payload

        return axiosInst.spring.post(`/board/register/${ticker}`, { title, content, writer })
            .then((res) => {
                alert('게시물 등록 성공!')
                return res
                
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestBoardModifyToSpring ({}, ticker, payload) {
        const { title, content, id, writer } = payload

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
    requestDeleteBoardToSpring ({}, ticker, id) {
        return axiosInst.spring.delete(`/board/${ticker}/${id}`)
            .then((res) => {
                alert('삭제 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
}