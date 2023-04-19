import { createSlice } from "@reduxjs/toolkit";

export const connectionSlice = createSlice({
  name: "auth",
  initialState: {
    friends: [],
    requested: [],
    received: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFriend: (state, action) => {
      state.friends = state.friends.filter((elem) => elem != action.payload);
    },
    setRequested: (state, action) => {
      state.requested = action.payload;
    },
    addRequested: (state, action) => {
      state.requested.push(action.payload);
    },
    removeRequested: (state, action) => {
      state.requested = state.requested.filter(
        (elem) => elem != action.payload
      );
    },
    setReceived: (state, action) => {
      state.received = action.payload;
    },
    addReceived: (state, action) => {
      state.received.push(action.payload);
    },
    removeReceived: (state, action) => {
      state.received = state.received.filter((elem) => elem != action.payload);
    },
  },
});

export const {
  setFriends,
  addFriend,
  removeFriend,
  setRequested,
  addRequested,
  removeRequested,
  setReceived,
  addReceived,
  removeReceived,
} = connectionSlice.actions;
export default connectionSlice.reducer;
