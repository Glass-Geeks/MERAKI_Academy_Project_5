import React, { useEffect, useState } from "react";
import SchoolNav from "./SchoolNav";
import "./school.css";
import axios from "axios";

import { useParams } from "react-router-dom";
const School = () => {
  const { id } = useParams();
  const [school, setSchool] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const API_LINK = "http://localhost:5000";
const {establish_date,school_id,school_image,school_name} = school
  useEffect(() => {
    getSchoolById();
  }, []);
  const getSchoolById = async () => {
    const data = await axios.get(`${API_LINK}/schools/${id}`);
    const stuData = await axios.get(`${API_LINK}/users_schools/stu/${id}`);
    const teacherData = await axios.get(
      `${API_LINK}/users_schools/teacher/${id}`
    );
    setSchool([...data.data.school]);
    setStudents(stuData.data.result);
    setTeachers(teacherData.data.result);
  };
  console.log("school :>> ", school);
  console.log("school :>> ", teachers);
  console.log("school :>> ", students);
  return (
    <>
      <SchoolNav />
      <div>
        <img
          className="school-img"
          src="https://thumbs.dreamstime.com/b/high-school-building-26880366.jpg"
          alt="school"
        />
      </div>
      <div className="cards-stu-teacher"></div>
    </>
  );
};

export default School;
