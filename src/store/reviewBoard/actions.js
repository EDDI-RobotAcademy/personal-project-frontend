import router from "@/router";
import {
    REQUEST_REVIEW_LIST_TO_SPRING,
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
    requestReviewBoardToSpring({ commit }, id) {
        console.log("reviewId: " + id)
        return axiosInst.get(`/review/read/${id}`)
            .then((res) => {
                commit(REQUEST_REVIEW_TO_SPRING, res.data)
            })
    },
    requestReviewBoardListToSpring({ commit }) {
        axiosInst.get('review/list')
        .then((res) => {
            commit(REQUEST_REVIEW_LIST_TO_SPRING, res.data)
        })
    },
    requestRegisterReviewBoardToSpring({}, payload) {
        const { content, placeName, userEmail, starRating1, starRating2 } = payload;

        return axiosInst
        .post("/review/register", payload)
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