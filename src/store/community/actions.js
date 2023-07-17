import { COMMUNITY_LIST } from "./mutation-types";
import axiosInst from "@/utility/axiosInst";

export default {
  createCommunityBoard({}, payload) {
    const { title, content } = payload;
    return axiosInst
      .post("/community/regist", { title, content })
      .then((res) => {
        alert("게시물이 등록 되었습니다.");
        return res;
      })
      .catch((error) => {
        console.error("게시물 등록 요청 중 오류 발생:", error);
      });
  },
  requestCommunityBoardList({ commit }) {
    return axiosInst
      .get("/community/list")
      .then((res) => {
        console.log(res.data);
        commit(COMMUNITY_LIST, res.data);
      })
      .catch((error) => {
        console.error("게시물 목록 요청 중 오류 발생 : ", error);
      });
  },
};
