import { REQUEST_MARKER_LIST_TO_SPRING } from "./mutation-types";

export default{
    [REQUEST_MARKER_LIST_TO_SPRING](state,receiveData){
        state.markers =receiveData;
        console.log(state.markers)
    },
}