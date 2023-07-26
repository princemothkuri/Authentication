import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value = true;
    },
    decrement: (state) => {
      state.value = false;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
