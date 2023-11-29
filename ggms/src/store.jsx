import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice"
import productsReducer from "./features/products/productsSlice"
import filterReducer from "./features/filter/filterSlice"
import userReducer from "./features/user/userSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
        filter: filterReducer,
        user: userReducer
    }
})