import axiosInst from "@/utility/axiosInst";
import { NOTICE_INFO, NOTICE_LIST } from "./mutation-types";

export default {
  async createNoticeBoard({}, payload) {
    const { title, content } = payload;
    console.log(payload);
    try {
      const response = await axiosInst.post("/notice/regist", {
        title,
        content,
      });
      alert("게시물이 등록 되었습니다.");
      console.log(response);
      return response;
    } catch (error) {
      console.error("게시물 등록 요청 중 오류 발생 : ", error);
      throw error;
    }
  },

  noticeListBoard({ commit }) {
    axiosInst.get("/notice/list").then((res) => {
      commit(NOTICE_LIST, res.data);
    });
  },

  noticeBoardInfo({ commit }, noticeId) {
    return axiosInst
      .get(`/notice/${noticeId}`)
      .then((res) => {
        commit(NOTICE_INFO, res.data);
      })
      .catch((error) => {
        console.error("게시물 정보 요청 중 오류 발생 : ", error);
      });
  },

  noticeBoardModify({}, payload) {
    const { noticeId, title, content } = payload;
    console.log(
      "noticeId : " + noticeId + ", title: " + title + ", content: " + content
    );
    return axiosInst
      .put(`/notice/${noticeId}`, { noticeId, title, content })
      .then((res) => {
        console.log("수정 완료 : " + res);
      })
      .catch((error) => {
        console.error("게시물 수정 요청 중 오류 발생 : ", error);
      });
  },
};
