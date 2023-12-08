import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {
        query: {
            search: "",
            sort: "a-z"
        },
        attendees: [],
        clients: [],
        currentPage: 1,
        numberOfPages: 0,
        totalJobs: 0
    }
}

const clientSlice = createSlice({
    name: "client",
    initialState,
    reducers: {
        getData: (store, action) => {
            store.data = action.payload
        }
    }
})

export const {getData} = clientSlice.actions;
export default clientSlice.reducer;