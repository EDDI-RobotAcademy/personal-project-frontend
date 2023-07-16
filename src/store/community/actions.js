import axiosInst from "@/utility/axiosInst";
import { COMMUNITY_LIST } from "./mutation-types";

export default {
  createCommunityBoard({ }, payload) {
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
  requestCommunityBoardList({ commit }) {
    axiosInst.get("/community/list").then((res) => {
      commit(COMMUNITY_LIST, res.data);
    }).catch((error) => {
      console.error("게시물 목록 요청 중 오류 발생:", error);
      alert("게시물 목록을 가져오는 중 오류가 발생했습니다.");
    });
  },
};
