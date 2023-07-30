import { REQUEST_MY_BOARD_LIST_TO_SPRING ,REQUEST_MY_ACCOUNT_TO_SPRING,REQUEST_MY_BOARD_LIST_RE_SET_ACTION,REQUEST_REPORTED_COMMENT_LIST_TO_SPRING} from "./mutation-types";

export default{
    [REQUEST_MY_BOARD_LIST_TO_SPRING](state,receiveData){
        state.myBoards =receiveData;
        console.log(state.myBoards)
    },
    [REQUEST_MY_BOARD_LIST_RE_SET_ACTION](state){
        state.myBoards=null
        console.log(myBoards)
    },
    [REQUEST_REPORTED_COMMENT_LIST_TO_SPRING](state, receiveData){
        state.reportedCommentList=receiveData
    },
    [REQUEST_MY_ACCOUNT_TO_SPRING](state,receiveData){
        state.myAccount=receiveData
    }
    

   
}