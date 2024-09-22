import createAxiosInstance from "./https"

export const listManifest = async (data)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.get('listManifest',{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   
}