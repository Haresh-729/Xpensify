import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../app/DashboardSlice";
import moment from "moment";
import { Spin } from "antd";

const Collections = () => {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isNewPolicyModalOpen, setIsNewPolicyModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState(null);
  const [policies, setPolicies] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    name: "",
    category: "",
    data: "",
    ec_id: "",
    c_id: "",
  });
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectAccount);
  const token = profileData?.token;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/collection/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total budget for a policy
  const calculateTotal = (categories) => {
    return categories.reduce(
      (sum, category) => sum + parseInt(category.data),
      0
    );
  };

  const handleShowPolicies = async (eventId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/policy/event/" + eventId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPolicies(response.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
    setSelectedEventId(eventId);
    setIsPolicyModalOpen(true);
  };

  const handleSubmitPolicy = async (e) => {
    let nPolicy = {
      name: policies[0]?.name,
      category: newPolicy.category,
      amount: newPolicy.data,
      ec_id: selectedEventId,
      c_id: 2,
    };
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/policy/",
        nPolicy,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      // setEvents(response.data.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
    console.log("New policy submitted:", newPolicy);
    setNewPolicy({ name: "", data: "", ec_id: "", c_id: "", category: "" });
    setIsNewPolicyModalOpen(false);
      setIsPolicyModalOpen(false);
  };

  const handlePolityDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/policy/policy/"+id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsPolicyModalOpen(false);
      // setEvents(response.data.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || colors.pending;
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          <div className="space-x-4">
            <button className="bg-dark-blue text-white text-sm px-4 py-2 rounded-md hover:bg-blue-900">
              Create Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events &&
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">
                      {event.name}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 text-sm font-semibold">
                    {event.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {moment(event.created_at).format("DD/MM/YYYY")}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 border-t flex flex-col space-y-2">
                  <div className="flex justify-between space-x-3">
                    <button
                      onClick={() => handleShowPolicies(event.ec_id)}
                      className="bg-[#5c8001] text-sm text-white px-4 py-2 rounded-md hover:bg-emerald-900"
                    >
                      Show Policies
                    </button>
                    <div className="flex justify-end space-x-3">
                      <button className="text-blue-500 hover:text-blue-600 font-medium">
                        <Pencil size={20} />
                      </button>
                      <button className="text-gray-500 hover:text-gray-600 font-medium">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Policies Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-md ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto ">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Event Policies</h2>
              <div className=" flex justify-end gap-2">
                <button
                  onClick={() => setIsNewPolicyModalOpen(true)}
                  className="bg-[#5c8001] text-white text-sm px-4 py-2 rounded-md hover:bg-emerald-900"
                >
                  Add New Policy
                </button>
                <button
                  onClick={() => setIsPolicyModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            {isNewPolicyModalOpen && (
              <div className=" flex justify-center my-10 ">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Add New Policy</h2>
                    <button
                      onClick={() => setIsNewPolicyModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    ></button>
                  </div>
                  <form onSubmit={handleSubmitPolicy}>
                    <div className="space-y-4">
                      {/* Category & Budget Row */}
                      <div className="flex space-x-4">
                        {/* Category Select */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            value={newPolicy.category}
                            onChange={(e) =>
                              setNewPolicy({
                                ...newPolicy,
                                category: e.target.value,
                              })
                            }
                            className="w-full p-2 border text-sm   text-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="Health">Health</option>
                            <option value="Finance">Finance</option>
                            <option value="Security">Security</option>
                            <option value="Education">Education</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        {/* Budget Input */}
                        <div className="w-1/2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Budget (in Rs.)
                          </label>
                          <input
                            type="number"
                            value={newPolicy.budget}
                            onChange={(e) =>
                              setNewPolicy({
                                ...newPolicy,
                                data: e.target.value,
                              })
                            }
                            className="w-full text-sm p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter amount"
                            required
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex justify-end space-x-2 pt-4 text-sm">
                        <button
                          type="button"
                          onClick={() => setIsNewPolicyModalOpen(false)}
                          className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-dark-blue text-white rounded hover:bg-blue-900"
                        >
                          Save Policy
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="grid gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {policies[0]?.name || ""}
                  </h3>
                </div>
                {policies.map((policy) => (
                  <div className="space-y-3" key={policy.p_id}>
                    <div className="flex-col">
                      <div className=" flex justify-between">
                        <div className=" items-center p-3 bg-gray-50 rounded-md">
                          <span className="text-gray-700 font-medium">
                            {policy.category} :{" "}
                          </span>
                          <span className="text-gray-900 font-semibold">
                            {formatCurrency(policy.data)}
                          </span>
                        </div>
                        <div>
                          <button
                            className="text-red-500 hover:text-red-600 cursor-pointer"
                            onClick={() => handlePolityDelete(policy.p_id)}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">
                  Total Budget
                </span>
                <span className="text-lg font-bold text-green-600">
                  {formatCurrency(calculateTotal(policies))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Policy Modal */}
    </div>
  );
};

export default Collections;
