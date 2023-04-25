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
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (elem) => elem.user_id !== action.payload
      );
    },
    removeTeacher: (state, action) => {
      state.teachers = state.teachers.filter(
        (elem) => elem.user_id !== action.payload
      );
    },
    setSchools: (state, action) => {
      state.schools = action.payload
    },
    editSchool: (state, action) => {
      state.schools = state.schools.map(school => {
        if (school.School_Id === action.payload.School_Id) {
          return action.payload
        } else {
         return school
        }
      })
    }
  },

});

export const {
  getAllSchools,
  createNewSchool,
  setStudent,
  setTeacher,
  addStudent,
  addTeacher,
  removeStudent,
  removeTeacher,
  setSchools,
  editSchool
} = schoolSlice.actions;


export default schoolSlice.reducer;
