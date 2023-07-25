import {
    REQUEST_BORD_LIST_TO_SPRING,
    REQUEST_BORD_TO_SPRING,
} from "./mutation-types";

export default {
    [REQUEST_BORD_LIST_TO_SPRING](state, receiveData) {
        state.bords  = receiveData;
    },
    [REQUEST_BORD_TO_SPRING](state, receiveData) {
        state.bord  = receiveData;
    }
}