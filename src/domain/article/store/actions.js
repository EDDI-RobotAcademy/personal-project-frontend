import { REQUEST_ARTICLE_LIST_TO_FASTAPI} from './mutation-types'
import axiosInst from '@/utility/axiosInst'

export default {
    requestAritcleListToFastApi({ commit }, stockName) {
        return axiosInst.fastApi.get(`/article/${stockName}`)
        .then((res) => {
            commit(REQUEST_ARTICLE_LIST_TO_FASTAPI, res.data)
        })
    },
}