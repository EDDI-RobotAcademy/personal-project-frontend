import { REQUEST_ARTICLE_LIST_TO_FASTAPI} from './mutation-types'
import axiosInst from '@/utility/axiosInst'

export default {
    requestAritcleListToFastApi({ commit }, payload) {
        const { stockName, nowPage } = payload
        return axiosInst.fastApi.get(`/article/${stockName}/${nowPage}`)
        .then((res) => {
            commit(REQUEST_ARTICLE_LIST_TO_FASTAPI, res.data)
        })
    },
}