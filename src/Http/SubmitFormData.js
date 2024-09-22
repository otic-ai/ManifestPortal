import createAxiosInstance from "./https"

export const submitAPI = async (data)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('submitData',data,{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   
}