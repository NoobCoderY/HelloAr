import { configureStore } from "@reduxjs/toolkit"
import weatherReducer from "../redux/weatherStateSlice"

export const store = configureStore({
    reducer: weatherReducer
})