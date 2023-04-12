import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setUserId,
  setLogout,
  setUserName,
} from "../store/auth/index";
import axios from "axios";
const API_LINK = process.env.REACT_APP_API_LINK;

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      auth: state.auth,
    };
  });

  console.log(state);

  const login = async (e) => {
    e.preventDefault();
    const user = userData;
    try {
      const result = await axios.post(`${API_LINK}/users/login`, user);
      if (result.data) {
        console.log("result.data :>> ", result.data);
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setUserId(result.data.userId));
        dispatch(setUserName(result.data.first_name));

        navigate("/");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  return (
    <>
      <div className="Form">
        <p className="Title">Login:</p>
        <form onSubmit={login}>
          <br />

          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />
          <br />
          <button
            onClick={(e) => {
              login(e);
            }}
          >
            Login
          </button>
        </form>

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default Login;
