import { register } from "../../services/repository/userRepo";
import { useState } from "react";
import loginAnimation from "../../assets/Login.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Video from '../protected/All/Video';
import video from "../../assets/LocoCraft.mp4";
import mockup from "../../assets/lp_mockup3.jpg";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const Register = () => {
  const [name, setName] = useState("");
  const [email_id, setEmail_id] = useState("");
  const [role_id, setRole_id] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleRegister(event) {
    event.preventDefault();
    dispatch(register(name, email_id, role_id, password, mobile, navigate));
  }

  return (
    <div className="flex flex-col items-center w-screen bg-white">
      <div className="flex w-full items-center p-[1rem] justify-start cursor-pointer">
        <div onClick={()=>{navigate("/");}} className="hover:shadow-sm hover:shadow-avocado hover:scale-105 transition-all flex flex-row items-center justify-center rounded-[2rem] border-[.1rem] border-avocado px-2 gap-1">
          <ArrowLeftIcon className="text-avocado w-[1.2rem] font-bold" />
          <p className="font-bold select-none">Back</p>
        </div>
      </div>
      <div className="flex flex-row w-full justify-evenly">
        <div className="w-1.1/3 h- mt-[3rem] hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-3xl mx-auto">
            {/* Background Image */}
            <img src={mockup} alt="Laptop Mockup" className="w-full" />

            {/* Video Overlay */}
            <div className="absolute top-[9%] left-[16.5%] w-[67.5%] h-[73.5%] overflow-fill">
              {/* <Video/> */}
              <video
                className="w-full h-full object-fill"
                autoPlay
                loop
                muted
                controls={false}
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {/* <img src={`${loginAnimation}?${new Date().getTime()}`} alt="Login" width="400" className="mx-auto" /> */}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-2/5">
          <h2 className="text-3xl font-bold mb-6 text-center text-dark-blue">
            Create Account
          </h2>

          {/* Form */}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-dark-blue font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-light-gray border-none px-4 py-2 rounded-lg focus:ring focus:ring-dark-blue text-superiory-blue placeholder-superiory-blue"
                placeholder="Your Name"
              />
            </div>

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
                value={email_id}
                onChange={(e) => setEmail_id(e.target.value)}
                className="w-full bg-light-gray border-none px-4 py-2 rounded-lg focus:ring focus:ring-dark-blue text-superiory-blue placeholder-superiory-blue"
                placeholder="you@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-dark-blue font-bold mb-2"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-light-gray border-none px-4 py-2 rounded-lg focus:ring focus:ring-dark-blue text-superiory-blue placeholder-superiory-blue"
                placeholder="9930112982"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-dark-blue font-bold mb-2"
              >
                Role
              </label>
              <select
                id="role"
                type="integer"
                value={role_id}
                onChange={(e) => setRole_id(e.target.value)}
                className="w-full bg-white border-none px-4 py-2 rounded-xl focus:ring focus:ring-dark-blue text-superiory-blue"
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="1">Manager</option>
                <option value="2">Finance</option>
                <option value="3">employee</option>

              </select>
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
                type="submit"
                className="bg-dark-blue text-white font-bold border-none w-full py-2 px-8 mt-5 rounded-[5rem] hover:bg-yellow hover:text-dark-blue transition"
              >
                Register
              </button>
              <div className="text-black mt-2">
                Already have an Account?
                <Link
                  to="/login"
                  className="text-dark-blue font-bold hover:underline"
                >
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
