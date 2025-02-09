import React, { useEffect, useState } from "react";
import { Calendar, Info, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../app/DashboardSlice";
import moment from "moment";
import { Spin, Table, Tag } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import CardImage from "../../../assets/card2.jpg";

const CollectionsBillList = () => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      {!isBillsScreenOpen ? (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Events</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events &&
              events.map((event) => (
                <div
                  key={event.id}
                  className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105"
                >
                  {/* Top Status Bar */}
                  <div className={`bg-[#5c8001] h-2 w-full`}></div>

                  {/* Content Section */}
                  <div className="p-5">
                    {/* Event Title */}
                    <h2 className="text-2xl font-bold text-gray-800">
                      {event.name}
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm font-medium">
                      {event.description}
                    </p>

                    {/* Date Display */}
                    <div className="mt-3 flex items-center text-gray-500 text-sm">
                      <Calendar className="w-5 h-5 mr-2" />
                      {moment(event.created_at).format("DD/MM/YYYY")}
                    </div>

                    {/* Event Image */}
                    <div className="mt-4">
                      <img
                        src={CardImage}
                        alt="Event Image"
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                  </div>

                  {/* Info Panel & Actions */}
                  <div className="bg-gray-50 p-4 flex justify-between items-center">
                    <button
                      onClick={() => setBillScreenOpen(event.ec_id)}
                      className="text-white bg-gradient-to-r bg-[#5c8001] px-4 py-2 rounded-md text-sm font-semibold "
                    >
                      Show Bills
                    </button>
                    <div className="flex space-x-4">
                      <button className="text-[#5c8001]">
                        <Info size={24} />
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <BillPage
          role={role}
          id={isBillsScreenOpen}
          token={token}
          setBillScreenOpen={setBillScreenOpen}
        />
      )}
    </div>
  );
};

export default CollectionsBillList;

const BillPage = ({ id, role, token, setBillScreenOpen }) => {
  const [billsData, setBillsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchBills = async () => {
    setLoading(true);
    try {
      let response;
      if (role === "employee") {
        response = await axios.get(
          "http://localhost:3000/api/report/get-user-bills",
          {
            params: { ec_id: id }, // Replace with dynamic ec_id value
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        response = await axios.get(
          "http://localhost:3000/api/report/get-collection-bills",
          {
            params: { ec_id: id }, // Replace with dynamic ec_id value
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      const processedData = response.data.data.map((bill) => ({
        ...bill,
        statusText: getStatusText(bill.status),
      }));
      setBillsData(processedData);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return <Tag color="orange">Pending</Tag>;
      case "Accepted":
        return <Tag color="green">Accepted</Tag>;
      default:
        return <Tag color="red">Rejected</Tag>;
    }
  };

  const columns = [
    {
      title: "Bill ID",
      dataIndex: "b_id",
      key: "b_id",
      render: (text) => (
        <span className="cursor-pointer text-blue-600">{text}</span>
      ),
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "Final Amount",
      dataIndex: "final_amount",
      key: "final_amount",
      render: (amount) => `₹ ${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "statusText",
      key: "statusText",
    },
    {
      title: "Added By",
      dataIndex: ["added_by_user", "name"],
      key: "added_by",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => moment(text).format("DD/MM/YYYY hh:mm A"),
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="w-[70%] p-10 flex flex-col gap-4 bg-white  rounded-md">
        <p className="text-2xl font-bold pl-2 flex gap-2 items-center">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => setBillScreenOpen(null)}
          />{" "}
          All Bills
        </p>
        <Table
          columns={columns}
          dataSource={billsData.map((bill) => ({ ...bill, key: bill.b_id }))}
          loading={loading}
          bordered
          pagination={{ pageSize: 10 }}
          className="custom-ant-table"
        />
      </div>
    </div>
  );
};
