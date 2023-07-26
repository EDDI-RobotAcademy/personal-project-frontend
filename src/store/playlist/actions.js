import {
    REQUEST_PALYLIST_LIST_TO_SPRING,
    REQUEST_PALYLIST_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    // 전체 플레이리스트 목록 요청
    requestPlaylistListToSpring({ commit }) {
        return axiosInst.springAxiosInst.post('/playlist/list')
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
            })
    },
    // 로그인한 유저의 등록한 플레이리스트 수 요청
    requestPlaylistCountToSpring({ }) {
        return axiosInst.springAxiosInst.post('/playlist/count-playlist')
            .then((res) => {
                return res.data
            })
    },
    // 클릭한 플레이리스트 정보 요청
    requestPlaylistToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/playlist/${id}`)
            .then((res) => {
                commit(REQUEST_PALYLIST_TO_SPRING, res.data)
            })
    },
    // 플레이리스트 등록 요청
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
    // 플레이리스트 수정 요청
    requestModifyPlaylistToSpring({ }, { payload, playlistId }) {
        const { title } = payload
        const id = playlistId
        const requestData = { id, title }

        return axiosInst.springAxiosInst.post('/playlist/modify', requestData)
            .then((res) => {
                alert('수정 성공!')
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    // 로그인한 유저가 등록한 플레이리스트 목록 요청
    requestPlaylistByLoginAccountToSpring({ commit }, payload) {
        const page = payload
        return axiosInst.springAxiosInst.post(`/playlist/list-by-login-account/${page}`)
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
            })
    },
    // 플레이리스트 삭제 요청
    requestDeletePlaylistToSpring({ }, payload) {
        return axiosInst.springAxiosInst.delete(`/playlist/${payload}`)
            .then((res) => {
                alert('삭제 성공!')
                return true
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    // 좋아요 설정 요청
    requestIncreaseLikeCountToSpring({ }, payload) {
        return axiosInst.springAxiosInst.post(`/playlist/like-playlist/${payload}`)
            .then((res) => {
                return res.data
            })
    },
    // 좋아요 설정 해제 요청
    requestDecreaseLikeCountToSpring({ }, payload) {
        return axiosInst.springAxiosInst.post(`/playlist/unlike-playlist/${payload}`)
            .then((res) => {
                return res.data
            })
    },
    // 좋아요 설정 유무 확인 요청
    requestIsPlaylistLikedToSpring({ }, payload) {
        return axiosInst.springAxiosInst.post(`/playlist/check-liked/${payload}`)
            .then((res) => {
                return res.data
            })
    },
    // 페이징 된 플레이리스트 요청
    requestSlicePlaylistToSpring({ commit }, payload) {
        const page = payload
        return axiosInst.springAxiosInst.post(`/playlist/slice-list/${page}`)
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
            })
    },
    // 좋아요 순으로 정렬 된 플레이리스트 요청
    requestSortSlicePlaylistToSpring({ commit }, payload) {
        const page = payload
        return axiosInst.springAxiosInst.post(`/playlist/sort-slice-list/${page}`)
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
            })
    },
    // 전체 페이지 수 요청
    requestCountPlaylistToSpring({ },) {
        return axiosInst.springAxiosInst.post('/playlist/count-all-playlist')
            .then((res) => {
                return res.data
            })
    },

    requestCountPlaylistByLoginAccountToSpring({ },) {
        return axiosInst.springAxiosInst.post('/playlist/count-all-playlist')
            .then((res) => {
                return res.data
            })
    },
}