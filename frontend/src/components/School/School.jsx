import React, { useEffect, useState } from "react";
import SchoolNav from "./SchoolNav";
import "./school.css";
import axios from "axios";

import { useParams } from "react-router-dom";
import Tea_stu_card from "./Tea_stu_card";
const School = () => {
  const { id } = useParams();
  const [school, setSchool] = useState({});
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const API_LINK = "http://localhost:5000";
  const { establish_date, school_image, school_name } = school;
  useEffect(() => {
    getSchoolById();
  }, []);
  const getSchoolById = async () => {
    const data = await axios.get(`${API_LINK}/schools/${id}`);
    const stuData = await axios.get(`${API_LINK}/users_schools/stu/${id}`);
    const teacherData = await axios.get(
      `${API_LINK}/users_schools/teacher/${id}`
    );
    setSchool({ ...data.data.school[0] });
    setStudents(stuData.data.result);
    setTeachers(teacherData.data.result);
  };
  console.log("school :>> ", school);
  console.log("school :>> ", teachers);
  console.log("school :>> ", students);
  console.log(typeof establish_date);
  return (
    <>
      {Object.keys(school).length ? (
        <>
          <SchoolNav />
          <div>
            <img className="school-img" src={school_image} alt="school" />
            <h2>{school_name}</h2>
            <p>{""}</p>
          </div>
          <div className="cards-stu-teacher"></div>
        </>
      ) : (
        <h1>loading</h1>
      )}
      <div className="scroll-data">
        <div className="student-scroll">
          <p>student</p>
          <Tea_stu_card data={students} />
        </div>
        <div className="teacher-scroll">
          <p>teacher</p>
          <Tea_stu_card data={teachers} />
        </div>
      </div>
    </>
  );
};

export default School;
