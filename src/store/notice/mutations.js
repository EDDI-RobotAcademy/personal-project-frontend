import { NOTICE_LIST } from "./mutation-types";
import { NOTICE_INFO } from "./mutation-types";

export default {
  [NOTICE_LIST](state, receivedData) {
    state.noticeBoards = receivedData;
  },
  [NOTICE_INFO](state, receivedData) {
    state.noticeBoard = receivedData;
  },
};
