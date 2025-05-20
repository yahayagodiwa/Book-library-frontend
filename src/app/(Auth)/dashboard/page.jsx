"use client";

import { useEffect, useMemo } from "react";
import useAuthStore from "../../../../store";

export default function DashboardPage() {
  const { user, getUser } = useAuthStore();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, []);
 const dueBooks = useMemo(() => {
    return useAuthStore.getState().getDueBooks();
  }, [user]); 

  
  console.log(user);
 
  // console.log(dueBooks);
  let totalFine = 0;

  dueBooks?.forEach((db) => {
    totalFine += db.fine;
  });

  return (
    <div className="space-y-6 overflow-y-auto">
      <div className=" rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome back {user?.username}!
        </h2>
        <p className="text-gray-500 mt-1">
          Here’s a quick overview of your activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1E2A38] text-white rounded-xl p-6">
          <h3 className="text-sm">Books Borrowed</h3>
          <p className="text-3xl font-bold mt-2">{user?.borrows?.length}</p>
        </div>
        <div className="bg-blue-500 text-white rounded-xl p-6 ">
          <h3 className="text-sm">Overdue Books</h3>
          <p className="text-3xl font-bold mt-2">{dueBooks?.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-xl p-6 ">
          <h3 className="text-sm">Total Fines</h3>
          <p className="text-3xl font-bold mt-2">${user?.fine + totalFine}</p>
        </div>
        <div className="bg-yellow-500 text-white rounded-xl p-6 ">
          <h3 className="text-sm">Account Status</h3>
          <p className="text-3xl font-bold mt-2">
            {user?.isVerified ? "Active" : "Not verified"}
          </p>
        </div>
      </div>

      {/* Recent Books */}
      <div className=" rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Recently Borrowed Books
          </h3>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-sm border-b text-gray-500">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Borrowed</th>
                <th className="py-2 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {[
                {
                  title: "The Great Gatsby",
                  author: "F. Scott Fitzgerald",
                  borrowed: "May 10",
                  due: "May 20",
                },
                {
                  title: "1984",
                  author: "George Orwell",
                  borrowed: "May 5",
                  due: "May 15",
                },
                {
                  title: "Atomic Habits",
                  author: "James Clear",
                  borrowed: "May 3",
                  due: "May 13",
                },
              ].map((book, idx) => (
                <tr key={idx} className=" hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.borrowed}</td>
                  <td className="py-2 px-4">{book.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
