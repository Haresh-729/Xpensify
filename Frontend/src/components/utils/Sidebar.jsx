// import React from "react";
// import {
//   HomeIcon,
//   BuildingStorefrontIcon,
//   ChevronDoubleLeftIcon,
// } from "@heroicons/react/24/solid";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   dashboardFeature,
//   dashboardMenuState,
//   setCloseDMenu,
//   setDFeature,
//   selectRole,
// } from "../../app/DashboardSlice.js";

// import { features } from "../../data/dynamic.js";

// const Sidebar = ({ isOpen }) => {
//   const dispatch = useDispatch();
//   const ifDMenuState = useSelector(dashboardMenuState);
//   const DFeatureState = useSelector(dashboardFeature);
//   const role = useSelector(selectRole);
//   console.log("User Role From Sidebar: ", role);
//   const onCartToggler = () => {
//     dispatch(
//       setCloseDMenu({
//         dashboardMenuState: !ifDMenuState,
//       })
//     );
//   };
//   const chnageFeatutre = (feature) => {
//     dispatch(
//       setDFeature({
//         dashboardFeature: feature,
//       })
//     );
//   };

//   //   const chnageSubFeature = () => {
//   //     dispatch(setSubFeature({
//   //       subFeature: "home",
//   //   }))
//   // }

//   return (
//     <>
//       <div
//         id="sidebar"
//         className={`${
//           isOpen ? "visible" : "invisible"
//         } z-50 flex flex-row transition-all duration-300 cursor-pointer w-[98%] md:flex-col md:w-[15%] gap-4 items-center justify-center md:items-start md:justify-start px-4 py-2 border-yellow shadow-2xl rounded-2xl  absolute bottom-10 md:top-20 bg-dark-blue text-white`}
//       >
//         <div
//           className={`flex flex-row w-full items-center justify-end invisible ${
//             isOpen ? "md:visible" : "md:invisible"
//           }`}
//         >
//           <ChevronDoubleLeftIcon
//             onClick={onCartToggler}
//             className="icon-style-dash w-[1.54rem] h-[1.54rem] font-bold text-white"
//           />
//         </div>
//         {features.map(
//           (items, index) =>
//             items.allowedRoles.includes(role) && (
//               <div
//                 key={index}
//                 className={`flex flex-col md:flex-row md:w-full hover:bg-yellow md:py-2 md:pl-1 items-center justify-items-center rounded-xl ${
//                   DFeatureState == items.featureName &&
//                   "bg-yellow text-dark-blue"
//                 }`}
//                 onClick={() => {
//                   chnageFeatutre(items.featureName);
//                 }}
//               >
//                 <items.logoUsed
//                   className={`icon-style-dash w-[1.54rem] h-[1.54rem] ${
//                     DFeatureState == items.featureName
//                       ? "border-dark-blue"
//                       : "text-white"
//                   }`}
//                 />
//                 <span className="text-sm font-poppins font-bold rounded-xl px-2">
//                   {items.displayName}
//                 </span>
//               </div>
//             )
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { ChevronDoubleLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardFeature,
  dashboardMenuState,
  setCloseDMenu,
  setDFeature,
  selectRole,
} from "../../app/DashboardSlice.js";
import { features } from "../../data/dynamic.js";

import logo from "../../assets/regenest.png";
import logo_text from "../../assets/ReGenest_text.png";

const Sidebar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const ifDMenuState = useSelector(dashboardMenuState);
  const DFeatureState = useSelector(dashboardFeature);
  const role = useSelector(selectRole);

  const onCartToggler = () => {
    dispatch(
      setCloseDMenu({
        dashboardMenuState: !ifDMenuState,
      })
    );
  };

  const changeFeature = (feature) => {
    dispatch(
      setDFeature({
        dashboardFeature: feature,
      })
    );
  };

  return (
    <div
      className={`
        fixed  h-[97vh]
        ${isOpen ? "visible" : "invisible"}
        transition-all duration-300 ease-in-out
        ${isHovered ? "w-64" : "w-16"}
        bg-dark-blue text-white
        flex flex-col gap-4
        shadow-lg
        z-50
        top-2
        rounded
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <XMarkIcon
          className={`absolute right-0 w-6 h-6 cursor-pointer text-white hover:text-yellow ${isHovered ? "opacity-100" : "opacity-0 w-0"}`}
          onClick={onCartToggler}
        />

        <div className="flex flex-row gap-2 items-center mb-[1rem] pt-3 px-2">
          <img className={`w-[2rem] sm:w-[2.5rem]`} src={logo} alt="logo" onClick={() => {onMenuToggle()}}/>
          <img className={`h-[1.8rem] ${isHovered ? "opacity-100" : "opacity-0 w-0"}`} src={logo_text} alt="logo"/>
        </div>
      <div className="flex flex-col gap-2 px-2">
        {features.map((item, index) => 
          item.allowedRoles.includes(role) && (
            <div
              key={index}
              className={`
                flex items-center
                cursor-pointer rounded-xl
                transition-all duration-200
                ${isHovered ? "px-4" : " px-2"}
                ${DFeatureState === item.featureName 
                  ? "bg-yellow text-dark-blue" 
                  : "hover:bg-yellow/20"
                }
                h-12
              `}
              onClick={() => changeFeature(item.featureName)}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <item.logoUsed 
                  className={`
                    w-6 h-6
                    ${DFeatureState === item.featureName 
                      ? "text-dark-blue" 
                      : "text-white"
                    }
                  `}
                />
              </div>
              <span className={`
                ml-4 whitespace-nowrap font-medium
                transition-opacity duration-200
                ${isHovered ? "opacity-100" : "opacity-0 w-0"}
              `}>
                {item.displayName}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;