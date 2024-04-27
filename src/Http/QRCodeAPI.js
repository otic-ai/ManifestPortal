import { jsx } from "@emotion/react"
import createAxiosInstance from "./https"

export const QRCodeGenerationAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('qrcodegeneration',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        alert(e)
    }
   
}

export const FormInstancesAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('formInstances',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        alert(e)
    }
   
}