import axios from "axios";
import env from "../env";

const axiosInst = axios.create({
    baseURL: 'http://localhost:7777',
    // baseURL: env.api.MAIN_API_URL,
    timeout: 2500
})
const spring = axiosInst

const fastApi = axios.create({
    baseURL: 'http://localhost:8000',
    // baseURL: env.fastApi.MAIN_API_URL,
    timeout: 2500
})

  

export default { axiosInst, spring, fastApi}