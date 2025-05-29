"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import ReturnedBooks from "@/app/components/Admin/ReturnedBooks";
import BorrowedBooks from "@/app/components/Admin/Borrows";
import BookCatal from "@/app/components/Admin/Books";

export default function BookCatalog() {
  const [selected, setSelected] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-white p-6 mb-12">
      <ToastContainer />
      <div className=" w-full md:max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Book Catalog</h1>
            <p className="text-gray-500 mt-1">
              Search and manage your book collection.
            </p>
          </div>
          <Link href="/auth/dashboard/record">
            {" "}
            <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Add Book
            </button>
          </Link>
        </div>
        <div className="flex justify-around items-center">
          <button
            onClick={() => setSelected("all")}
            className={`cursor-pointer px-4 py-2 rounded-lg shadow transition ${
              selected === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
            All Books
          </button>

          <button
            onClick={() => setSelected("borrows")}
            className={`cursor-pointer px-4 py-2 rounded-lg shadow transition ${
              selected === "borrows"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
           Borrows
          </button>

          <button
            onClick={() => setSelected("returns")}
            className={`cursor-pointer px-4 py-2 rounded-lg shadow transition ${
              selected === "returns"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 hover:bg-blue-100"
            }`}
          >
           Returns
          </button>
        </div>

        <div>
          {selected === "returns" && <ReturnedBooks />}
          {selected === "borrows" && <BorrowedBooks />}
          {selected === "all" && <BookCatal />}
        </div>
      </div>
    </div>
  );
}
