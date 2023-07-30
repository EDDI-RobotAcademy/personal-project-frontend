import {
    REQUEST_SONG_LIST_TO_SPRING,
    REQUEST_SONG_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    // 노래 리스트 요청
    requestSongListToSpring({ commit }, playlistId) {
        return axiosInst.springAxiosInst.get(`/song/list/${playlistId}`)
            .then((res) => {
                commit(REQUEST_SONG_LIST_TO_SPRING, res.data)
            })
    },
    // 등록한 노래 수 요청
    requestSongCountToSpring({ }) {
        return axiosInst.springAxiosInst.post('/song/count-song')
            .then((res) => {
                return res.data
            })
    },
    // 노래 등록 요청
    requestRegisterSongToSpring(_, { payload, playlistId }) {
        const { title, singer, genre, link } = payload;
        const requestData = {
            playlistId, title, singer, genre, link
        }
        console.log(requestData)
        return axiosInst.springAxiosInst.post("/song/register", requestData)
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                alert("문제 발생!")
            });
    },
    // 특정 노래 정보 요청
    requestSongToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/song/${id}`)
            .then((res) => {
                commit(REQUEST_SONG_TO_SPRING, res.data)
            })
    },
    // 노래 정보 수정 요청
    requestModifySongToSpring({ }, { payload, songId }) {
        const { title, singer, genre, link } = payload
        const requestData = { songId, title, singer, genre, link }

        console.log(requestData)
        return axiosInst.springAxiosInst.post('/song/modify', requestData)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
    // 노래 삭제 요청
    requestDeleteSongToSpring({ }, payload) {
        return axiosInst.springAxiosInst.delete(`/song/${payload}`)
            .then((res) => {
                return true
            })
            .catch(() => {
                alert('문제 발생!')
            })
    },
}