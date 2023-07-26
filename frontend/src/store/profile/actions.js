import axiosInst from "@/utility/axiosInst";


export default{
    requestcheckPasswordToSpring({ }, payload){
        
        return axiosInst.post('/account/passwordCheck', payload)
            .then((res)=>{
                if(res==true){
                    return true;
                } else{
                    return false;
                }
            })
    }
}
