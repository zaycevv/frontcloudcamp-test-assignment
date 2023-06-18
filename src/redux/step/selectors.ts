import { RootState } from "../store";

export const selectStep = (state: RootState) => state.step.index;
