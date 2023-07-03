import axios from "axios";

const axiosInst = axios.create({
    baseURL: process.env.VUE_APP_SPRING_URL,
    timeout: 2500,
});

const springAxiosInst = axiosInst

const fastApiAxiosInst = axios.create({
    baseURL: process.env.VUE_APP_FASTAPI_URL,
    timeout: 2500
})

export default { axiosInst, springAxiosInst, fastApiAxiosInst }