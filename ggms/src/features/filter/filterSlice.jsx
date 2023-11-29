import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filtersCart: [],
    allProductsCart: [],
    min: 0,
    max: 100000,
    filters: {
        search: "",
        category: "all",
        company: "all",
        sort: "high",
        price: 100000,
        shipping: false
    }
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        changePrice: (store, action) => {
            const price = action.payload
            store.filters = {...store.filters, price}
        },
        getCartItems: (store, action) => {
            store.filtersCart = action.payload;
            store.allProductsCart = action.payload
        },
        resetPrice: (store) => {
            store.filters.price = 100000
        }
    }
})

export const {changePrice, getCartItems, resetPrice} = filterSlice.actions
export default filterSlice.reducer;