import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import tasksReducer from "./taskSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: tasksReducer
    },
})