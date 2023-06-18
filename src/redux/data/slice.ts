import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepSliceState } from "./types";

const initialState: StepSliceState = {
  data: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData(state, action: PayloadAction) {
      // state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;
