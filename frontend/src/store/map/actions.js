import {REQUEST_MARKER_LIST_TO_SPRING} from "./mutation-types"
import axiosInst from '@/utility/axiosInst'

export default {
   requestMarkerListToSpring({commit}){
    return axiosInst.post("/marker/list")
    .then((res)=>{
      commit(REQUEST_MARKER_LIST_TO_SPRING, res.data)
    })
   },
}