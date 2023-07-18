import { IS_SIGNIN, EMAIL } from "./mutation-types";

export default {
  [IS_SIGNIN](state, receivedData) {
    state.isSignIn = receivedData;
  },
  [EMAIL](state, receivedData) {
    state.email = receivedData;
  },
};
