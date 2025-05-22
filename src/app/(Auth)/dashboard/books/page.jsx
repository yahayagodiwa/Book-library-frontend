"use client";
import React, { useEffect } from "react";
import useAuthStore from "../../../../../store";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Page = () => {
  const { user, getUser, url, token } = useAuthStore();

  // Fetch user data only once on mount if user is not present
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser]); // Depend on getUser, which should be memoized in the store
console.log(user);

  // Return a book
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
      if (res.status !== 200) {
        toast.error(res.data.error || "Failed to return book");
      }
      toast.success(res.data.message);
      console.log(res.data);
      getUser(); // Refresh user data to update borrow list
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="rounded-md">
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-gray-800">All Books</h3>
        </div>
        <div className="overflow-x-auto">
          {user?.borrows?.length <= 0 ? (
            <h2 className="text-xl font-semibold">You haven't borrowed any book</h2>
          ) : (
            ""
          )}
          <table className="w-full mt-6 text-left text-sm bg-white shadow overflow-hidden">
            <thead className="bg-[#1E2A38] text-white">
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Borrowed</th>
                <th className="py-2 px-4">Due Date</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {user?.borrows?.map((bk, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{bk.book.title}</td>
                  <td className="py-2 px-4">{new Date(bk.borrowDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(bk.returnDate).toLocaleDateString()}</td>
                  <td className={`py-2 px-4 ${bk.returned ? "text-blue-600" : "text-red-600"}`}>
                    {bk.returned ? "Returned" : "Not returned"}
                  </td>
                  <td className="">
                    <button
                      className={`${
                        bk.returned
                          ? "disabled cursor-not-allowed"
                          : "bg-blue-700 hover:bg-blue-400"
                      } px-2 py-1 rounded-2xl cursor-pointer text-white`}
                      onClick={() => returnBook(bk._id)}
                      disabled={bk.returned}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;