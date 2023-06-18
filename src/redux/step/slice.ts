import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StepSliceState } from "./types";

const initialState: StepSliceState = {
  index: 0,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.index = action.payload;
    },
  },
});

export const { setStep } = stepSlice.actions;

export default stepSlice.reducer;
