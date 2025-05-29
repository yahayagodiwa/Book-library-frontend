"use client"
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useAuthStore from "../../../../store";


function UserDetailsModal({ user, onClose }) {
  if (!user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
        <p><strong>Blocked:</strong> {user.isBlocked ? "Yes" : "No"}</p>
        <p><strong>Borrows:</strong> {user.borrows?.length || 0}</p>
        <p><strong>Fine (₦):</strong> {user.fine}</p>
        <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Close</button>
      </div>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {url} = useAuthStore()
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}admin/users`);
      setUsers(response.data.users);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);

  const paginatedUsers = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPage, filteredUsers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const goToPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNext = () => setCurrentPage((p) => Math.min(p + 1, Math.ceil(filteredUsers.length / itemsPerPage)));

 
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <input
        type="text"
        placeholder="Search by username or email..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-auto border rounded-xl shadow">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3">Borrows</th>
              <th className="px-4 py-3">Fine (₦)</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">No users found.</td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-3">{user.username}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center">{user.borrows?.length || 0}</td>
                  <td className="px-4 py-3 text-center">{user.fine}</td>
                  <td className="px-4 py-3 space-x-2 text-center">
                    <button
                      onClick={() => toggleBlocked(user)}
                      className={`px-2 py-1 text-xs rounded ${user.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                    >
                      {user.isBlocked ? "Unblock" : "Block"}
                    </button>
                    <button
                      onClick={() => toggleVerified(user)}
                      className="px-2 py-1 text-xs bg-yellow-400 text-black rounded"
                    >
                      {user.isVerified ? "Unverify" : "Verify"}
                    </button>
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={goToPrev} disabled={currentPage === 1} className="px-4 py-2 rounded border text-blue-600 hover:bg-blue-50">Prev</button>
        <span className="text-sm">Page {currentPage} of {Math.ceil(filteredUsers.length / itemsPerPage)}</span>
        <button onClick={goToNext} disabled={currentPage >= Math.ceil(filteredUsers.length / itemsPerPage)} className="px-4 py-2 rounded border text-blue-600 hover:bg-blue-50">Next</button>
      </div>

      {selectedUser && <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
