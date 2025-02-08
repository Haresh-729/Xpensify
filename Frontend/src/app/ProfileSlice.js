import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    profileData: [],
    afterFetchEmpty: null,
    userByRoles: null,
};


const ProfileSlice = createSlice({
    initialState,
    name:  "profile",
    reducers: {
        setProfileDetailsData: (state, action) => {
            state.profileData = action.payload;
            state.afterFetchEmpty = false;
        },
        deleteProfileDetailsData: (state, action) => {
            state.profileData = [];
        },
        setAfterFetchStatus: (state, action) => {
            state.afterFetchEmpty = action.payload.afterFetchStatus;
        },
        setUsersByRole: (state, action) => {
            state.userByRoles = action.payload;
        }
    }
});

export const {setProfileDetailsData, deleteProfileDetailsData, setAfterFetchStatus, setUsersByRole} = ProfileSlice.actions;

export const getProfileData = (state) => state.profile.profileData;
export const getAfterFetchEmpty = (state) => state.profile.afterFetchEmpty;
export const getUsersByRole = (state) => state.profile.userByRoles;

export default ProfileSlice.reducer;