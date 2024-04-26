import axios from "axios";
import { auth } from "../Firebase";
import createAxiosInstance, { getUrl } from "./https"

export const FormManagementAPI = async (id)=>{
    try{
        const axiosInstance = await createAxiosInstance()
        const response = await axiosInstance.post('getFormInstance',{'id':id},{
            withCredentials:false
        })
        
        return response.data
    } catch(e){
        console.log(e)
     alert(e)
    }
   
}

export const FormManagementSubmitAPI = async (data)=>{
    try {
        const uploadUrl = await getUrl()+'formmanagement';  // Replace with your API endpoint
        const user = await auth.currentUser;
        const token =  await user.getIdToken() ;
     await   axios.post(uploadUrl, data, {
            
          headers: {
            "Accept": "application/json",
            'Content-Type': 'multipart/form-data',
            "Authorization": `${token}`,
          }
        })
        .then( response => {
          
          console.log('File uploaded successfully:', response.data);
      
          if (response.status=200){
        return response.data
      }
      else{
        throw new Error('An error occured')
      }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          throw new Error(error)
        });
    }catch(e){
      throw new Error(e)
    }
  
}