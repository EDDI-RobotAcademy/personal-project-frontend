import {
    REQUEST_BOARD_LIST_TO_SPRING,
    REQUEST_BOARD_TO_SPRING,
} from './mutation-types'

import axiosInst from '@/router/utility/axiosInst'

export default {
    requestBoardListToSpring ({ commit }) {
        return axiosInst.get('/member-board/list')
            .then((res) => {
                commit(REQUEST_BOARD_LIST_TO_SPRING, res.data)
            })
    },
    requestCreateBoardToSpring ({}, payload) {

        // const { title, content, nickName, filePaths } = payload

        return axiosInst.post('/member-board/register',
        //  { title, content, nickName, filePaths }
        payload
         )
            .then((res) => {
                alert('게시물 등록 성공!')
                return res
            })
            .catch(() => {
                alert('문제 발생!')
                
            })
    },
}