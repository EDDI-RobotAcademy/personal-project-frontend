import axios from "axios";

const axiosInst = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 2500,
    withCredentials: true
})
const spring = axiosInst

const fastApi = axios.create({
    baseURL: process.env.VUE_APP_FASTAPI_URL,
    timeout: 2500
})

  

export default { axiosInst, spring, fastApi}