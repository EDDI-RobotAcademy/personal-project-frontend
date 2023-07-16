import axiosInst from "@/utility/axiosInst";
import { MANAGER_NOTICE_LIST } from "./mutation-types";

export default {
    createNoticeBoard({ }, payload) {
        const { title, content } = payload;
        return axiosInst.post("/notice/regist", { title, content }).then((res) => {
            alert("게시물이 등록 되었습니다.");
            return res;
        }).catch(() => {
            alert("게시물 등록 실패");
        })
    },
    noticeListBoard({ commit }) {
        axiosInst.get("/notice/list").then((res) => {
            commit(MANAGER_NOTICE_LIST, res.data);
        });
    },
}