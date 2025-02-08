import React, { useState } from "react";
import DynamicCard from "../../utils/TabCard";
import { CalendarDaysIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
const tabs = ["Add Hospital", "Create Admin"];

const AddHospital = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const formData = [
    {
      tab: "Add Hospital",
      sections: [
        {
          subHeading: "General Information",
          rows: [
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "Hospital Name:",
                  placeholder: "Enter Hospital Name...",
                  element: "input",
                  type: "text",
                },
                {
                  label: "Registration No.:",
                  placeholder: "Enter Registration No...",
                  element: "input",
                  type: "text",
                },
                {
                  label: "Type:",
                  placeholder: "Select Type...",
                  element: "select",
                  options: ["General", "Specialized", "Trauma"],
                },
              ],
            },
            {
              colNos: 1,
              smColNos: 1,
              cols: [
                {
                  label: "Description:",
                  placeholder: "Short Description of Services...",
                  type: "text",
                  element: "input",
                },
              ],
            },
          ],
        },
        {
          subHeading: "Location Information",
          rows: [
            {
              colNos: 1,
              smColNos: 1,
              cols: [
                {
                  label: "Address:",
                  placeholder: "Full adress including postal code...",
                  type: "text",
                  element: "input",
                },
              ],
            },
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "Landmark:",
                  placeholder: "Enter Hospital Name...",
                  type: "text",
                  element: "input",
                },
                {
                  label: "Precise Location Link:",
                  placeholder: "Google Maps Link...",
                  type: "text",
                  element: "input",
                },
                {
                  label: "Distance From Hostel:",
                  placeholder: "Enter Distance in meters...",
                  type: "text",
                  element: "input",
                },
              ],
            },
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "General Phone No.:",
                  placeholder: "General Phone No...",
                  type: "tel",
                  element: "input",
                },
                {
                  label: "Emergency Phone No.:",
                  placeholder: "Emergency Phone No...",
                  type: "tel",
                  element: "input",
                },
                {
                  label: "Email Address:",
                  placeholder: "Official emial address...",
                  type: "email",
                  element: "input",
                },
              ],
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Preview",
          styling: "bg-green text-white",
        },
        {
          text: "Add",
          styling: "bg-dark-blue text-white",
        },
      ],
    },
    {
      tab: "Create Admin",
      sections: [
        {
          subHeading: "Personal Information",
          rows: [
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "Full Name:",
                  placeholder: "Admin Name...",
                  element: "input",
                  type: "text",
                },
                {
                  label: "Date of Birth:",
                  placeholder: "dd/MM/yyyy",
                  element: "input",
                  type: "date",
                },
                {
                  label: "Gender:",
                  placeholder: "Select Type...",
                  element: "select",
                  options: ["Male", "Female"],
                },
              ],
            },
          ],
        },
        {
          subHeading: "Contact Information",
          rows: [
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "Phone No.:",
                  placeholder: "Enter Phone No....",
                  element: "input",
                  type: "tel",
                },
                {
                  label: "Email ID:",
                  placeholder: "Enter Email ID....",
                  element: "input",
                  type: "email",
                },
                {
                  label: "Alternate Mobile No.:",
                  placeholder: "Enter Alternate Contact...",
                  element: "input",
                  type: "tel",
                },
              ],
            },
          ],
        },
        {
          subHeading: "Professional Information",
          rows: [
            {
              colNos: 3,
              smColNos: 1,
              cols: [
                {
                  label: "Role / Position:",
                  placeholder: "Enter Hospital Name...",
                  element: "select",
                  options: ["Administrative", "Operations", "Nurse"],
                },
                {
                  label: "Department:",
                  placeholder: "Select Department...",
                  element: "select",
                  options: ["ICU", "Emergency", "Primary"],
                },
              ],
            },
          ],
        },
      ],
      buttons: [
        {
          text: "Preview",
          styling: "bg-green text-white",
        },
        {
          text: "Add",
          styling: "bg-dark-blue text-white",
        },
      ],
    },
  ];
  const [previewData, setPreviewData] = useState(null);
  const handlePreview = (data) => {
    setPreviewData(data);
    // You can now handle this data, e.g., show it in a modal, log it, etc.
  };
  

  return (
    <>
      <DynamicCard
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        content={formData}
        onPreview={handlePreview}
      />

      {previewData && (
        <div className="preview-modal">
          <h3>Preview Data:</h3>
          <pre>{JSON.stringify(previewData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};
export default AddHospital;
