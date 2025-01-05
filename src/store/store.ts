import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../utils/userOperations";

export const store = configureStore({
    reducer: {
        users: useReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;