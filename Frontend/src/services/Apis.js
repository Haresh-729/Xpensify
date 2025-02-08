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

export const userEndPoints = {
    GET_USER_BY_ROLES: BaseURL + "user/user-by-roles/",
}
export const EventEndPoints = {
    CREATE_COLLECTION: BaseURL + "collection/",    
}

export const policyEndPoints = {
    CREATE_POLICY: BaseURL + "api/policy/", // Create new policy
    GET_ALL_EVENT_POLICIES: BaseURL + "api/policy/events", // Get formatted event policies
    GET_EVENT_POLICIES: (event_id) => BaseURL + `api/policy/event/${event_id}`, // Get event policies by event ID
    DELETE_POLICY: (policy_id) => BaseURL + `api/policy/policy/${policy_id}`, // Delete policy by policy ID
    GET_CATEGORIES: BaseURL + "api/policy/categories", // Get all categories
}