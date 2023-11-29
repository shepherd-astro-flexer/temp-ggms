import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const getCartItems = localStorage.getItem("cartItems")

const initialState = {
  cartItems: getCartItems ? JSON.parse(getCartItems) : [],
  prices: {
    total: 0,
    amount: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0
  }
};

// ! remember that what we return inside of a reducer will be the NEW state, so if we return nothing, then that will be the new state value
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (store, action) => {
      const { cartID, amount } = action.payload;
      const findCartItem = store.cartItems.find(
        (product) => product.cartID === cartID
      );

      if (findCartItem) {
        store.cartItems = store.cartItems.map((product) => {
          return product.cartID === cartID
            ? { ...product, amount: product.amount + amount }
            : product;
        });
      } else {
        store.cartItems = [...store.cartItems, action.payload];
      }
    },
    removeCartItem: (store, action) => {
      const cartID = action.payload

      store.cartItems = store.cartItems.filter(item => {
        return item.cartID !== cartID
      })
      toast.error("Item removed from cart")
    },
    updateCartItemAmount: (store, action) => {
      const {id, amount} = action.payload

      store.cartItems = store.cartItems.map(item => {
          
        return id === item.cartID ? {...item, amount,  optionsAmount: amount + 5} : item
      })
      toast.success("Cart updated")
    },
    updateTotalAmount: (store) => {
      const {total, amount} = store.cartItems.reduce((accu, currItem) => {
        accu.total += parseInt(currItem.price) * currItem.amount
        accu.amount += currItem.amount
        
        return accu
      }, {total: 0, amount: 0})
      store.prices.total = total;
      store.prices.amount = amount;
      store.prices.tax = total / 10
      store.prices.orderTotal = store.prices.shipping + total + total / 10
    },
    clearCart: (store) => {
      store.cartItems = []
      localStorage.removeItem("cartItems");
    }
  }
});

export const { addCartItem, removeCartItem, updateCartItemAmount, updateTotalAmount, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
