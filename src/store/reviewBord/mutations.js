import {
    REQUEST_REVIEW_LIST_TO_SPRING,
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

export default {
    [REQUEST_REVIEW_LIST_TO_SPRING](state, receiveData) {
        state.reviewBords  = receiveData;
    },
    [REQUEST_REVIEW_TO_SPRING](state, receiveData) {
        state.reviewBords  = receiveData;
    }
}