import {
  LOGIN_COMPLETE, SET_USER_NICKNAME, REQUEST_ACCOUNT_TO_SPRING, RESET_ACCOUNT // 추가: 사용자 정보 변경
} from './mutation-types'

export default {
  [LOGIN_COMPLETE](state, receivedData) {
    state.isAuthenticated = receivedData;
    localStorage.setItem('isAuthenticated', receivedData); // 로컬 스토리지에 사용자 인증 상태 저장
  },
  [SET_USER_NICKNAME](state, receivedData) {
    state.userNickname = receivedData;
    localStorage.setItem('userNickname', receivedData); // 로컬 스토리지에 사용자 닉네임 저장
  },
  [REQUEST_ACCOUNT_TO_SPRING](state, receivedData) {
    state.account = receivedData
  },
  [RESET_ACCOUNT](state) {
    state.isAuthenticated = false;
    state.userNickname = '';
    state.account = {}; // account 상태를 리셋
  },

}