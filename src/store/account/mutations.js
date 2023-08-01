import {
  REQUEST_ACCOUNT_LIST_TO_SPRING,
  REQUEST_ACCOUNT_INFO_TO_SPRING,
} from "./mutation-types";

export default {
  [REQUEST_ACCOUNT_LIST_TO_SPRING](state, receivedData) {
    state.accounts = receivedData;
  },
  [REQUEST_ACCOUNT_INFO_TO_SPRING](state, receivedData) {
    state.account = receivedData;
  },
};
