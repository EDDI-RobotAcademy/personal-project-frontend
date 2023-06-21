import { MANAGER_NOTICE_LIST } from "./mutation-types";

export default {
    [MANAGER_NOTICE_LIST](state, receiveData) {
        state.noticeBoards = receiveData;
    }
}