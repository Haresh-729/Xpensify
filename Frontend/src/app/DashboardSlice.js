import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const localData = JSON.parse(localStorage.getItem("account"));
const initialState = {
    dashboardMenuState: false,
    dashboardFeature: "Main", //dashboard, orders, appointment, messages, profile
    account: localData ? localData : [],
    isLoggedIn: localData ? localData.isLoggedIn :true,
    profileData: [],
    role: "user", //"user", "company", "superAdmin"
};

const DashboardSlice = createSlice({
    initialState,
    name:  "dashboard",
    reducers: {
        setOpenDMenu: (state, action) => {
            state.dashboardMenuState = action.payload.dashboardMenuState;
        },
        setCloseDMenu: (state, action) => {
            state.dashboardMenuState = action.payload.dashboardMenuState;
        },
        setDFeature: (state, action) => {
            state.dashboardFeature = action.payload.dashboardFeature;
        },
        setAccount: (state, action) =>{
            state.account = action.payload;
            state.isLoggedIn = true;
            const temp = {...state.account, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("account", JSON.stringify(temp));
            state.role = state.account.role
        },
        setRole: (state, action) =>{
            state.role = action.payload;
            // const temp = {...state.account, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("role", JSON.stringify(...state.role));
        },
        LogOut: (state, action) =>{
            state.account = [];
            state.profileData = [];
            state.isLoggedIn = false;
            state.dashboardMenuState = false;
            state.dashboardFeature = "dashboard";
            // localStorage.removeItem("account");
            localStorage.clear();
        },
        setAccountAfterRegister: (state, action) => {
            state.account = action.payload;
            state.isLoggedIn = false;
            const temp1 = {...state.account, "isLoggedIn": state.isLoggedIn};
            localStorage.setItem("account", JSON.stringify(temp1));
        },
    }
});

export const {setRole,setOpenDMenu, setCloseDMenu, setDFeature, setAccount, setAccountAfterRegister, LogOut} = DashboardSlice.actions;

export const dashboardMenuState = (state) => state.dashboard.dashboardMenuState;
export const dashboardFeature = (state) => state.dashboard.dashboardFeature;
export const isUserLoggedIn = (state) => state.dashboard.isLoggedIn;
export const selectAccount = (state) => state.dashboard.account;
export const selectProfileData = (state) => state.dashboard.profileData;
export const selectRole = (state) => state.dashboard.role;


export default DashboardSlice.reducer;