import { COMMUNITY_LIST } from "./mutation-types";

export default {
  [COMMUNITY_LIST](state, receiveData) {
    state.communityBoards = receiveData;
  },
};
