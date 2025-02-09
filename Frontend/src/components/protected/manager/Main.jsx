import React, { useEffect, useState } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccount } from "../../../app/DashboardSlice";
import { Spin } from "antd";
import { Table, Tag } from "antd";
import moment from 'moment'; // Import moment for date formatting

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Main = () => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectAccount);
  const [billsData, setBillsData] = useState([]); // Initialize as an empty array
  const [modal, setModeal] = useState(null); // State for modal (if needed)

  const token = profileData?.token;

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/collection/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.data.data); // Handle potential undefined data
    } catch (error) {
      console.error("Error fetching events:", error); // More specific error message
    } finally {
      setLoading(false);
    }
  };

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/report/getlistbils", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    if (token) {
      fetchEvents();
      fetchBills(); // Fetch both data sets in one useEffect
    }
  }, [token]);

  const eventCategories = events.reduce((acc, event) => { // No need for conditional check here since events is initialized as []
    acc[event.category] = (acc[event.category] || 0) + 1;
    return acc;
  }, {});

  const pieData1 = Object.entries(eventCategories).map(([category, count]) => ({
    name: category,
    value: count,
  }));

  const barData1 = events.map(event => ({ 
    name: event.name,
    budget: parseInt(event.total_exp, 10),
  }));

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return <Tag color="orange">Pending</Tag>;
      case "Accepted":
        return <Tag color="green">Accepted</Tag>;
      case "Rejected":
        return <Tag color="red">Rejected</Tag>;
      default:
        return <Tag color="default">{status}</Tag>; // Handle other statuses
    }
  };

  const columns = [
    {
      title: "Bill ID",
      dataIndex: "b_id",
      key: "b_id",
      render: (text) => <span className="cursor-pointer text-blue-600">{text}</span>,
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
      render: (date) => date ? moment(date).format("DD/MM/YYYY") : '-', // Handle missing dates
    },
    {
      title: "Final Amount",
      dataIndex: "final_amount",
      key: "final_amount",
      render: (amount) => amount ? `₹ ${amount.toFixed(2)}` : '-', // Handle missing amounts
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
      render: (text) => text ? moment(text).format("DD/MM/YYYY hh:mm A") : '-', // Handle missing timestamps
    },
  ];


  const pieData = [
    { name: "Travel", value: 10 },
    { name: "Food", value: 5 },
    { name: "Office Supplies", value: 8 },
    { name: "Miscellaneous", value: 6 },
  ];

  const barData = [
    { name: "Event A", value: 12000 },
    { name: "Event B", value: 9000 },
    { name: "Event C", value: 1500 },
    { name: "Event D", value: 600 },
  ];


  const onRowClick = (record) => {
    setModeal(record); // Assuming you have a modal to display details
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full mx-[5rem]">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Manager Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Event Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Budget Analysis
          </h2>
          <div style={{ width: "100%", height: "300px" }}>
            {" "}
            {/* or height: 300 */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={barData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>{" "}
      {/* Close the grid div here */}
      <h3 className="text-xl font-bold pl-2 flex items-center gap-4 mt-10 mb-5">
        All Bills
      </h3>{" "}
      {/* Simplified heading */}
      <Table
        columns={columns}
        dataSource={billsData.map((bill) => ({ ...bill, key: bill.b_id }))}
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </div>
  );
};

export default Main;