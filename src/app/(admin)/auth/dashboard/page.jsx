"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import useAuthStore from "../../../../../store";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

export default function AdminDashboardPage() {
  const { user, getUser, books, fetchBooks } = useAuthStore();

  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  useEffect(() => {
    if (!books) fetchBooks();
  }, [books]);

  const dueBooks = useMemo(() => {
    return useAuthStore.getState().getDueBooks();
  }, [user]);

  const totalFine = dueBooks?.reduce((acc, db) => acc + db.fine, 0) || 0;
  const mostLiked = books?.slice().sort((a, b) => b.likes - a.likes).slice(0, 5);

  const chartData = mostLiked?.map(book => ({
    name: book.title.length > 12 ? book.title.slice(0, 12) + "…" : book.title,
    Likes: book.likes,
    Borrowed: book.borrowCount || 0,
  }));

  const pieData = [
    { name: "Verified Users", value: 68 },
    { name: "Unverified Users", value: 32 },
  ];

  const COLORS = ["#10b981", "#f97316"];

  return (
    <div className="min-h-screen p-0 lg:p-10 space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Monitor library performance and insights with real-time data.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-bl from-gray-100 to-gray-300 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-sm font-medium text-gray-500">Total Books</h3>
          <p className="text-3xl font-bold text-indigo-600">{books?.length}</p>
        </div>
        <div className="bg-gradient-to-bl from-gray-100 to-gray-300 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-sm font-medium text-gray-500">Overdue Books</h3>
          <p className="text-3xl font-bold text-rose-600">{dueBooks?.length}</p>
        </div>
        <div className="bg-gradient-to-bl from-gray-100 to-gray-300 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-sm font-medium text-gray-500">Total Fines Collected</h3>
          <p className="text-3xl font-bold text-emerald-600">${totalFine}</p>
        </div>
        <div className="bg-gradient-to-bl from-gray-100 to-gray-300 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-200">
          <h3 className="text-sm font-medium text-gray-500">Your Role</h3>
          <p className="text-3xl font-bold text-purple-600">{user?.role || "Admin"}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className=" rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top Books (Likes vs Borrows)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
              <Bar dataKey="Likes" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Borrowed" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className=" rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            User Verification Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most Popular Books */}
      <div className=" rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Most Liked Books</h3>
          <Link
            href="/books"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {mostLiked?.map((book, i) => (
            <Link href={`/single-book/${book._id}`} key={i}>
              <div className="group bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                <img
                  src={book.bookCover}
                  alt="Book Cover"
                  className="w-full h-48 object-cover rounded-md mb-3 group-hover:scale-105 transition-transform duration-200"
                />
                <h4 className="text-sm font-semibold text-gray-800 truncate">
                  {book.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {book.author?.username || "Unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}