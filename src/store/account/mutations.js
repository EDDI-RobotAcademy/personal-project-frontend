import { REQUEST_BOARD_LIST_TO_SPRING, REQUEST_BOARD_TO_SPRING, IS_SIGNIN } from "./mutation-types";

export default {
  [REQUEST_BOARD_LIST_TO_SPRING](state, receivedData) {
    state.boards = receivedData;
  },
  [REQUEST_BOARD_TO_SPRING](state, receivedData) {
    state.board = receivedData;
  },
  [IS_SIGNIN](state, receivedData) {
    state.isSignIn = receivedData;
  },
};
