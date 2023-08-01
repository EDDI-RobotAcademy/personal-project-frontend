import {
    REQUEST_COMMENT_LIST_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_COMMENT_LIST_TO_SPRING](state, receivedData) {
        state.comments = receivedData
    }
}