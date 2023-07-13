import axiosInst from "@/utility/axiosInst";

import { REQUEST_ACCOUNT_LIST_TO_SPRING } from "./mutation-types";

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

  // requestLogin({}, payload) {
  //   axiosInst
  //     .post("/account/login", payload)
  //     .then((res) => {
  //       alert("login success!");
  //       localStorage.setItem("accountToken", res.data);
  //       return res;
  //     })
  //     .catch(() => alert("ERROR"));
  // },

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
    return axiosInst.get("/account/login", { email, password }).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log(res.data.loginStatus);
      console.log(res.data.userTocken);
      // if (res.data.loginStatus == "id X") {
      //   alert("아이디가 틀림");
      // }
    });
  },
};
