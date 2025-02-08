import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccount } from "../../../app/DashboardSlice";
import { useNavigate } from "react-router-dom";
import { getUsersByRoles } from "../../../services/repository/userRepo";
import Select from "react-select";
import { getUsersByRole } from "../../../app/ProfileSlice";
import { putDataCollection } from "../../../services/repository/eventsRepo";

const CreateEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    users: [],
  });

  const users = useSelector(getUsersByRole);

  useEffect(() => {
    dispatch(getUsersByRoles("3", navigate));
  }, [dispatch, navigate]);

  useEffect(()=>{    
    if (Array.isArray(users)) {
      setUsersData(users.map(user => ({ value: user.u_id, label: user.name })));
    }
  },[users])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserSelect = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    setFormData({ ...formData, users: selectedOptions.map(user => user.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    await dispatch(putDataCollection(formData, navigate));
    // Submit form data to backend here
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Collection Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter collection name"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              required
            ></textarea>
          </div>

          {usersData && <div>
            <label className="block text-gray-700">Select Users:</label>
            
            <Select
              options={usersData}
              isMulti
              value={selectedUsers}
              onChange={handleUserSelect}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
