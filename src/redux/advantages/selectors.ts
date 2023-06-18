import { RootState } from "../store";

export const selectAdvantages = (state: RootState) =>
  state.advantages.advantages;
