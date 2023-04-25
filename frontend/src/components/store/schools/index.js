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
    setSchools: (state, action) => {
      state.schools = action.payload
    },
    editSchool: (state, action) => {
      for (let index = 0; index < state.schools.length; index++) {
        const element = state.schools[index];
        if (element.school_id = action.payload.school_id) {
          state.schools[index] = action.payload
        }
      }
    }
  },
});

export const { getAllSchools, createNewSchool, setSchools,editSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
