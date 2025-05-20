"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "+234 801 234 5678",
    address: "123 Library St, Lagos",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save to backend (API call here)
    setEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className=" rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Profile</h2>

        <div className="flex items-center space-x-4">
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <input
              name="name"
              disabled={!editing}
              value={user.name}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              disabled={!editing}
              value={user.email}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            <input
              name="phone"
              disabled={!editing}
              value={user.phone}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <input
              name="address"
              disabled={!editing}
              value={user.address}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#1E2A38] text-white px-4 py-2 rounded-md hover:bg-[#111827] transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
