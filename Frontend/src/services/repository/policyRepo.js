import { toast } from "react-toastify";
import { apiConnector } from "../../services/apiConnector";
import { policyEndPoints } from "../../config/endpoints";
import { setPolicies } from "../slices/policySlice"; // Assuming you have a Redux slice for policies

export function createPolicy(policyData, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Creating policy...");
        try {
            const response = await apiConnector("POST", policyEndPoints.CREATE_POLICY, policyData);
            console.log("Create Policy API response: ", response);

            if (response.data.success) {
                toast.success("Policy created successfully!");
                navigate("/policies"); // Redirect after creation
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Create Policy API Error:", error);
            toast.error(error.response?.data?.message || "Error creating policy");
        }
        toast.dismiss(loadingToast);
    };
}

export function getAllEventPolicies() {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching event policies...");
        try {
            const response = await apiConnector("GET", policyEndPoints.GET_ALL_EVENT_POLICIES);
            console.log("Get All Event Policies API response: ", response);

            if (response.data.success) {
                dispatch(setPolicies(response.data.data)); // Save policies to Redux store
                toast.success("Policies loaded successfully");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Get All Event Policies API Error:", error);
            toast.error(error.response?.data?.message || "Error fetching policies");
        }
        toast.dismiss(loadingToast);
    };
}

export function getEventPolicies(event_id) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching event policies...");
        try {
            const response = await apiConnector("GET", policyEndPoints.GET_EVENT_POLICIES(event_id));
            console.log("Get Event Policies API response: ", response);

            if (response.data.success) {
                dispatch(setPolicies(response.data.data));
                toast.success("Event policies loaded successfully");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Get Event Policies API Error:", error);
            toast.error(error.response?.data?.message || "Error fetching policies");
        }
        toast.dismiss(loadingToast);
    };
}

export function deletePolicy(policy_id) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Deleting policy...");
        try {
            const response = await apiConnector("DELETE", policyEndPoints.DELETE_POLICY(policy_id));
            console.log("Delete Policy API response: ", response);

            if (response.data.success) {
                toast.success("Policy deleted successfully!");
                dispatch(getAllEventPolicies()); // Refresh policies after deletion
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Delete Policy API Error:", error);
            toast.error(error.response?.data?.message || "Error deleting policy");
        }
        toast.dismiss(loadingToast);
    };
}

export function getCategories() {
    return async (dispatch) => {
        const loadingToast = toast.loading("Fetching categories...");
        try {
            const response = await apiConnector("GET", policyEndPoints.GET_CATEGORIES);
            console.log("Get Categories API response: ", response);

            if (response.data.success) {
                dispatch(setPolicies(response.data.data)); // Assuming categories are stored in the same slice
                toast.success("Categories loaded successfully");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.log("Get Categories API Error:", error);
            toast.error(error.response?.data?.message || "Error fetching categories");
        }
        toast.dismiss(loadingToast);
    };
}
