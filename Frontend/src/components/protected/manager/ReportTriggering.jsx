import React from "react";
import { useSearchParams } from "react-router-dom";

const ReportTriggering = () => {
  const [searchParams] = useSearchParams();
  const days = searchParams.get("days");
  const type = searchParams.get("type");

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800">Report Details</h2>
      <p className="text-gray-600 mt-2">
        <strong>Days:</strong> {days ? days : "Not provided"}
      </p>
      <p className="text-gray-600">
        <strong>Type:</strong> {type ? type : "Not provided"}
      </p>
    </div>
  );
};

export default ReportTriggering;
