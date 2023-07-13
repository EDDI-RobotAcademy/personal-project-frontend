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
}