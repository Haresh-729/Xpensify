import React, { useState } from "react";
import loginAnimation from "../../assets/login.svg";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/repository/userRepo";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setAccount } from '../app/DashboardSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogin(event) {
    event.preventDefault();
    dispatch(login(email, password, navigate));
  }

  return (
    <div className="flex justify-evenly items-center min-h-screen bg-gray-50">
      <div className="w-1/2 mt-[3rem] hidden md:flex justify-center items-center">
        <img
          src={`${loginAnimation}?${new Date().getTime()}`}
          alt="Login"
          width="400"
          className="mx-auto"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-2/5">
        <h2 className="text-3xl font-bold mb-6 text-center text-dark-blue">
          Login to your Account
        </h2>
        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-dark-blue font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email} // Update state name for clarity
              onChange={(e) => setEmail(e.target.value)} // Update to setEmail
              className="w-full bg-light-gray border-none px-4 py-2 rounded-lg focus:ring focus:ring-dark-blue text-superiory-blue placeholder-superiory-blue"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-dark-blue font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-light-gray border-none px-4 py-2 rounded-lg focus:ring focus:ring-dark-blue text-superiory-blue placeholder-superiory-blue"
              placeholder="********"
            />
          </div>

          <div className="flex flex-col items-center">
            <button
              type="submit" // Changed to "submit" for form submission
              className="bg-dark-blue text-white font-bold border-none w-full py-2 px-8 mt-5 rounded-[5rem] hover:bg-yellow hover:text-dark-blue transition"
            >
              LogIn
            </button>
            <div className="text-black mt-2">
              Don't have an Account?
              <Link
                to="/register"
                className="text-dark-blue font-bold hover:underline"
              >
                {" "}
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
