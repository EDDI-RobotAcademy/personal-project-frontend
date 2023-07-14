import {
    REQUEST_PALYLIST_LIST_TO_SPRING,
    REQUEST_PALYLIST_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestPlaylistListToSpring({ commit }) {
        return axiosInst.springAxiosInst.post('/playlist/list')
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
            })
    },
    requestPlaylistCountToSpring({ }) {
        return axiosInst.springAxiosInst.post('/playlist/count-playlist')
            .then((res) => {
                console.log("res.data = " + res.data)
                return res.data
            })
    },
    requestPlaylistToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/playlist/${id}`)
            .then((res) => {
                console.log(res.data)
                commit(REQUEST_PALYLIST_TO_SPRING, res.data)
            })
    },
    requestRegisterPlaylistToSpring({ }, payload) {
        const { title } = payload;
        return axiosInst.springAxiosInst.post('/playlist/register', { title })
            .then((res) => {
                alert('등록 성공!')
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    requestModifyPlaylistToSpring({ }, { payload, playlistId }) {
        const { title } = payload
        const id = playlistId
        const requestData = { id, title }

        return axiosInst.springAxiosInst.post('/playlist/modify', requestData)
            .then((res) => {
                alert('수정 성공!')
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
}