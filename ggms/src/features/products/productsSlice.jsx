import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isGrid: true
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        getProducts: (store, action) => {

        },
        layoutGrid: (store) => {
            store.isGrid = true
        },
        layoutList: (store) => {
            store.isGrid = false
        }
    }
})

export const {getProducts, layoutGrid, layoutList} = productsSlice.actions
export default productsSlice.reducer