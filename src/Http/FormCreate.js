import axios from "axios";
import { auth } from "../Firebase";
import createAxiosInstance, { getUrl } from "./https"

export const createFormAPI = async (data)=>{
    try {
        const uploadUrl = await getUrl()+'createform';  // Replace with your API endpoint
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