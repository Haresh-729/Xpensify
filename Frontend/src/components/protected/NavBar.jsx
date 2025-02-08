import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardMenuState,
  LogOut,
  selectAccount,
  setCloseDMenu,
  setDFeature,
} from "../../app/DashboardSlice";
import {
  Bars4Icon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

import logo from "../../assets/logo.svg";
import profile from "../../assets/profileicon.jpg";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ifDMenuState = useSelector(dashboardMenuState);
  const acc = useSelector(selectAccount);

  const onMenuToggle = () => {
    dispatch(
      setCloseDMenu({
        dashboardMenuState: !ifDMenuState,
      })
    );
  };
  const handlefeature = (feature) => {
    dispatch(
      setDFeature({
        dashboardFeature: feature,
      })
    );
  };
  const logout = () => {
    dispatch(LogOut());
    navigate("/");
  }

  return (
    <div className=" flex w-full sticky top-0 z-40 bg-[#ffffff] drop-shadow-xl h-[4rem]">
      <div className="flex w-full px-[1rem] justify-between items-center ">
        <div
          className={`flex items-center  ${ifDMenuState ? "pl-[3rem]" : ""}`}
        >
          <Bars4Icon
            className="w-10 h-8 text-black"
            onClick={() => {
              onMenuToggle();
            }}
          />
        </div>
        <div className="flex items-center ">
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
        <div className="flex flex-row w-[100%] place-content-end items-center ">
          <div className="flex flex-row w-auto mx-[.6rem] ">
            <div className="flex items-center w-auto py-2 px-1 shadow-xl rounded-2xl border-dark-blue border-[.1rem]">
              <img
                className="w-[2rem] rounded-"
                src={acc.avatar ? acc.avatar : profile}
                alt="profile"
              />
              <div className="flex flex-col items-start justify-center px-1">
                <h1 className="text-sm font-bold text-avocado hidden sm:flex">
                  {acc.uname}{" "}
                </h1>
                <h1 className="text-sm font-bold text-yellow hidden sm:flex capitalize">
                  {acc.role}{" "}
                </h1>

              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-1 cursor-pointer" onClick={logout}>
        <ArrowRightStartOnRectangleIcon className="w-[3rem] text-madder rounded-xl" />
        </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
