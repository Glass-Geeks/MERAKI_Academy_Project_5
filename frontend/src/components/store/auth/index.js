import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage.getItem("token")) || null,
    userId: JSON.parse(localStorage.getItem("userId")) || null,
    userName: JSON.parse(localStorage.getItem("userName")) || null,
    role: JSON.parse(localStorage.getItem("role")) || null,
    isLoggedIn: JSON.parse(localStorage.getItem("token")) ? true : false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", JSON.stringify(action.payload));
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", JSON.stringify(action.payload));
    },
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      state.token = null;
      state.userId = null;
      state.userName = null;
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },
});

export const { setLogin, setUserId, setLogout, setUserName, setRole } =
  authSlice.actions;
export default authSlice.reducer;
