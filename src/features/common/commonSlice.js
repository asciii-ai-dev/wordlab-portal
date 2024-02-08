import { createSlice } from "@reduxjs/toolkit";

const commonReducer = createSlice({
  name: "common",
  initialState: { visibleFeedback: false, defaultFeedbackVal: "" },
  reducers: {
    handleFeedbackForm: (state, action) => {
        state.defaultFeedbackVal = action.payload.type
        state.visibleFeedback = !state.visibleFeedback
    },
  },
});

export const { handleFeedbackForm } = commonReducer.actions;

export default commonReducer.reducer;
