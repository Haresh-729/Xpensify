import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    eventData: [],
    afterFetchEmpty: null,
    userByRoles: null,
};


const ProfileSlice = createSlice({
    initialState,
    name:  "event",
    reducers: {
        setProfileDetailsData: (state, action) => {
            state.eventData = action.payload;
            state.afterFetchEmpty = false;
        },
        deleteProfileDetailsData: (state, action) => {
            state.eventData = [];
        },
    }
});

export const {setProfileDetailsData, deleteProfileDetailsData} = EventSlice.actions;

export const getProfileData = (state) => state.event.eventData;
export const getAfterFetchEmpty = (state) => state.event.afterFetchEmpty;
export const getUsersByRole = (state) => state.event.userByRoles;

export default EventSlice.reducer;