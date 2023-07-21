import {
    REQUEST_REVIEW_LIST_TO_SPRING,
    REQUEST_REVIEW_TO_SPRING,
} from "./mutation-types";

import axiosInst from '@/utility/axiosInst'

export default {
    requestReviewRegisterToSpring({ }, payload) {
        const { ratings, comment, userToken, restaurantName } = payload

        return axiosInst.springAxiosInst.post("/review/register", { ratings, comment, userToken, restaurantName })
            .then((resReview) => {
                alert('후기가 작성되었습니다')
                location.reload()

                console.log('작성한 리뷰: ' + resReview.data)
                return resReview.data
            })
            .catch(() => {
                alert("통신이 불가합니다")
            })
    },
    requestReviewListToSpring({ commit }, payload) {
        const { restaurantName } = payload

        return axiosInst.springAxiosInst.post("/review/list", { restaurantName })
            .then((resReviewList) => {
                console.log('후기 목록: ' + resReviewList.data)
                commit(REQUEST_REVIEW_LIST_TO_SPRING, resReviewList.data);
            })
            .catch((error) => {
                alert('에러 발생!')
            })
    },
    requestModifyReviewToSpring({ }, payload) {
        const { id, userToken, modifiedComment, modifiedRatings } = payload

        return axiosInst.springAxiosInst.put(`/review/${id}`, { id, userToken, modifiedComment, modifiedRatings })
            .then((resReviewModify) => {
                if (resReviewModify.data) {
                    console.log("수정 잘 되는지 확인: " + JSON.stringify(resReviewModify.data));
                    alert("후기가 수정되었습니다.");
                    return resReviewModify.data;
                }
            })
            .catch(() => {
                alert("후기 수정 통신 실패");
            });
    },
    requestReviewToSpring({ commit }, id) {
        return axiosInst.springAxiosInst.get(`/review/${id}`)
            .then((resReviewRead) => {
                console.log("후기 잘 읽는지 확인: " + JSON.stringify(resReviewRead.data));
                commit(REQUEST_REVIEW_TO_SPRING, resReviewRead.data);
            })
            .catch(() => {
                alert("후기 read 통신 실패!");
            });
    },
    requestDeleteReviewToSpring({ }, id) {
        return axiosInst.springAxiosInst.delete(`/review/${id}`)
            .then((resReviewDelete) => {
                alert('삭제 완료되었습니다!')
                location.reload()
            })
            .catch(() => {
                alert("후기 삭제 실패!");
            });
    },
}