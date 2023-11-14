import {
    REQUEST_STARAVG_TO_SPRING
} from "./mutation-types";

export default {
    [REQUEST_STARAVG_TO_SPRING](state, receiveData) {
        state.starAvg  = receiveData;
    }
}