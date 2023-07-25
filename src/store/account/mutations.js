import {
    REQUEST_ACCOUNT_LIST_TO_SPRING,
    REQUEST_ACCOUNT_TO_SPRING,
} from "./mutation-types";

export default {
    [REQUEST_ACCOUNT_LIST_TO_SPRING](state, receiveData) {
        state.accounts  = receiveData;
    },
    [REQUEST_ACCOUNT_TO_SPRING](state, receiveData) {
        state.account  = receiveData;
    }
}