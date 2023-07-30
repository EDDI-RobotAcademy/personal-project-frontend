import axios from "axios";

const axiosInst = axios.create({
    baseURL: 'http://43.201.41.0:7777',
    timeout: 2500,
    withCredentials: true
})
const spring = axiosInst

const fastApi = axios.create({
    baseURL: 'http://43.201.41.0:8000',
    timeout: 2500
    
})

  

export default { axiosInst, spring, fastApi}