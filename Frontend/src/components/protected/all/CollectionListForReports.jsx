import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
import { Spin, Table, Tag } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { selectAccount } from "../../../app/DashboardSlice";
import Reports from "./Reports";
import CardImage from '../../../assets/card.jpg'

function CollectionListForReports() {
    const [isBillsScreenOpen, setBillScreenOpen] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectAccount);
  const token = profileData?.token;
  const role = profileData?.role;

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
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      {!isBillsScreenOpen ? (
        <div
          className={`mx-auto ${isBillsScreenOpen ? "w-full" : "max-w-7xl"} `}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {events &&
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Static Image Section */}
                  <div className="w-1/3 bg-gray-100">
                    <img
                      src={CardImage}
                      alt="Event Thumbnail"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      {/* Title and Status */}
                      <div className="flex justify-between items-start">
                        <h2 className="text-2xl font-semibold text-gray-800">
                          {event.name}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                            event.status
                          )}`}
                        >
                          {event.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mt-4 text-base">
                        {event.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center text-sm text-gray-500 mt-4">
                        <svg
                          className="w-5 h-5 mr-2 text-gray-500"
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

                    {/* Footer Section */}
                    <div className="mt-6">
                      <button 
                      onClick={()=>setBillScreenOpen(event.ec_id)}
                      className="w-full cursor-pointer bg-[#5c8001] text-white text-sm px-4 py-2 rounded-lg hover:bg-green-800">
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <Reports
          id={isBillsScreenOpen}
          token={token}
          setBillScreenOpen={setBillScreenOpen}
        />
      )}
    </div>
  );
};

export default CollectionListForReports