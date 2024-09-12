import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalServiceContext } from "../services/GlobalServiceContext";
import axios from "../services/jwtGlobalHandler";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateCurentUser } = useContext(GlobalServiceContext);
  const navigate = useNavigate();

  function submitUser(event) {
    event.preventDefault();
    const data = { email: email, password: password }
    axios.post("http://localhost:3000/api/users/login", data)
      .then((data) => {
        setEmail("");
        setPassword("");
        navigate("/events");
        updateCurentUser({ user_id: data.data.user_id, username: data.data.username, email: data.data.email }); 
      }).catch((error) => {
        console.error(error);
      });;
  }

  return (
    <div className="d-flex justify-content-center align-items-center 100-w vh-100 bg-priamry">
      <div className="50-w p-5 rounded bg-white">
        <form onSubmit={submitUser}>
          <h3 className="text-center"> Login</h3>

          <div className="mb-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              type="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </div>

          <p className="text-end mt-2">
            Go To:
            <Link to="/signup" className="ms-2">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
