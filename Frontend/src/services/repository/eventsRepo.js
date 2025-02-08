import {toast} from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { EventEndPoints } from '../Apis';
import { setAfterFetchStatus, setProfileDetailsData } from '../../app/ProfileSlice';
const { CREATE_COLLECTION } = EventEndPoints;

export function putDataCollection(formData, navigate){
    return async(dispatch) => {
        const loadingToast = toast.loading("Creating collection ...");
        try{
            const response = await apiConnector("POST", CREATE_COLLECTION, formData);

            console.log("getDeteiledProfile API response : ", response);
            if(response.data.success){
                toast.success("Creation Successful..");
            }else{
                throw new Error("Error Creating Collection Details.");
            }
        }
        catch(error){
            console.log("create collection API Error....", error);
            // console.log("getDeteiledProfile API Error....", error.response?.data?.message);

            toast.error(error.message, "while creating collections.");
        }
        toast.dismiss(loadingToast);
    }
}