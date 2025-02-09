import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { selectAccount } from "../../../app/DashboardSlice";
import { useSelector } from "react-redux";
import OCROld from "../../common/OCROld";
import { Spin } from "antd";

function ScanBill() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState("");
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const profileData = useSelector(selectAccount);
  const token = profileData?.token;  

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
    setData(null);
  };

  const handleScanBill = async () => {
    setLoading(true);
    if (!file) {
      alert("Please select an image before scanning.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error scanning bill:", error.message);
    }
  };

  const handleEditRemark = (item, index) => {
    setPopupData({ item, index });
  };

  const handleSaveRemark = (remark) => {
    const updatedItems = [...data.structured_items];
    updatedItems[popupData.index].remark = remark;
    setData({ ...data, structured_items: updatedItems });
    setPopupData(null);
  };

  const handleSubmit = async () => {
    const billData = {
      vendor_name: data.vendor_name,
      date: data.date, // Current date if not provided
      final_amount: data.final_amount,
      added_by: data.added_by || profileData?.id,
      status: data.status || 0,
      verified_by: data.verified_by || null,
      verified_at: data.verified_at || null,
      ec_id: parseInt(selectedCollectionId),
      gst_no:data.gst_no || null,
      items: (data.structured_items || []).map((item) => ({
        item_name: item.item_name,
        category: item.category || null,
        quantity: item.quantity || 1,
        price: item.price || 0,
        remark: item.remark || null,
        predicted_cat: item.predicted_cat || false,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/ocr/upload-bills",
        billData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Bill uploaded successfully:", response.data);
      setData(null);
      setFile(null);
      setFilePreview(null);
    } catch (error) {
      console.error("Error uploading bill:", error);
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/collection/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCollections(response.data.data.data || []);
      } catch (error) {
        console.error("Error fetching collections:", error.message);
      }
    };
    fetchCollections();
  }, [token]);

  return (
    <div className="bg-white flex flex-col justify-center items-center gap-4 p-6 rounded-md w-full">
      <div className="w-[50%]">
        <div className="relative cursor-pointer h-1/2 border-2 border-gray-400 p-8 rounded-md border-dashed flex flex-col justify-center items-center gap-3">
          <p className="p-4 bg-superiory-blue text-white rounded-full">
            <LuUpload size={30} />
          </p>
          <p className="text-lg text-center">
            Drag & Drop or{" "}
            <span className="text-superiory-blue">Choose an image</span> to scan
            a bill
          </p>
          <input
            type="file"
            id="file"
            accept="image/png, image/jpeg"
            className="opacity-0 text-[0.4rem] absolute cursor-pointer w-full h-full"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex items-center mt-5 gap-4">
          <select
            value={selectedCollectionId}
            onChange={(e) => setSelectedCollectionId(e.target.value)}
            className="bg-white border border-gray-300 p-2 rounded-md w-[50%]"
          >
            <option value="">Select a Collection</option>
            {collections.map((collection) => (
              <option key={collection.ec_id} value={collection.ec_id}>
                {collection.name}
              </option>
            ))}
          </select>
          <div className="w-full">
            <button
              className="bg-dark-blue cursor-pointer text-white font-bold border-none w-full py-2 px-8 rounded-[5rem] hover:scale-105 transition"
              onClick={handleScanBill}
            >
              Scan Bill
            </button>
            <p
              onClick={() => setPopup(true)}
              className="text-sm text-center mt-2 text-blue-500 underline cursor-pointer"
            >
              Click here to upload photo of real bill
            </p>
          </div>
        </div>

        <div className={`flex`}>
          <div>
            {filePreview && !data && (
              <div>
                <img src={filePreview} className="w-[350px] p-5 mt-5"></img>
              </div>
            )}
          </div>
          <div className="flex gap-8 w-full">
            {loading && (
              <div className="absolute bg-opacity inset-0 flex justify-center items-center z-50">
                <Spin size="large"/>
              </div>
            )}
            {data && (
              <div className="flex-1 p-5 w-full rounded-sm shadow-md mt-5">
                <div className="font-xm text-gray-700 mb-3">
                  <p>
                    Vendor Name:{" "}
                    <span className="font-medium capitalize">
                      {data.vendor_name}
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-medium capitalize">{data.date}</span>
                  </p>
                </div>

                <div className="bg-white rounded-md">
                  <h3 className=" text-gray-800 mb-3">Items List</h3>
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-blue-50 text-left">
                        <th className="border border-gray-300 p-2">
                          Item Name
                        </th>
                        <th className="border border-gray-300 p-2">Category</th>
                        <th className="border border-gray-300 p-2">
                          Predicted Category
                        </th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Remark</th>
                        <th className="border border-gray-300 p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.structured_items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 capitalize">
                          <td className="border border-gray-300 p-2">
                            {item.item_name}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {item.category}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {item.predicted_cat || "-"}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {item.quantity}
                          </td>
                          <td className="border border-gray-300 p-2">
                            ${item.price}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {item?.remark || "-"}
                          </td>
                          <td className="border border-gray-300">
                            <FaEdit
                              className={`m-auto ${
                                item.predicted_cat
                                  ? "cursor-pointer text-blue-500"
                                  : "text-gray-500 cursor-not-allowed"
                              }`}
                              onClick={() =>
                                item.predicted_cat
                                  ? handleEditRemark(item, index)
                                  : null
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between mt-4 ">
                  <div className="text-xl font-bold text-green-600">
                    <p>Final Amount: ${data.final_amount}</p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="text-white bg-green-600 px-5 py-2 cursor-pointer rounded-full"
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {popupData && (
        <Popup
          item={popupData.item}
          onSave={(remark) => handleSaveRemark(remark)}
          onClose={() => setPopupData(null)}
        />
      )}

      {popup && (
        <div className="bg-opacity absolute inset-0 flex justify-center items-center z-50">
          <OCROld />
        </div>
      )}
    </div>
  );
}

function Popup({ item, onSave, onClose }) {
  const [remark, setRemark] = useState(item.remark || "");

  const handleSave = () => {
    if (!remark.trim()) {
      alert("Remark cannot be empty!");
      return;
    }
    onSave(remark);
  };

  return (
    <div className="absolute inset-0 bg-opacity flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Remark</h2>
        <p className="text-lg mb-2 capitalize">
          <span className="font-bold">Item Name:</span> {item.item_name}
        </p>
        <label className="font-bold text-lg">Remark</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanBill;
