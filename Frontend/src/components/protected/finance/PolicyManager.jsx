import React, { useState } from 'react';

const PolicyManager = () => {
  const [policies, setPolicies] = useState([
    { id: 1, name: 'Data Protection Policy', description: 'Guidelines for handling sensitive data', lastUpdated: '2024-02-08' },
    { id: 2, name: 'Security Policy', description: 'IT security protocols and procedures', lastUpdated: '2024-02-07' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const policy = {
      id: policies.length + 1,
      name: newPolicy.name,
      description: newPolicy.description,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setPolicies([...policies, policy]);
    setNewPolicy({ name: '', description: '' });
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Policies</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Policy
        </button>
      </div>

      {/* Policy List */}
      <div className="space-y-4">
        {policies.map((policy) => (
          <div 
            key={policy.id} 
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{policy.name}</h3>
            <p className="text-gray-600 mt-1">{policy.description}</p>
            <p className="text-sm text-gray-500 mt-2">Last updated: {policy.lastUpdated}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Policy</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Policy Name
                </label>
                <input
                  type="text"
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({...newPolicy, description: e.target.value})}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManager;