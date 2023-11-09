import router from "@/router";
import {
    REQUEST_STARAVG_TO_SPRING
} from "./mutation-types";

import axiosInst from "@/utility/axiosInst";

export default {
    requestStarAvg({commit}, placeName) {
        axiosInst.get('/pool/detail', { params: {placeName: placeName}})
        .then((res) => {
            commit(REQUEST_STARAVG_TO_SPRING, res.data);
            console.log(res.data);
            return res.data;
        })
    }
}