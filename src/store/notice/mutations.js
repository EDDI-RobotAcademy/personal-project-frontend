import { NOTICE_LIST } from "./mutation-types";

export default {
  [NOTICE_LIST](state, receiveData) {
    state.noticeBoards = receiveData;
  },
};
