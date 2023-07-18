import { REQUEST_PRODUCT_LIST_TO_SPRING, REQUEST_PRODUCT_TO_SPRING } from "./mutation-types";

import axiosInstances from "@/utility/axiosInst";

export default {
  requestProductListToSpring({ commit }) {
    axiosInstances.springAxiosInst.get("/product/list").then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
  requestRegisterProductInfoToSpring({}, payload) {
    const {
      productName,
      productPrice,
      productDescription,
      productTags,
      receivedEmail,
      productImageName,
    } = payload;

    return axiosInstances.springAxiosInst
      .post("/product/register", {
        productName,
        productPrice,
        productDescription,
        productTags,
        receivedEmail,
        productImageName,
      })
      .then((res) => {
        // alert("파일 저장 요청 성공");
        // console.log(res.data.productId);
        return res.data.productId;
      })
      .catch(() => {
        alert("문제 발생");
      });
  },
  requestProductToSpring({ commit }, productId) {
    return axiosInstances.springAxiosInst.get(`/product/${productId}`).then((res) => {
      commit(REQUEST_PRODUCT_TO_SPRING, res.data);
    });
  },
  requestDeleteProductToSpring({}, productId) {
    return axiosInstances.springAxiosInst
      .delete(`/product/${productId}`)
      .then((res) => {
        // alert("파일 삭제 성공");
      })
      .catch(() => {
        alert("문제 발생!");
      });
  },
  requestProductModifyToSpring({}, payload) {
    const {
      productName,
      productPrice,
      productDescription,
      productTags,
      receivedEmail,
      productImageName,
      productId,
    } = payload;

    return axiosInstances.springAxiosInst
      .put(`/product/${productId}`, {
        productName,
        productPrice,
        productDescription,
        productTags,
        receivedEmail,
        productImageName,
      })
      .then((res) => {
        alert("상품 정보 수정 성공");
        return res.data.productId;
      })
      .catch(() => {
        alert("문제 발생!");
      });
  },
};
