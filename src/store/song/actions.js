import {
    REQUEST_SONG_LIST_TO_SPRING,
    REQUEST_SONG_TO_SPRING
} from './mutation-types'

import axiosInst from '@/utility/axiosInst'

export default {
    requestSongListToSpring({ commit }, playlistId) {
        return axiosInst.springAxiosInst.get(`/song/list/${playlistId}`)
            .then((res) => {
                commit(REQUEST_SONG_LIST_TO_SPRING, res.data)
            })
    },
    requestSongCountToSpring({ }) {
        return axiosInst.springAxiosInst.post('/song/count-song')
            .then((res) => {
                console.log("res.data = " + res.data)
                return res.data
            })
    },
    requestRegisterSongToSpring(_, { payload, playlistId }) {
        const { title, singer, genre, link } = payload;
        return axiosInst.springAxiosInst
            .post("/song/register", { playlistId, title, singer, genre, link })
            .then((res) => {
                alert("등록 성공!")
                return res;
            })
            .catch(() => {
                alert("문제 발생!")
            });
    },
    requestSongToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/song/${id}`)
            .then((res) => {
                commit(REQUEST_SONG_TO_SPRING, res.data)
            })
    },
}