import axiosInst from "@/utility/axiosInst";
import { NOTICE_LIST } from "./mutation-types";

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
      console.error("게시물 등록 요청 중 오류 발생:", error);
      throw error;
    }
  },
  noticeListBoard({ commit }) {
    axiosInst.get("/notice/list").then((res) => {
      commit(NOTICE_LIST, res.data);
    });
  },
};
