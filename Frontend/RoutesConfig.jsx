import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import {  useSelector } from 'react-redux';

import { Error, Dashboard, Login, Landing, Register } from './src/components';
import  PolicyManager  from './src/components/protected/finance/PolicyManager';
import { isUserLoggedIn } from './src/app/DashboardSlice';
import { VerifyEmail } from './src/components';
import { Navbar } from './src/components';
import CreateEvents from './src/components/protected/finance/CreateEvents';
import ScanBill from './src/components/protected/all/ScanBill';
import AllBills from './src/components/protected/all/Reports';
// import AddHospital from './src/components/protected/admin/AddHospital';


const RoutesConfig = () => {
  const isLoggedIn = useSelector(isUserLoggedIn);
  return (
    <Routes>
      <Route
        path="/"
        className="transition-all scrollbar-hide"
        element={[<Landing />]}
      />
      <Route path="*" element={<Error />} />
      {/* <Route path='/AddHospital' element={<AddHospital/>}/> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={[<Register />]} />
      <Route path="/verify_Email" element={<VerifyEmail />} />
      {isLoggedIn && (
        <Route
          path="/Dashboard"
          className="transition-all scrollbar-hide"
          element={<Dashboard />}
        />
      )}
      <Route path="/scan-bill" element={<ScanBill />} />
      <Route path="/all-bills" element={<AllBills />} />
      <Route path="/report" element={<AllBills />} />
      <Route path="/create_events" element={<CreateEvents />} />
    </Routes>
  );
}

export default RoutesConfig