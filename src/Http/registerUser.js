import createAxiosInstance from "./https"

export const registerUser = async (data)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('registerUser',data,{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   
}