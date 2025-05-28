"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../../../../store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ITEMS_PER_PAGE = 5;

const Page = () => {
  const { user, getUser, url, token } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!user) getUser();
  }, [user, getUser]);

  const returnBook = async (id) => {
    try {
      const res = await axios.post(
        `${url}book/return-book/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Book returned successfully");
      getUser();
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to return book";
      toast.error(errorMsg);
      console.error("Return Error:", error);
    }
  };

  const borrows = user?.borrows || [];

  const totalPages = Math.ceil(borrows.length / ITEMS_PER_PAGE);
  const paginatedBorrows = borrows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isOverdue = (borrow) => {
    const today = new Date();
    const dueDate = new Date(borrow.returnDate);
    return !borrow.returned && today > dueDate;
  };

  return (
    <div className="p-6">
      <ToastContainer />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Borrowed Books</h1>
        <p className="text-gray-500">List of all books you've borrowed</p>
      </div>

      {borrows.length === 0 ? (
        <div className="p-6 bg-gray-100 rounded-md text-center text-lg text-gray-600">
          You haven’t borrowed any books yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-[#1E2A38] text-white">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Borrowed Date</th>
                <th className="px-4 py-3 text-left">Due Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y">
              {paginatedBorrows.map((bk, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{bk.book?.title || "Untitled"}</td>
                  <td className="px-4 py-3">
                    {new Date(bk.borrowDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(bk.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        bk.returned
                          ? "bg-green-100 text-green-700"
                          : isOverdue(bk)
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {bk.returned
                        ? "Returned"
                        : isOverdue(bk)
                        ? "Overdue"
                        : "Not Returned"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => returnBook(bk._id)}
                      disabled={bk.returned}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium text-white transition ${
                        bk.returned
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-500"
                      }`}
                    >
                      {bk.returned ? "Returned" : "Return"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="flex justify-end items-center gap-2 p-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-md text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
