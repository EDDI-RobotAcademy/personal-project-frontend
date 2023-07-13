import { REQUEST_PRODUCT_LIST_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestProductListToSpring({ commit }) {
    axiosInstances.springAxiosInst.get("/product/list").then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestRegisterProductInfoToSpring({}, payload) {
    return axiosInstances.springAxiosInst
      .post("/product/register", payload)
      .then((res) => {
        alert("파일 저장 요청 성공");
      })
      .catch(() => {
        alert("문제 발생");
      });
  },
};
