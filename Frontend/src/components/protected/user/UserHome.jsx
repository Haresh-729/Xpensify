import React from "react";
import CollectionsBillList from "../all/CollectionsBillList";

function UserHome() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full flex justify-center">
      {/* Dashboard Stats */}
      <div className="max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Collections */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Total Collections
            </h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">
              ₹1,20,000
            </p>
          </div>

          {/* Total Bills Accepted */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Total Bills Accepted
            </h2>
            <p className="text-3xl font-extrabold text-green-600 mt-2">120</p>
          </div>

          {/* Total Bills Passed */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-gray-700">
              Total Bills Passed
            </h2>
            <p className="text-3xl font-extrabold text-red-600 mt-2">90</p>
          </div>
        </div>

        {/* Collections Bill List */}
        <div className="mt-10">
          <CollectionsBillList />
        </div>
      </div>
    </div>
  );
}

export default UserHome;
