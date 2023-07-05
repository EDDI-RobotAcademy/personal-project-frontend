import {} from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestSpringToCheckEmailDuplication({}, payload) {
    const email = payload.email;
    console.log("email: " + email);
    return axiosInstances.springAxiosInst
      .get(`/account/check-email/${email}`)
      .then((res) => {
        if (res.data) {
          alert("사용 가능한 이메일입니다");
          return true;
        } else {
          alert("중복된 이메일입니다");
          return false;
        }
      })
      .catch((res) => {
        alert("이메일체크 문제 발생");
      });
  },
  requestRegisterAccountToSpring({}, payload) {
    const { email, password } = payload;
    return axiosInstances.springAxiosInst
      .post("/account/sign-up", { email, password })
      .then((res) => {
        alert("회원 가입 완료");
        return res.data;
      })
      .catch(() => {
        alert("회원가입 문제 발생");
      });
  },
};
