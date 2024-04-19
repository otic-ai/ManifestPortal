
import axios from "axios";
import { auth, db } from "../Firebase";
import { doc, getDoc } from "@firebase/firestore";

const baseURL = "https://4b82-102-134-149-56.ngrok-free.app/api/";

export const getUrl = async () => {
    try {
        const docRef = doc(db, "intialization", 'xNlO6zpzNoAD90ATJy2r');
        const docSnapshot = await getDoc(docRef); // Initialize `doc` here
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return data['host']+'/';
        } else {
            console.log('No such document!');
            throw new Error('No such document!');
        }
    } catch (error) {
        console.log('Error getting document:', error);
        throw new Error(error);
    }
};

const createAxiosInstance = async () => {
    try {
        const host = await getUrl();
        const user = await auth.currentUser;
        const token =  await user.getIdToken() ;
       
        const axiosInstance = axios.create({
            baseURL: host ? host : baseURL,
            headers: {
                "Accept": "application/json",
                "Authorization": `${token}`,
            },
        });

        return axiosInstance;
    } catch (error) {
        console.error('Error creating Axios instance:', error);
        throw new Error('Error creating Axios instance:', error);
    }
};

export default createAxiosInstance;
