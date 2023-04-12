import React, { useEffect, useState } from "react";
import SchoolNav from "./SchoolNav";
import "./school.css";
import axios from "axios";

import { useParams } from "react-router-dom";
import Tea_stu_card from "./Tea_stu_card";
import { Container } from "../Styled/Container.Styled";
import { Row } from "../Styled/Row.Styled";
import { Col } from "../Styled/Column.Styled";
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
      <SchoolNav />
      <Container>
        {Object.keys(school).length ? (
          <Row>
            <Col>
            <Row>
              <img
                className="school-img"
                src={
                  "https://assets-global.website-files.com/5ef5480befd392489dacf544/5f9f5e5943de7e69a1339242_5f44a7398c0cdf460857e744_img-image.jpeg"
                }
                alt="school"
              />
            </Row>
            <Row>
              <h2>{school_name}</h2>
            </Row>
            </Col>
       
          </Row>
        ) : (
          <h1>loading</h1>
        )}
        <Row className="student_teacher_card">
          <Col>
            <p>student</p>
            <Tea_stu_card data={students} />
          </Col>
          <Col>
            <p>teacher</p>
            <Tea_stu_card data={teachers} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default School;
