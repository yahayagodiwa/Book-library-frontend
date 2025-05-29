"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../../../../store";

export default function BorrowedBooks() {
  const { token, url } = useAuthStore();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get(`${url}admin/borrowed`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(res.data);
      } catch (error) {
        console.error(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  const isOverdue = (returnDate) => new Date(returnDate) < new Date();

  const filteredBooks = borrowedBooks.filter((item) =>
    item.book?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-white p-2 md:p-6 mb-12">
      <ToastContainer />
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by book title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Note</th>
                <th className="px-6 py-3">Borrow Date</th>
                <th className="px-6 py-3">Return Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading borrowed books...
                  </td>
                </tr>
              ) : currentBooks.length > 0 ? (
                currentBooks.map((item, i) => (
                  <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">{item.book?.title || "Unknown"}</td>
                    <td className="px-6 py-4 text-blue-600">{item.user?.username}</td>
                    <td className="px-6 py-4">{item.borrowNote || "—"}</td>
                    <td className="px-6 py-4">
                      {new Date(item.borrowDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.returnDate).toLocaleDateString()}
                      {isOverdue(item.returnDate) && (
                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                          Overdue
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                        Not Returned
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No borrowed books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 border"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
