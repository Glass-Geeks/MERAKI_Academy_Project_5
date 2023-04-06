import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "schools",
  initialState: {
    schools: [],
  },
  reducers: {
    getAllSchools: (state, action) => {
      state.schools = action.payload;
    },
    createNewSchool: (state, action) => {
      state.schools.push(action.payload);
    },
  },
});

export const { getAllSchools, createNewSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
