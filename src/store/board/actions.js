import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_CATEGORY_LIST_TO_SPRING,
    CLEAR_BOARDS,
    REQUEST_BOARD_TO_SPRING
  } from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
  requestCategoriesToSpring({ commit }) {
    return axiosInst.springAxiosInst.get("board/category-list")
      .then((res) => {
        commit(REQUEST_CATEGORY_LIST_TO_SPRING, res.data)
      })
  },
  requestBoardListByCategoryToSpring({ commit }, category) {
    return axiosInst.springAxiosInst.get(`/board/list/${category}`)
      .then((res) => {
        commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
      })
  },
  clearBoards({ commit }) {
    return commit(CLEAR_BOARDS)
  },
  requestReadBoardToSpring({ commit }, boardId ) {
    return axiosInst.springAxiosInst.get(`board/${boardId}`)
      .then((res) => {
        commit(REQUEST_BOARD_TO_SPRING, res.data)
      })
  },
  requestRegisterBoardToSpring({}, payload) {
    const { userToken, title, content, category } = payload
    console.log(category)
    return axiosInst.springAxiosInst.post('board/register', { userToken, title, content, category })
    .then((res) => {
      alert('게시글 등록 성공')
      return res.data
    })
  }
}