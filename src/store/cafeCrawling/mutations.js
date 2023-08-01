import {
    REQUEST_ARTICLE_LIST_TO_SPRING,
} from './mutation-types'

export default {
    [REQUEST_ARTICLE_LIST_TO_SPRING] (state, receivedData) {
        state.blogs = receivedData 
    },
  
}