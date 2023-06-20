import axiosInst from "@/utility/axiosInst";


export default {
    CreateNoticeBoard({ }, payload) {
        const { title, content } = payload;

        return axiosInst.post("/notice/regist", { title, content }).then((res) => {
            alert("게시물이 등록 되었습니다.");
            return res;
        }).catch(() => {
            alert("게시물 등록 실패");
        })
    }

}