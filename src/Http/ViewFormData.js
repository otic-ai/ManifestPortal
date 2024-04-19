import createAxiosInstance from "./https"

export const FormDataViewAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('formdata',id,{
            withCredentials:true
        })
        return response.data
    } catch(e){
        alert(e)
    }
   

}