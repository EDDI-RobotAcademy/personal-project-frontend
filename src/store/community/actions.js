import axiosInst from "@/utility/axiosInst";
import { COMMUNITY_LIST } from "./mutation-types";

export default {
  createCommunityBoard({}, payload) {
    const { title, content } = payload;

    return axiosInst
      .post("/community/regist", { title, content })
      .then((res) => {
        alert("게시물이 등록 되었습니다.");
        return res;
      })
      .catch(() => {
        alert("게시물 등록 실패");
      });
  },
  communityListBoard({ commit }) {
    axiosInst.get("/community/list").then((res) => {
      commit(COMMUNITY_LIST, res.data);
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
