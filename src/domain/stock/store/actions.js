import { REQUEST_STOCK_LIST_TO_SPRING,
            REQUEST_STOCK_TO_SPRING 
    } from './mutation-types'
import axiosInst from '@/utility/axiosInst'

export default {
    requestStockListToSpring({ commit }) {
        return axiosInst.spring.get('/stock/list')
        .then((res) => {
            commit(REQUEST_STOCK_LIST_TO_SPRING, res.data)
        })
    },
    
}