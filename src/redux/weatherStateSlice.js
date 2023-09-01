import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   
}

export const weatherSlice = createSlice({
    name: "westherSlice",
    initialState,
    reducers: {

        loadWeatherRequest: (state) => {
            console.log("hi");
            state.loading = true;
        },
        loadWeatherSuccess: (state, action) => {
            state.loading = false;
            state.Weather = action.payload;
        },
        loadWeatherrFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default weatherSlice.reducer

export const { loadWeatherRequest, loadWeatherSuccess, loadWeatherrFail } = weatherSlice.actions