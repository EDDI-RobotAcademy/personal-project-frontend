import {
    REQUEST_ARTICLE_LIST_TO_SPRING,
} from './mutation-types'

import axiosInst from "@/router/utility/axiosInst"

export default {
    sendPlaceName ({commit }, payload) {
        const placeName = payload
        return axiosInst.fastApiAxiosInst.get('/api/crawl-blog', {params:{placeName: placeName}})
            .then((res) => {
                console.log(res.data)
                commit(REQUEST_ARTICLE_LIST_TO_SPRING, res.data)
                return res.data
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    }, 
}