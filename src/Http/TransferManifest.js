import createAxiosInstance from "./https"

export const transferManifest = async (data)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('transferManifest',data,{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   
}