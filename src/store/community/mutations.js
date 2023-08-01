import { COMMUNITY_LIST } from "./mutation-types";
import { COMMUNITY_INFO } from "./mutation-types";

export default {
  [COMMUNITY_LIST](state, receiveData) {
    state.communityBoards = receiveData;
  },
  [COMMUNITY_INFO](state, receivedData) {
    state.communityBoard = receivedData;
  },
};
