import { REQUEST_COMMENT_LIST_TO_SPRING, } from "./mutation-types";

export default{
    [REQUEST_COMMENT_LIST_TO_SPRING](state,receiveData){
        state.comments =receiveData;
        console.log(state.comments)
    },
    // [REQUEST_BOARD_TO_SPRING](state, receiveData){
    //     state.board=receiveData;
    //     console.log(state.board)
    // }
}