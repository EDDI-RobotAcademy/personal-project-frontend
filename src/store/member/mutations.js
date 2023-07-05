import {
    LOGIN_COMPLETE,
} from './mutation-types'

export default {
    [LOGIN_COMPLETE] (state, receivedData) { //리스트안에 들어있는 형식
        state.isLogin = receivedData
    },
}