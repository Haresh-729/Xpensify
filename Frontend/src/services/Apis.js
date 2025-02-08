//All the API endpoints will be declared here and then this will be used in entire frontend to access the endpoints...

// const BaseURL = "http://10.112.9.12:3000/api/";
const BaseURL = import.meta.env.VITE_API_BASE_URL;

export const authEndpoints = {
    LOGIN_API: BaseURL + "auth/login",
    REGISTER: BaseURL + "auth/register",
    VALIDATE_GMAIL: BaseURL + "auth/validate",
}

export const profileEndPoints = {
    GET_PROFILE: BaseURL + "profile/",
    
}