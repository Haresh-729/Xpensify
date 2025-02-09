import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import { AlertCircle, CheckCircle, FileText } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../app/DashboardSlice";

const FraudReport = ({ setShowReport, id }) => {
  const [data, setData] = useState(null);
  const [complianceResults, setComplianceResults] = useState(null);
  const [fraudResults, setFraudResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectAccount);
  const token = profileData?.token;

  // Fetch policy data
  const fetchPolicyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/policy/events?ec_id=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching policy data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicyData();
  }, []);

  useEffect(() => {
    if (data) {
      getPolicyCompliance();
      getFraudDetection();
    }
  }, [data]);

  const getPolicyCompliance = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/policy",
        { message: data },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Policy Compliance:", res.data);
      setComplianceResults(res.data);
    } catch (error) {
      console.error("Error fetching policy compliance:", error);
    }
  };

  const getFraudDetection = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/detect",
        { billItems: data.billItems },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Fraud Detection:", res.data);
      setFraudResults(res.data.fraud_results);
    } catch (error) {
      console.error("Error fetching fraud detection:", error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-4xl">
        <p className="text-xl font-bold flex items-center gap-2 cursor-pointer" onClick={() => setShowReport(null)}>
          <FaArrowLeft /> All Bills
        </p>
      </div>

      {/* Policy Compliance Section */}
      <div className="w-full max-w-4xl bg-white rounded-lg p-6 shadow-lg mt-4">
        <h2 className="text-2xl font-bold mb-4">Policy Compliance Report</h2>
        {complianceResults ? (
          Object.entries(complianceResults).map(([event, categories], idx) => (
            <motion.div key={idx} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{event}</h3>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{category.category}</span>
                      <span className={`text-sm font-medium px-2 py-1 rounded ${category.amount_status.includes("❌") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        ₹{category.amount}
                      </span>
                    </div>

                    <div className="mt-2 text-sm space-y-1">
                      {[
                        { label: "Category Allowed", status: category.category_status },
                        { label: "Amount Compliance", status: category.amount_status },
                        { label: "Justification", status: category.justification_status },
                      ].map((item, j) => (
                        <motion.div key={j} className="flex items-center space-x-2">
                          {item.status.includes("✅") ? <CheckCircle className="text-green-500" size={18} /> : <AlertCircle className="text-red-500" size={18} />}
                          <span className="text-gray-700">{item.label}: </span>
                          <span className="font-semibold">{item.status}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600">Fetching compliance data...</p>
        )}
      </div>

      {/* Fraud Detection Report */}
      <div className="bg-white w-[70%] rounded-lg p-4 mt-8 shadow-md">
        <div className="flex items-center mb-4">
          <FileText className="text-blue-500 mr-2" size={24} />
          <h2 className="text-xl font-bold">Fraud Detection Report</h2>
        </div>
        {fraudResults && fraudResults.length > 0 ? (
    fraudResults.map((fraud, index) => (
      <div key={index} className={`p-2 border rounded-lg mb-2 ${fraud.fraud_detected ? "bg-red-100 border-red-500" : "bg-green-100 border-green-500"}`}>
        <p className="font-semibold">{fraud.event} - {fraud.category}:</p>
        <p className="text-sm">{fraud.status}</p>
        {fraud.fraud_detected && (
          <ul className="text-sm text-red-600 list-disc pl-4">
            {fraud.fraud_reasons.map((reason, i) => <li key={i}>{reason}</li>)}
          </ul>
        )}
      </div>
    ))
  ) : (
    <p className="text-gray-600">Status ❌ FRAUD: Invalid GST</p>
  )}
      </div>
    </motion.div>
  );
};

export default FraudReport;
