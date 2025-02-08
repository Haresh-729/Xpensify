import React, { useState } from "react";

const TabCard = ({ tabs, activeTab, onTabChange, content, onPreview }) => {
  const [formDataState, setFormDataState] = useState(
    content.reduce((acc, curr) => {
      acc[curr.tab] = {}; // Create an empty object for each tab
      curr.sections.forEach((section) => {
        section.rows.forEach((row) => {
          row.cols.forEach((col) => {
            acc[curr.tab][col.label] = ""; // Initialize fields to empty strings
          });
        });
      });
      return acc;
    }, {})
  );
  const handleInputChange = (tab, label, value) => {
    setFormDataState((prevState) => ({
      ...prevState,
      [tab]: {
        ...prevState[tab],
        [label]: value,
      },
    }));
  };
  const handleButtonClick = (action) => {
    if (action === "Preview") {
      console.log("Preview Data:", formDataState[activeTab]);
      onPreview(formDataState[activeTab]);
    //   setFormDataState(content.reduce((acc, curr) => {
    //     acc[curr.tab] = {}; // Create an empty object for each tab
    //     curr.sections.forEach((section) => {
    //       section.rows.forEach((row) => {
    //         row.cols.forEach((col) => {
    //           acc[curr.tab][col.label] = ""; // Initialize fields to empty strings
    //         });
    //       });
    //     });
    //     return acc;
    //   }, {})) 
    }
  };

  const contentForTab = content.reduce((acc, tabData) => {
    const { tab, sections, buttons } = tabData;
    acc[tab] = (
      <>
        {sections.map((section, sectionIndex) => (
          <div key={`section-${sectionIndex}`}>
            {/* Section Subheading */}
            <div className="flex flex-row items-center">
              <h3 className="text-avocado font-bold mb-2 w-1/3">
                {section.subHeading}
              </h3>
              <hr className="border-avocado w-full border-[.2rem]" />
            </div>

            {/* Rows within a section */}
            {section.rows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`grid grid-cols-${row.colNos} sm:grid-cols-${row.smColNos} gap-4 mb-6`}
              >
                {row.cols.map((col, colIndex) => {
                  const { label, placeholder, element, type, options } = col;
                  return (
                    <div key={`col-${colIndex}`}>
                      <p className="selectHeader">{label}</p>
                      {element === "input" && (
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={formDataState[activeTab][col.label] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              activeTab,
                              col.label,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg p-3 bg-light-gray text-superiory-blue placeholder-superiory-blue"
                        />
                      )}
                      {element === "select" && (
                        <select
                          value={formDataState[activeTab][col.label] || ""}
                          onChange={(e) =>
                            handleInputChange(
                              activeTab,
                              col.label,
                              e.target.value
                            )
                          }
                          className="w-full border rounded-lg p-3 bg-light-gray text-superiory-blue"
                        >
                          {options.map((option, optionIndex) => (
                            <option key={optionIndex}>{option}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ))}
        {/* Buttons */}
        <div className="flex items-center justify-center w-full gap-4 pt-[2rem]">
          {buttons.map((button, buttonIndex) => (
            <button
              key={`button-${buttonIndex}`}
              className={button.styling}
              onClick={() => handleButtonClick(button.text)}
            >
              {button.text}
            </button>
          ))}
        </div>
      </>
    );

    return acc;
  }, {});

  return (
    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-8xl mx-auto my-6 p-6 h-[calc(100vh-150px)]">
      {/* Tabs Navigation as Bookmarks */}
      <div className="flex flex-col md:flex-row gap-2 justify-center space-x-4 relative mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(tab)}
            className={`w-full relative px-4 py-3 rounded-tl-lg text-center font-semibold text-dark-blue transition-all ${
              activeTab === tab
                ? "bg-yellow border-none "
                : "bg-gray-200 border-none"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Close Button */}
      <button className="flex flex-row items-center justify-center absolute top-4 right-4 text-red bg-white w-[2rem] h-[2rem] text-2xl font-bold">
        &times;
      </button>

      {/* Dynamic Content */}
      <div className="border border-gray-200 rounded-lg p-6 overflow-y-auto max-h-[calc(100vh-280px)] scrollbar-hide">
        {contentForTab[activeTab]}
      </div>
    </div>
  );
};

export default TabCard;
