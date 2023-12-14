import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const getLocalStorageTheme = () => {
    const theme = localStorage.getItem("theme") || "corporate"
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
            toast.success("You've been logged out.")
        },
        toggleTheme: (store) => {
            const newTheme = store.theme === "corporate" ? "business" : "corporate";
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