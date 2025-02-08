import React, { useState } from 'react';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    email: '',
    role: 'staff',
    status: 'active',
  });

  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Employee Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!file) {
      alert('Please select a file to import employees.');
      return;
    }
    console.log('File uploaded:', file.name);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md w-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold">Create New Employee</h2>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4 flex-col justify-center">
              {/* Employee Name */}
              <div className="space-y-2">
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">
                  Employee Name
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 shadow-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 shadow-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter employee email"
                />
              </div>

              {/* Role Dropdown */}
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 shadow-lg text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                  <option value="intern">Intern</option>
                </select>
              </div>

              {/* Status Dropdown */}
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 shadow-lg text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-1/2 bg-dark-blue text-white text-m py-2 px-4 rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Employee
              </button>
            </form>

            {/* File Upload for Bulk Import */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Import Employees</h3>
              <div className="flex items-center space-x-4 mt-3">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="border rounded-md border-gray-200 shadow-lg text-sm px-3 py-2"
                />
                <button
                  onClick={handleFileUpload}
                  className="bg-dark-blue text-white px-4 py-2 rounded-md text-sm focus:outline-none "
                >
                  Upload
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Upload a CSV file with employee details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
