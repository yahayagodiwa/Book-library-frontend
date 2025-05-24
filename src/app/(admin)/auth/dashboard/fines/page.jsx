"use client";

import React from "react";
// import clockImage from "./clock.png"; // Placeholder for clock image

const Page = () => {
  const currentLoans = [
    { member: "Ethan Harper", bookTitle: "The Secret Garden", loanDate: "2024-07-15", dueDate: "2024-08-15", status: "Active" },
    { member: "Olivia Bennett", bookTitle: "Pride and Prejudice", loanDate: "2024-07-20", dueDate: "2024-08-20", status: "Active" },
    { member: "Noah Carter", bookTitle: "To Kill a Mockingbird", loanDate: "2024-07-25", dueDate: "2024-08-25", status: "Active" },
    { member: "Ava Thompson", bookTitle: "1984", loanDate: "2024-07-30", dueDate: "2024-08-30", status: "Active" },
    { member: "Liam Foster", bookTitle: "The Great Gatsby", loanDate: "2024-08-01", dueDate: "2024-09-01", status: "Active" },
  ];

  const overdueLoans = [
    { member: "Sophia Clark", bookTitle: "The Catcher in the Rye", loanDate: "2024-06-15", dueDate: "2024-07-15", status: "Overdue" },
    { member: "Jackson Reed", bookTitle: "The Hobbit", loanDate: "2024-06-20", dueDate: "2024-07-20", status: "Overdue" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center sm:text-left mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Loans Management</h1>
          <p className="mt-2 text-sm text-gray-600">Track and manage book loans and returns</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search members, books, or dates..."
              className="w-full p-3 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 7.65 7.5 7.5 0 1116.65 16.65z" />
              </svg>
            </span>
          </div>
        </div>

        {/* Current Loans */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Loans</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4 font-medium text-gray-600">Member</th>
                  <th className="p-4 font-medium text-gray-600">Book Title</th>
                  <th className="p-4 font-medium text-gray-600">Loan Date</th>
                  <th className="p-4 font-medium text-gray-600">Due Date</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLoans.map((loan, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-4">{loan.member}</td>
                    <td className="p-4">{loan.bookTitle}</td>
                    <td className="p-4">{loan.loanDate}</td>
                    <td className="p-4">{loan.dueDate}</td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">
                        Return
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Overdue Loans */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overdue Loans</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4 font-medium text-gray-600">Member</th>
                  <th className="p-4 font-medium text-gray-600">Book Title</th>
                  <th className="p-4 font-medium text-gray-600">Loan Date</th>
                  <th className="p-4 font-medium text-gray-600">Due Date</th>
                  <th className="p-4 font-medium text-gray-600">Status</th>
                  <th className="p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {overdueLoans.map((loan, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-4">{loan.member}</td>
                    <td className="p-4">{loan.bookTitle}</td>
                    <td className="p-4">{loan.loanDate}</td>
                    <td className="p-4">{loan.dueDate}</td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors">
                        Contact Member
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decorative Clock Image */}
        <div className="mt-8 flex justify-center">
          {/* <img src={clockImage} alt="Clock" className="w-48 opacity-50" /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;