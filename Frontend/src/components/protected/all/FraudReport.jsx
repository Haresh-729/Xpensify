import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, FileText,Flag } from 'lucide-react';
import { FaArrowLeft } from "react-icons/fa";

const FraudReport = ({ setShowReport }) => {
  const [actionLoading, setActionLoading] = useState(false); // Loading state for buttons

  const policies = [
    {
      id: 1,
      name: "Budget Policy 2025",
      categories: [
        { name: "Food & Beverages", budget: 20000, spending: 19000 },
        { name: "Travel", budget: 5000, spending: 8800 },
        { name: "Accommodation", budget: 15000, spending: 14500 },
        { name: "Entertaintment", budget: 15000, spending: 14500 },
      ],
    },
  ];

  const fraudDetectionParams = [
    { name: "Budget Exceeded", status: false },
    { name: "Duplicate Data", status: false },
    { name: "Unusual Spending Pattern", status: true },
    { name: "Rapid Transactions", status: false },
    { name: "Unauthorized Category", status: true },
    { name: "Weekend Activity", status: false },
    { name: "High Value Transactions", status: false },
    { name: "Multiple Locations", status: true },
  ];

  const handleAction = async (status) => {
    if (!record?.b_id) {
      message.error("Invalid Bill ID. Please try again.");
      return;
    }

    setActionLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3000/api/report/getBillApproval",
        { b_id: parseInt(record.b_id, 10), status }, // Ensure b_id is an integer
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        message.success(`Bill ${status === 1 ? "Accepted" : "Rejected"}!`);
        setModeal(null); // Close modal after action
      } else {
        throw new Error(
          response.data.message || "Failed to update bill status."
        );
      }
    } catch (error) {
      console.error(`Error updating bill status:`, error);
      message.error("Failed to update bill status. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="">
        <p className="text-xl font-bold pl-2 flex gap-2">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => setShowReport(null)}
          />{" "}
          All Bills
        </p>
      </div>
      <div className="flex gap-4 w-[70%]">
        {/* Left Section - Budget Policies */}
        <div className="w-full bg-white rounded-lg p-4 shadow-md">
          {/* <h2 className="text-xl font-bold mb-4">Budget Policies</h2> */}
          {policies.map((policy) => (
            <div key={policy.id} className="mb-6 ">
              <h3 className="text-xl font-bold mb-3 text-neutral-700">
                {policy.name}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {policy.categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 p-2  rounded"
                  >
                    <div className="mr-2">
                      {category.spending <= category.budget ? (
                        <Flag
                          className="text-green-500"
                          fill="currentColor"
                          size={20}
                        />
                      ) : (
                        <Flag
                          className="text-red-500"
                          fill="currentColor"
                          size={20}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm">
                        Budget: ${category.budget.toLocaleString()} | Spending:{" "}
                        <span
                          className={
                            category.spending > category.budget
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          ${category.spending.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Section */}
        {/* <div className="w-1/3">
          {/* Top Button */}
        {/* <div className=" rounded-lg p-4  mb-4">
            <button className="w-full bg-dark-blue text-white px-4 py-2 rounded-xl hover:bg-blue-950">
              Show Policies
            </button>
          </div> */}
      </div>
      {/* </div>  */}
      {/* Bottom Fraud Report */}
      <div className="bg-white w-[70%] rounded-lg p-4 mt-8 shadow-md">
        <div className="flex items-center mb-4">
          <FileText className="text-blue-500 mr-2" size={24} />
          <h2 className="text-xl font-bold">Fraud Detection Report</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {fraudDetectionParams.map((param, index) => (
            <div key={index} className="flex items-center justify-between p-2">
              <div className="flex items-center">
                {param.status ? (
                  <AlertCircle size={16} className="mr-2 text-red-500" />
                ) : (
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                )}
                <span className="font-medium">{param.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleAction(1)}
          disabled={actionLoading}
          className="px-6 py-2 bg-green-600 text-white text-md font-medium rounded-lg hover:bg-green-700"
        >
          {actionLoading ? <Spin size="small" /> : "Accept"}
        </button>
        <button
          onClick={() => handleAction(2)}
          disabled={actionLoading}
          className="px-6 py-2 bg-red-600 text-white ext-md font-medium  rounded-lg hover:bg-red-700"
        >
          {actionLoading ? <Spin size="small" /> : "Reject"}
        </button>
      </div>
    </div>
  );
};

export default FraudReport;