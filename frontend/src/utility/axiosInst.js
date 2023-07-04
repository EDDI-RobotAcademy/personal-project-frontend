import axios from "axios";
import env from "@/env.js";

const axiosInst = axios.create({
    baseURL: 'http://localhost:7777',
    timeout: 2500
})

export default axiosInst