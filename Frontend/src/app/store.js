import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "./DashboardSlice.js";
import ProfileSlice from "./ProfileSlice.js";


const Store = configureStore({
    reducer:{
        dashboard: DashboardSlice,
        profile: ProfileSlice,
        
    }
});

export default Store;