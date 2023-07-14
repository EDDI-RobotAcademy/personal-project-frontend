import {
    REQUEST_SONG_LIST_TO_SPRING,
    REQUEST_SONG_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_SONG_LIST_TO_SPRING](state, receivedData) {
        state.songs = receivedData
    },
    [REQUEST_SONG_TO_SPRING](state, receivedData) {
        state.song = receivedData
    },
}