import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    policies: [],
    categories: [],
    loading: false,
    error: null,
};

const policySlice = createSlice({
    name: "policy",
    initialState,
    reducers: {
        setPolicies: (state, action) => {
            state.policies = action.payload;
        },
        addPolicy: (state, action) => {
            state.policies.push(action.payload);
        },
        deletePolicy: (state, action) => {
            state.policies = state.policies.filter(policy => policy.id !== action.payload);
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setPolicies, addPolicy, deletePolicy, setCategories, setLoading, setError } = policySlice.actions;
export default policySlice.reducer;
