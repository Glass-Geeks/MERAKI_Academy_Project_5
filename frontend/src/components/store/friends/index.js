import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
  name: "schools",
  initialState: {
    friends: [],
  },
  reducers: {
    getAllFriends: (state, action) => {
      state.schools = action.payload;
    },
  },
});

export const { getAllFriends } = friendSlice.actions;

export default friendSlice.reducer;
