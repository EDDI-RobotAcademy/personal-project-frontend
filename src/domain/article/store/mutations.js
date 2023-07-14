import { REQUEST_ARTICLE_LIST_TO_FASTAPI } from "./mutation-types"

export default {
    [REQUEST_ARTICLE_LIST_TO_FASTAPI] (state, receivedData) {
        state.articles = receivedData
    },
}