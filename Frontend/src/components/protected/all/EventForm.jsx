import React, { useState } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md w-full">
          <div className="p-6 ">
            <h2 className="text-2xl font-bold">Create New Event</h2>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6 flex-col justify-center  ">
              <div className="space-y-2">
                <label 
                  htmlFor="eventName" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border text-sm border-gray-200 shadow-lg rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event name"
                />
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="description" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border text-sm border-gray-200 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event description"
                />
              </div>

              <div className="space-y-2">
                <label 
                  htmlFor="status" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border text-sm border-gray-200 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-1/2  bg-dark-blue text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventForm;