import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const friendSlice = createSlice({
  name: "friends",
  initialState: {
    allFriends: [],
    friendRequests: [],
  },
  reducers: {
    setAllFriends: (state, action) => {
      state.allFriends = action.payload;
    },
    setAllFriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
  },
});

export const { setAllFriends, setAllFriendRequests } = friendSlice.actions;

export default friendSlice.reducer;
