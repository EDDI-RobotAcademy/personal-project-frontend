import axiosInst from "@/utility/axiosInst";
import router from "@/router";
import { setCookie, getCookie } from "@/utility/cookieUtils";

import { REQUEST_ACCOUNT_LIST_TO_SPRING } from "./mutation-types";
import { REQUEST_ACCOUNT_INFO_TO_SPRING } from "./mutation-types";

export default {
  requestSpringToCheckEmail({}, payload) {
    const { email } = payload;
    console.log("email: " + email);
    return axiosInst
      .get(`/account/check-email/${email}`)
      .then((res) => {
        if (res.data == true) {
          alert("사용 가능한 이메일 입니다.");
          return true;
        } else {
          alert("중복된 이메일 입니다.");
          return false;
        }
      })
      .catch((res) => {
        alert("문제 발생 ! ");
      });
  },

  requestCreateAccountToSpring({}, payload) {
    const {
      email,
      password,
      accountName,
      accountBirth,
      accountPhone,
      accountAddress,
    } = payload;

    return axiosInst
      .post("/account/regist", {
        email,
        password,
        accountName,
        accountBirth,
        accountPhone,
        accountAddress,
      })
      .then((res) => {
        alert("계정 등록 성공!");
        return res;
      })
      .catch(() => {
        alert("문제 발생!");
      });
  },

  requestAccountListToSpring({ commit }) {
    axiosInst
      .get("/account/list")
      .then((res) => {
        commit(REQUEST_ACCOUNT_LIST_TO_SPRING, res.data);
        console.log(res.data);
      })
      .catch(() => {
        alert("문제 발생");
      });
  },

  requestDelete({}, email) {
    return axiosInst
      .delete(`/account/delete/${email}`)
      .then((res) => {
        alert("삭제 하였습니다.");
      })
      .catch(() => {
        alert("문제 발생 ~");
      });
  },
  accountLogin({}, payload) {
    const { email, password } = payload;
    return axiosInst.post("/account/login", { email, password }).then((res) => {
      console.log(res.data);
      if (res.data.loginStatus == "WRONG_ID") alert("아이디가 잘못되었습니다.");
      if (res.data.loginStatus == "WRONG_PW")
        alert("비밀번호가 잘못되었습니다..");
      if (res.data.loginStatus == "SUCCESS_LOGIN") {
        setCookie("userToken", res.data.userToken, 7);
        router.push("/");
      }
    });
  },
  CheckPassword({}, payload) {
    const { password } = payload;
    const userToken = getCookie("userToken");
    return axiosInst
      .post("/account/gomypage", { password, userToken })
      .then((res) => {
        console.log(res);
        if (res.data) {
          router.push({ name: "Mypage", params: { accountId: res.data } });
        } else {
          alert("비밀번호가 다릅니다.");
        }
      });
  },
  accountInfo({ commit }, accountId) {
    return axiosInst
      .get(`/account/${accountId}`)
      .then((res) => {
        console.log(res.data);
        commit(REQUEST_ACCOUNT_INFO_TO_SPRING, res.data);
      })
      .catch((error) => {
        console.error("회원 정보 요청 중 오류 발생 : ", error);
      });
  },
  accountInfoModify({}, payload) {
    const {
      accountId,
      password,
      accountName,
      accountBirth,
      accountPhone,
      accountAddress,
    } = payload;
    const userToken = getCookie("userToken");

    console.log(payload);
    return axiosInst
      .put(`/account/${accountId}`, {
        accountId,
        userToken,
        password,
        accountName,
        accountBirth,
        accountPhone,
        accountAddress,
      })
      .then((res) => {
        console.log("수정 완료 : " + res);
      })
      .catch((error) => {
        console.error("회원 정보 수정 요청 중 오류 발생 : ", error);
      });
  },
  accountDelete({}, accountId) {
    const userToken = getCookie("userToken");

    return axiosInst
      .delete(`/account/${accountId}`, { data: { accountId, userToken } })
      .then((res) => {
        console.log("삭제 성공");
        console.log(res.data);
      })
      .catch((error) => {
        console.error("회원 정보 삭제 요청 중 오류 발생 : ", error);
      });
  },
};
