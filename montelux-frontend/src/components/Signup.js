import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submitUser(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/users/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        alert("Sign up successful", response);
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign up error", error);
      });
  }

  return (
    <div className="d-flex justify-content-center align-items-center 100-w vh-100 bg-priamry">
      <div className="50-w p-5 rounded bg-white">
        <form onSubmit={submitUser}>
          <h3 className="text-center"> Sign up</h3>

          <div className="mb-2">
            <label htmlFor="username">User name</label>
            <input
              type="text"
              placeholder="Enter user name"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button className="btn btn-primary">Sign up</button>
          </div>

          <p className="text-end mt-2">
            Go To:
            <Link to="/" className="ms-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
