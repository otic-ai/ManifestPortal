import { jsx } from "@emotion/react"
import createAxiosInstance from "./https"

export const FormDesignAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('getformdesign',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   

}

export const SubmitFormDesignAPI = async (id,design,name)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('editformdesign',{'id':id,'design':design,'name':name},{
            withCredentials:false
        })
        window.location.reload();
        return response.data['data']
    } catch(e){
        console.log('error',e)
    }
   

}


export const decryptFormID = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('decryptFormID',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   

}