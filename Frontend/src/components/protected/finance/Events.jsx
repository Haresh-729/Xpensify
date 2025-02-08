import React, { useState } from 'react';
import { Pencil, Trash2, X } from "lucide-react";

const EventsGrid = () => {
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isNewPolicyModalOpen, setIsNewPolicyModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: '',
    type: ''
  });

  // Dummy policies data
 const policies = 
     [
      { 
        id: 1, 
        name: "Budget Policy 2025",
        categories: [
          { name: "Food & Beverages", budget: 20000 },
          { name: "Travel", budget: 5000 },
          { name: "Accommodation", budget: 15000 }
        ]
      },
      { 
        id: 2, 
        name: "Q2 Event Budget",
        categories: [
          { name: "Marketing", budget: 25000 },
          { name: "Venue", budget: 30000 },
          { name: "Equipment", budget: 10000 }
        ]
      }
   ,
      { 
        id: 3, 
        name: "Festival Budget Plan",
        categories: [
          { name: "Artist Fees", budget: 50000 },
          { name: "Stage Setup", budget: 35000 },
          { name: "Security", budget: 15000 },
          { name: "Food Stalls", budget: 25000 }
        ]
      }
    ]
  ;

  // Dummy event data
  const events = [
    {
      id: 1,
      name: "Tech Conference 2025",
      description: "Annual technology conference featuring the latest innovations in AI and machine learning.",
      status: "upcoming",
      date: "March 15, 2025"
    },
    {
      id: 2,
      name: "Summer Music Festival",
      description: "Three-day outdoor music festival featuring top artists from around the world.",
      status: "active",
      date: "July 1-3, 2025"
    },
      {
        id: 3,
        name: "Digital Marketing Workshop",
        description: "Interactive workshop on modern digital marketing strategies and tools.",
        status: "pending",
        date: "April 20, 2025"
      },
      {
        id: 4,
        name: "Food & Wine Expo",
        description: "Showcase of international cuisines and wine tasting from premium vineyards.",
        status: "upcoming",
        date: "May 5, 2025"
      },
      {
        id: 5,
        name: "Startup Pitch Night",
        description: "Evening of innovative startup pitches to potential investors and industry experts.",
        status: "pending",
        date: "March 30, 2025"
      },
      {
        id: 6,
        name: "Art Gallery Opening",
        description: "Opening night of contemporary art exhibition featuring local and international artists.",
        status: "active",
        date: "April 10, 2025"
      }
    // ... rest of the events
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate total budget for a policy
  const calculateTotal = (categories) => {
    return categories.reduce((sum, category) => sum + category.budget, 0);
  };


  const handleShowPolicies = (eventId) => {
    setSelectedEventId(eventId);
    setIsPolicyModalOpen(true);
  };

  const handleSubmitPolicy = (e) => {
    e.preventDefault();
    // Here you would typically add the new policy to your policies state/database
    console.log('New policy submitted:', newPolicy);
    setNewPolicy({ name: '', description: '', type: '' });
    setIsNewPolicyModalOpen(false);
  };

  // Status badge color mapping
  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || colors.pending;
  };

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
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{event.name}</h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm font-semibold">{event.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t flex flex-col space-y-2">
                <div className="flex justify-between space-x-3">
                  <button 
                    onClick={() => handleShowPolicies(event.id)}
                    className="bg-[#5c8001] text-sm text-white px-4 py-2 rounded-md hover:bg-emerald-900">
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
              <div className=" flex justify-end gap-2" >
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
        >
       
        </button>
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
                onChange={(e) => setNewPolicy({ ...newPolicy, category: e.target.value })}
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
                onChange={(e) => setNewPolicy({ ...newPolicy, budget: e.target.value })}
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
          {policies
          .filter(policy => policy.id === selectedEventId) // Filter policies by selected event ID
          .map(policy => (
            <div key={policy.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">{policy.name}</h3>
                
              </div>
              
              <div className="space-y-3">
                {/* Categories Grid */}
                <div className="flex-col">
                  {policy.categories.map((category, index) => (
                    <div className=" flex justify-between">
                    <div 
                      key={index} 
                      className=" items-center p-3 bg-gray-50 rounded-md"
                    >
                      <span className="text-gray-700 font-medium">{category.name} : </span>
                      <span className="text-gray-900 font-semibold">
                      
                        {formatCurrency(category.budget)}
                      </span>
                      </div> 
                      <div>
                      <button className="text-red-500 hover:text-red-600">
                  <Trash2 size={20} />
                </button>
                </div>
                </div>
                  
                  ))}
                </div>
                
                {/* Total */}
                <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">Total Budget</span>
                  <span className="text-lg font-bold text-green-600">
                    {formatCurrency(calculateTotal(policy.categories))}
                  </span>
                </div>
              </div>
            </div>
          ))}
    
            </div>
          </div>
        </div>
      )}

      {/* New Policy Modal */}
      

    </div>
  );
};

export default EventsGrid;