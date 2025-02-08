import React, { useState, useEffect } from 'react';
import Features from './Features';
import Sidebar from '../utils/Sidebar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardMenuState, setCloseDMenu } from '../../app/DashboardSlice';
import NavBar from './NavBar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const ifDMenuState = useSelector(dashboardMenuState);

  const user = localStorage.getItem('user');

  return (
    <div className='w-full h-[98vh] bg-white flex flex-col '>
      <div className="w-full h-full shadow-lg shadow-[#F7CBBC] bg-white px-3">
        <Sidebar isOpen={ifDMenuState} className=""/>
        <NavBar />
        <Features />
      </div>
    </div>
  );
}

export default Dashboard;