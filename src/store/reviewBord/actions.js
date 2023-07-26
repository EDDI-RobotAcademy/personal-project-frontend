import router from "@/router";
import {
    REQUEST_BORD_LIST_TO_SPRING,
    REQUEST_BORD_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
    requestRegisterReviewBordToSpring({}, payload) {
        const { starRating, placeName, content } = payload;

        return axiosInst
        .post("/bord/register", payload)
        .then((res) => {
            alert("게시물이 등록 되었습니다.");
            router.push('/mapMarkerTestPage')
            return res;
        })
        .catch(()=>{
            alert("게시물 등록 실패");
        });
    } 
}