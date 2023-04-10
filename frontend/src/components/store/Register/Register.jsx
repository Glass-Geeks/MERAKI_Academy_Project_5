import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const Register = () => {
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    user_image: "",
    dob: "",
  });
const [isLoading, setIsLoading] = useState(true)
  const { email, first_name, last_name, role, password, user_image, dob } = userData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    console.log({ ...userData, [name]: value })
  };

  const processFile = async (e) => {
    const CLOUD_NAME = "dvgnuchjw";
    const UNSIGNED_UPLOAD_PRESET = "ym3yv62c";
    const FETCH_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

    const files = document.querySelector("[type=file]").files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      const DATA = new FormData();

      DATA.append("file", file);
      DATA.append("cloud_name", CLOUD_NAME);
      DATA.append("upload_preset", UNSIGNED_UPLOAD_PRESET);

      let res = await fetch(FETCH_URL, {
        method: "post",
        mode: "cors",
        body: DATA,
      });

      let json = await res.json();
      setUserData({ ...userData, user_image: json.url });
      console.log("url :>> ", JSON.stringify(json.url));
      setIsLoading(false)
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const user= userData
    axios.post(`http://localhost:5000/users/register`,user)
    .then((result)=>{
      console.log(result)
    })
  };

  return (
    <>
      <div className="registerPage">
        <form className="registerForm" onSubmit={handleSubmit}>
          <div className="formContainer">
            <h1>Sign Up</h1>

            <p>Please fill in this form to create an account</p>

            <hr />

            <label>
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              value={first_name}
              onChange={handleInputChange}
            ></input>

            <label>
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              value={last_name}
              onChange={handleInputChange}
            ></input>

            <label>
              <b>Date of Birth</b>
            </label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleInputChange}
            ></input>

            <label>
              <b>Your Image</b>
            </label>
            <input type="file" name="user_image" onChange={processFile}></input>

            <label>
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={handleInputChange}
            ></input>

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleInputChange}
            ></input>

            <button type="submit" className="signupbtn" disabled={isLoading}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register


