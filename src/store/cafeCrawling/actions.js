import router from "@/router"
import axiosInst from "@/router/utility/axiosInst"

export default {
    sendPlaceName ({ }, payload) {
        const placeName = payload
        return axiosInst.fastApiAxiosInst.get('/api/crawl-blog', {params:{placeName: placeName}})
            .then((res) => {
                console.log(res.data)
                return res.data
            })
            .catch((res) => {
                alert("문제 발생!")
            })
    }, 
}