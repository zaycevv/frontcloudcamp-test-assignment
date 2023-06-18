import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvantagesSliceState, AdvantageType } from "./types";

const initialState: AdvantagesSliceState = {
  advantages: [
    { id: "1", title: "" },
    { id: "2", title: "" },
    { id: "3", title: "" },
  ],
};

const advantagesSlice = createSlice({
  name: "advantages",
  initialState,
  reducers: {
    setAdvanateges(state, action: PayloadAction<AdvantageType[]>) {
      state.advantages = action.payload;
    },
    addAdvantage(state, action: PayloadAction<AdvantageType>) {
      state.advantages.push(action.payload);
    },
    updateAdvantage: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const index = state.advantages.findIndex(
        (adv) => adv.id === action.payload.id
      );
      state.advantages[index].title = action.payload.title;
    },
    removeAdvantage(state, action: PayloadAction<string>) {
      state.advantages = state.advantages.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearAdvantages: () => {
      return initialState;
    },
  },
});

export const {
  setAdvanateges,
  addAdvantage,
  updateAdvantage,
  removeAdvantage,
  clearAdvantages,
} = advantagesSlice.actions;

export default advantagesSlice.reducer;
