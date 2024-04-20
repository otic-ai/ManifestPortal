import createAxiosInstance from "./https"

export const FormDataViewAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('formdataview',{'id':id},{
            withCredentials:false
        })
        return response.data
    } catch(e){
        alert(e)
    }
   

}