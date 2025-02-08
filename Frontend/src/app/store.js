import { configureStore } from "@reduxjs/toolkit";
import DashboardSlice from "./DashboardSlice.js";
import ProfileSlice from "./ProfileSlice.js";
import PolicySlice from "./PolicySlice.js";

const Store = configureStore({
    reducer:{
        dashboard: DashboardSlice,
        profile: ProfileSlice,
        policy: PolicySlice,
        
    }
});

export default Store;