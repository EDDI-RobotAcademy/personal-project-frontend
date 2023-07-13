import {
    REQUEST_PALYLIST_LIST_TO_SPRING,
    REQUEST_PALYLIST_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_PALYLIST_LIST_TO_SPRING](state, receivedData) {
        state.playlists = receivedData
    },
    [REQUEST_PALYLIST_TO_SPRING](state, receivedData) {
        state.playlist = receivedData
    },
}