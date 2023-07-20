import { COMMUNITY_LIST } from "./mutation-types";
import { COMMUNITY_INFO } from "./mutation-types";
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
  communityListBoard({ commit }) {
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
  communityBoardInfo({ commit }, communityId) {
    return axiosInst
      .get(`/community/${communityId}`)
      .then((res) => {
        commit(COMMUNITY_INFO, res.data);
      })
      .catch((error) => {
        console.error("게시물 정보 요청 중 오류 발생 : ", error);
      });
  },
  communityBoardModify({}, payload) {
    const { communityId, title, content } = payload;
    console.log(
      "communityId : " +
        communityId +
        ", title: " +
        title +
        ", content: " +
        content
    );
    return axiosInst
      .put(`/community/${communityId}`, { communityId, title, content })
      .then((res) => {
        console.log("수정 완료 : " + res);
      })
      .catch((error) => {
        console.error("게시물 수정 요청 중 오류 발생 : ", error);
      });
  },

  communityBoardDelete({}, communityId) {
    return axiosInst
      .delete(`/community/${communityId}`, { params: { communityId } })
      .then((res) => {
        console.log("삭제 성공");
        console.log(res.data);
      })
      .catch((error) => {
        console.error("게시물 삭제 요청 중 오류 발생 : ", error);
      });
  },
};
