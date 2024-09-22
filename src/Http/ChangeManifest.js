import { jsx } from "@emotion/react"
import createAxiosInstance from "./https"

export const ChangeManifestAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('changeManifest',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   

}

export const getManifestAPI = async ()=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.get('getManifests',{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log('error',e)
    }
   

}