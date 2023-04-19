import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "schools",
  initialState: {
    schools: [],
    students: [],
    teachers: [],
  },
  reducers: {
    getAllSchools: (state, action) => {
      state.schools = action.payload;
    },
    createNewSchool: (state, action) => {
      state.schools.push(action.payload);
    },
    setStudent: (state, action) => {
      state.students = action.payload;
    },
    setTeacher: (state, action) => {
      state.teachers = action.payload;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
  },
});

export const {
  getAllSchools,
  createNewSchool,
  setStudent,
  setTeacher,
  addStudent,
  addTeacher,
} = schoolSlice.actions;

export default schoolSlice.reducer;
