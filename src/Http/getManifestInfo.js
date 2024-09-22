import createAxiosInstance from "./https"

export const getManifestINfoAPI = async (data)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('getManifestInfo',data,{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   
}