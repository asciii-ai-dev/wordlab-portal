import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      const userInfo = { user, token };
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      state.user = user;
      state.token = token
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authReducer.actions;

export default authReducer.reducer;
