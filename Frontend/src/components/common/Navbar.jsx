import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logo from "../../assets/logox2.png";
import logo2 from "../../assets/logoX.png";

const Navbar = ({ heroapi }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [navstate, setNavState] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // State to track scrolling

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
      setScrolled(true); // Change logo on scroll
    } else {
      setNavState(false);
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onNavScroll);
    return () => {
      window.removeEventListener("scroll", onNavScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register/false");
  };
  const handelRegister = () => {
    navigate("/register/true");
  };
  const hC = () => {
    navigate("/login");
  };
  const hCi = () => {
    navigate("/register");
  };

  return (
    <header
      className={`${
        navstate ? "fixed bg-avocado/80 shadow-lg" : "absolute"
      } w-full top-0 z-50 transition-all duration-300`}
    >
      <nav className="flex justify-between items-center p-2 lg:px-10">
        <div className="flex flex-row gap-2 items-center mb-[1rem] mt-2">
          <img
            className="w-[12.5rem] sm:w-[12.5rem] transition-all duration-300"
            src={scrolled ? logo2 : logo}
            alt="logo"
          />
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-avocado flex items-center">
            Projects
          </a>
          <a href="#" className="text-gray-600 hover:text-avocado flex items-center">
            How It Works
          </a>
          <a href="#" className="text-gray-600 hover:text-avocado flex items-center">
            About Us
          </a>
          <a href="#" className="text-gray-600 hover:text-avocado flex items-center">
            Impact
          </a>
          <button className="px-4 py-2 text-gray-600 hover:text-avocado" onClick={hC}>
            Login
          </button>
          <button
            className="px-4 py-2 bg-[#1e2251] text-white rounded-md hover:bg-green-700"
            onClick={hCi}
          >
            Register
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${mobileMenuOpen ? "block" : "hidden"} lg:hidden bg-white shadow-lg absolute w-full z-40`}>
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link to="/" className={`${location.pathname === "/" ? "text-yellow" : "text-black"} font-bold hover:text-yellow`}>
            Home
          </Link>
          <Link to="/about" className={`${location.pathname === "/about" ? "text-yellow" : "text-black"} font-bold hover:text-yellow`}>
            About
          </Link>
          <Link to="/services" className={`${location.pathname === "/services" ? "text-yellow" : "text-black"} font-bold hover:text-yellow`}>
            Services
          </Link>
          <Link to="/contact" className={`${location.pathname === "/contact" ? "text-yellow" : "text-black"} font-bold hover:text-yellow`}>
            Contact
          </Link>
          <Link to="/login">
            <button className="bg-dark-blue border-none text-white px-4 rounded-3xl hover:bg-yellow">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
