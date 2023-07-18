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
                console.log("res.data = " + res.data)
                return res.data
            })
    },
    // 클릭한 플레이리스트 정보 요청
    requestPlaylistToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/playlist/${id}`)
            .then((res) => {
                console.log(res.data)
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
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    // 로그인한 유저가 등록한 플레이리스트 목록 요청
    requestPlaylistByLoginAccountToSpring({ commit },) {
        return axiosInst.springAxiosInst.post('/playlist/list-by-login-account')
            .then((res) => {
                commit(REQUEST_PALYLIST_LIST_TO_SPRING, res.data)
                console.log(res.data)
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

    requestIncreaseLikeCountToSpring({ }, payload) {
        return axiosInst.springAxiosInst.post(`/playlist/like-playlist/${payload}`)
            .then((res) => {
                console.log(res.data)
                return res.data
            })
    },

    requestDecreaseLikeCountToSpring({ }, payload) {
        return axiosInst.springAxiosInst.post(`/playlist/unlike-playlist/${payload}`)
            .then((res) => {
                console.log(res.data)
                return res.data
            })
            .catch(e => {
                if (e.response.status === 403) {
                    alert("로그인 후 이용 가능")
                    localStorage.removeItem("isLogin")
                    router.push('/')
                }
            })
    },

    requestIsPlaylistLikedToSpring({ }, payload) {
        console.log(payload)
        return axiosInst.springAxiosInst.post(`/playlist/check-liked/${payload}`)
            .then((res) => {
                console.log(res.data)
                return res.data
            })
    },
}