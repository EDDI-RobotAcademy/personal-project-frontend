import {
  REQUEST_REVIEW_LIST_TO_SPRING
} from "./mutation-types";

export default {
  [REQUEST_REVIEW_LIST_TO_SPRING](state, receivedData) {
    state.reviews = receivedData;
  },
};

