import { REQUEST_STOCK_LIST_TO_SPRING,
            REQUEST_STOCK_TO_SPRING,
            REQUEST_OPINON_LIST_TO_SPRING,
    } from './mutation-types'
import axiosInst from '@/utility/axiosInst'

export default {
    async requestStockListToSpring({ commit }, payload) {
        const { OCVA, ascending, pageNumber } = payload
        return axiosInst.spring.get(`/stock/list/${OCVA}/${ascending}/${pageNumber}`)
        .then((res) => {
            commit(REQUEST_STOCK_LIST_TO_SPRING, res.data)
        })
    },
    async requestOpinionListToSpring({commit}, payload) {
        const {sortItem, ascending, pageNumber} = payload
        return axiosInst.spring.get(`/stock/opinion-list/${sortItem}/${ascending}/${pageNumber}`)
        .then((res) => {
            commit(REQUEST_OPINON_LIST_TO_SPRING, res.data)
        })
    },
    requestStockToSpring({ commit }, ticker) {
        return axiosInst.spring.get(`/stock/name/${ticker}`)
        .then((res) => {
            commit(REQUEST_STOCK_TO_SPRING, res.data)
        })
    },
    requestStockPageNumToSpring({ }){
        return axiosInst.spring.get('/stock/list')
        .then((res) => {
            return res.data.pageNum;
        })
    },
    requestOpinionPageNumToSrping({}) {
        return axiosInst.spring.get('/stock/opinion-list')
        .then((res) => {
            return res.data.pageNum;
        })
    }
}