import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getLocalStorageTheme = () => {
    const theme = localStorage.getItem("theme") || "cmyk"
    document.documentElement.setAttribute("data-theme", theme);
    return theme
}

// const getLocalUser = JSON.parse(localStorage.getItem("user")) || null;

const defaultState = {
   user: null,
   isSidebarOpen: true,
   theme: getLocalStorageTheme(),
}

const userSlice = createSlice({
    name: "user",
    initialState: defaultState,
    reducers: {
        getCurrentUser: (store, action) => {
            store.user = action.payload;
            // const {jwt, user} = action.payload
            // store.user = {token: jwt, ...user}
            // localStorage.setItem("user", JSON.stringify(store.user))
        },
        logoutUser: (store) => {
            store.user = null;
            // localStorage.removeItem("user")
            console.log("test");
            toast.success("You've been logged out.")
        },
        toggleTheme: (store) => {
            const newTheme = store.theme === "cmyk" ? "dracula" : "cmyk";
            store.theme = newTheme;
            document.documentElement.setAttribute("data-theme", store.theme)
            localStorage.setItem("theme", store.theme)
        },
        toggleSidebar: (store) => {
            store.isSidebarOpen = !store.isSidebarOpen;
        }
    }
})

export const {getCurrentUser, logoutUser, toggleTheme, toggleSidebar} = userSlice.actions
export default userSlice.reducer