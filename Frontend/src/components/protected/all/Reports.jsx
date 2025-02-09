import React, { useEffect, useState } from "react";
import { Table, message, Tag, Spin, Modal } from "antd";
import axios from "axios";
import { selectAccount } from "../../../app/DashboardSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Import moment for date formatting
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff6f61", "#a28eec"];
const COLORS2 = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD433", "#33FFF5", "#8D33FF", "#FF3333", "#33FF85", "#FF8F33"];

const Reports = ({ id, setBillScreenOpen }) => {
  const [billsData, setBillsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const profileData = useSelector(selectAccount);
  const token = profileData?.token;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBills();
  }, []);

  const [isModal, setModeal] = useState(false);

  const fetchBills = async () => {
    if (!isModal) {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/report/get-collection-bills",
          {
            params: { ec_id: id }, // Replace with dynamic ec_id value
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
    }
  };

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

  const statusData = [
    {
      name: "Pending",
      value: billsData.filter((bill) => bill.status === "Pending").length,
    },
    {
      name: "Accepted",
      value: billsData.filter((bill) => bill.status === "Accepted").length,
    },
    {
      name: "Rejected",
      value: billsData.filter((bill) => bill.status === "Rejected").length,
    },
  ];

  const vendorData = billsData.reduce((acc, bill) => {
    const vendor = bill.vendor;
    const amount = bill.final_amount;
    const existingVendor = acc.find((entry) => entry.vendor === vendor);

    if (existingVendor) {
      existingVendor.amount += amount;
    } else {
      acc.push({ vendor, amount });
    }

    return acc;
  }, []);

  const onRowClick = (record) => {
    // navigate(`/bill/${record.b_id}`);
    setModeal(record);
  };

  return (
    <div className="flex w-full justify-center">
      {!isModal && (
        <div className="w-[70%] p-10 flex flex-col gap-4 bg-white shadow-md rounded-md">
          <h3 className="text-xl font-semibold pl-2 flex items-center gap-4">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => setBillScreenOpen(null)}
            />
            All Bills
          </h3>
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

          <div className="flex flex-col items-center gap-6 mt-8">
            <h3 className="text-xl font-semibold mb-5">Reports</h3>
            {loading ? (
              <Spin size="large" />
            ) : (
              <div className="flex gap-4">
                <PieChart width={500} height={300}>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>

                <BarChart width={600} height={300} data={vendorData}>
                  <XAxis dataKey="vendor" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </div>
            )}
          </div>
        </div>
      )}
      {isModal && (
        <ModalDesign record={isModal} setModeal={setModeal} token={token} />
      )}
    </div>
  );
};

export default Reports;

const ModalDesign = ({ record, setModeal, token }) => {
  const [billsData, setBillsData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/report/get-single-bill-details",
        {
          params: { b_id: record.b_id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBillsData(response.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!billsData) fetchBills();
  }, []);

  console.log(billsData);

  const columns = [
    { title: "Item Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "qty", key: "qty" },
    { title: "Price", dataIndex: "amount", key: "amount" },
    {
      title: "Category",
      key: "category",
      render: (record) =>
        record.category?.name || record.predicted_cat || "N/A",
    },
  ];

  let barChartData = null;
  let lineChartData = null;
  let pieChartData = null;
  if (billsData && billsData.items?.length > 0) {
    barChartData = billsData.items.map((bill) => ({
      item: bill.name,
      quantity: bill.qty,
    }));

    lineChartData = billsData.items.map((bill) => ({
      item: bill.name,
      amount: bill.amount,
    }));

    const categoryMap = billsData.items.reduce((acc, bill) => {
      const category =
        bill.category?.name || bill.predicted_cat || "Uncategorized";
      acc[category] = (acc[category] || 0) + bill.amount;
      return acc;
    }, {});

    pieChartData = Object.entries(categoryMap).map(([category, value]) => ({
      name: category,
      value,
    }));

  }

  return (
    <div className=" flex justify-center w-full">
      <div className="w-[70%] p-10 ">
        <div className="flex flex-col gap-8">
          <h3 className="text-xl font-semibold pl-2 flex items-center gap-4">
            <FaArrowLeft
              className="cursor-pointer"
              onClick={() => setModeal(null)}
            />
            Reports
          </h3>
          {/* Bill Details Table */}
          {loading ? (
            <Spin size="large" />
          ) : (
            <Table
              columns={columns}
              dataSource={billsData?.items?.map((bill, index) => ({
                ...bill,
                key: index,
              }))}
              bordered
              pagination={{ pageSize: 10 }}
            />
          )}

          {/* Bar Chart */}
          <h3 className="text-xl font-semibold pl-2 flex justify-center gap-4 mb-5">
            Analysis
          </h3>
          <div className="grid grid-cols-2 gap-6">
            {loading ? (
              <Spin size="large" />
            ) : (
              <>
                <BarChart width={500} height={300} data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="quantity">
                    {barChartData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS2.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>

                {/* Line Chart */}
                <LineChart width={500} height={300} data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="item" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>

                {/* Pie Chart */}
              </>
            )}
          </div>
          <PieChart width={500} height={500} className="m-auto">
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label
            >
              {pieChartData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
