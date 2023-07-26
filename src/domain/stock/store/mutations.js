import { REQUEST_STOCK_LIST_TO_SPRING, 
        REQUEST_STOCK_TO_SPRING,
        REQUEST_OPINON_LIST_TO_SPRING,
    } from "./mutation-types"

export default {
    [REQUEST_STOCK_LIST_TO_SPRING] (state, receivedData) {
        state.stocks = receivedData
    },
    [REQUEST_STOCK_TO_SPRING] (state, receivedData) {
        state.stock = receivedData
    },
    [REQUEST_OPINON_LIST_TO_SPRING] (state, receivedData) {
        state.stocks = receivedData
    }
}