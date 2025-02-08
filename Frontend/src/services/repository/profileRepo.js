import {toast} from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { profileEndPoints } from '../Apis';
import { setAfterFetchStatus, setProfileDetailsData } from '../../app/ProfileSlice';
const { GET_PROFILE } = profileEndPoints;

export function getDeteiledProfile(navigate){
    return async(dispatch) => {
        // const loadingToast = toast.loading("Letting you in...");
        try{
            const response = await apiConnector("GET", GET_PROFILE);

            console.log("getDeteiledProfile API response : ", response);
            if(response.data.success){
                // toast.success("Login Successful..");
                if(response.data.data.status){
                    dispatch(setProfileDetailsData(response.data.data.profileData));
                }else{
                    dispatch(setAfterFetchStatus(
                        {
                            afterFetchStatus: true,
                        }
                    ));
                }
            }else{
                throw new Error("Error Fetching Profile Details.");
            }
        }
        catch(error){
            console.log("getDeteiledProfile API Error....", error);
            // console.log("getDeteiledProfile API Error....", error.response?.data?.message);

            toast.error(error.message, "while fetching Details.");
        }
        // toast.dismiss(loadingToast);
    }
}