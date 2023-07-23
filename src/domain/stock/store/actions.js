import { REQUEST_STOCK_LIST_TO_SPRING,
            REQUEST_STOCK_TO_SPRING,
    } from './mutation-types'
import axiosInst from '@/utility/axiosInst'

export default {
    async requestStockListToSpring({ commit }, payload) {
        const { OCVA, ascending } = payload
        return axiosInst.spring.get(`/stock/list/${OCVA}/${ascending}`)
        .then((res) => {
            commit(REQUEST_STOCK_LIST_TO_SPRING, res.data)
        })
    },
    requestStockToSpring({ commit }, ticker) {
        return axiosInst.spring.get(`/stock/name/${ticker}`)
        .then((res) => {
            commit(REQUEST_STOCK_TO_SPRING, res.data)
        })
    }
}