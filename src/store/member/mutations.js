import {
    LOGIN_COMPLETE, SET_NICKNAME
} from './mutation-types'

export default {
    [LOGIN_COMPLETE] (state, receivedData) {
        state.isLogin = receivedData
    },
    [SET_NICKNAME] (state, receivedData) {
        state.nickName = receivedData
    },
}