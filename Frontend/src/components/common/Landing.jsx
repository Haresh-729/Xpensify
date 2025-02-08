import React from "react";
import { motion } from "framer-motion";
import {
  FaSun,
  FaWind,
  FaChartBar,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

// import logo from "../../assets/logoX.png";
// import logo_text from "../../assets/logoX.png";

import logoW from "../../assets/logox.png"
import logo_text from "../../assets/logoX.png"
import solarDesert from "../../assets/landing/desertSolar.png";
import landing from "../../assets/landing/landing.png";
import coastalWind from "../../assets/landing/costalWind.png";
import rSOlar from "../../assets/landing/rsolar.png";
import solarFarm from "../../assets/landing/SolarFarm.png";
import maps from "../../assets/landing/maps.png";
import test1 from "../../assets/landing/test1.png";
import test2 from "../../assets/landing/test2.png";
import test3 from "../../assets/landing/test3.png";

import Navbar from "./Navbar";

const Landing = () => {
  const stats = [
    { value: "500+", label: "Projects Funded" },
    { value: "$50M+", label: "Total Raised" },
    { value: "100K+", label: "CO₂ Offset (tons)" },
  ];

  const features = [
    {
      icon: <FaSun className="w-12 h-12 text-avocado" />,
      title: "Invest in Renewable Energy",
      description:
        "Access carefully vetted renewable energy projects with potential returns of 5-15% annually.",
      link: "Learn more →",
    },
    {
      icon: <FaChartBar className="w-12 h-12 text-avocado" />,
      title: "Track Carbon Offset",
      description:
        "Monitor your environmental impact in real-time with our advanced carbon tracking dashboard.",
      link: "Learn more →",
    },
    {
      icon: <FaWind className="w-12 h-12 text-avocado" />,
      title: "AI Risk Assessment",
      description:
        "Our AI-powered system analyzes projects to provide you with comprehensive risk insights.",
      link: "Learn more →",
    },
  ];

  const projects = [
    {
      title: "Desert Sun Solar Farm",
      location: "Arizona, USA",
      investment: "$2.3M",
      co2: "1,200 t",
      return: "12%",
      image: solarDesert,
    },
    {
      title: "Highland Wind Park",
      location: "Scotland, UK",
      investment: "$3.6M",
      co2: "2,800 t",
      return: "9%",
      image: coastalWind,
    },
    {
      title: "Alpine Hydro Plant",
      location: "Norway",
      investment: "$1.9M",
      co2: "950 t",
      return: "11%",
      image: rSOlar,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Angel Investor",
      content:
        "ReGenest made it easy for me to diversify my portfolio while contributing to environmental sustainability.",
      avatar: test1,
    },
    {
      name: "David Chen",
      role: "Environmental Consultant",
      content:
        "The transparency and detailed project analysis helped me make informed investment decisions.",
      avatar: test2,
    },
    {
      name: "Emma Williams",
      role: "Tech Entrepreneur",
      content:
        "I'm impressed by the professional approach and the consistent returns on my investments.",
      avatar: test3,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white scrollbar-hide">
      {/* Navigation */}
      <Navbar/>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16 grid grid-cols-2 gap-8"
      >
        <div className="space-y-6 flex flex-col justify-end">
          <h1 className="text-5xl font-bold">AI-Powered Expense Tracking, Fraud-Free Financials</h1>
          <p className="text-xl text-gray-600">
            Join thousands of investors funding renewable energy projects
            worldwide. Make a profit while making a difference.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-avocado text-white rounded-md text-lg hover:bg-green-700"
          >
            Get Started
          </motion.button>
          <div className="grid grid-cols-3 gap-8 pt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-2xl font-bold text-avocado">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            // src={solarFarm}
            src={landing}
            alt="Solar Farm"
            className="rounded-2xl object-cover  mt-6"
          />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose ReGenest
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 space-y-4"
              >
                <div>{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <a href="#" className="text-avocado hover:text-green-700">
                  {feature.link}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Global Impact
          </h2>
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img src={maps} alt="Map" className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold mb-4">Active Projects</h3>
              {projects.map((project, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-avocado" />
                  <span className="text-sm">
                    {project.title}, {project.location}
                  </span>
                  <span className="text-sm text-gray-600">
                    ${project.investment} Raised
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.location}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="font-semibold">{project.investment}</div>
                      <div className="text-sm text-gray-600">Raised</div>
                    </div>
                    <div>
                      <div className="font-semibold">{project.co2}</div>
                      <div className="text-sm text-gray-600">CO₂ Offset</div>
                    </div>
                    <div>
                      <div className="font-semibold">{project.return}</div>
                      <div className="text-sm text-gray-600">Return</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Investors Say
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-xl bg-gray-50"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Stay Updated</h2>
          <p className="text-gray-600 mb-8">
            Get the latest updates on new projects and investment opportunities
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-avocado"
            />
            <button className="px-6 py-2 bg-avocado text-white rounded-r-md hover:bg-green-700">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex flex-row gap-2 items-center mb-[1rem] px-2">
                <img
                  className={`w-[2rem] sm:w-[2.5rem]`}
                  src={logoW}
                  alt="logo"
                />
                <img className={`h-[1.8rem]`}  alt="logo" />
              </div>
              <p className="text-gray-400">
                Making renewable energy investment accessible to everyone.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  How it Works
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Projects
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Impact Report
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Help Center
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Blog
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  FAQs
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaMapMarkerAlt className="w-4 h-4 text-yellow" />
                  <span>123 Green Street, New York, NY 10001</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaEnvelope className="w-4 h-4" />
                  <span>contact@regenest.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <FaPhone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FaGithub className="w-5 h-5" />
                </a>
              </div>
              <div className="text-gray-400">
                © 2024 ReGenest. All rights reserved.
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end m-2 px-3">
            <p className="text-sm text-center lg:text-left lg:mb-0">
                Made with ❤️ by <a href="https://github.com/haresh-729" className="text-yellow">Git_win_it</a>
            </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
