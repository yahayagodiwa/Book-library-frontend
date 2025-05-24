"use client";

import React from "react";

const books = [
  {
    title: "The Secret Garden",
    author: "Frances Bennett",
    isbn: "978-0140620070",
    genre: "Children’s Literature",
    date: "1911-01-01",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    genre: "Classic Literature",
    date: "1813-01-28",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    genre: "Southern Gothic",
    date: "1960-07-11",
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    genre: "Dystopian Fiction",
    date: "1949-06-08",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    genre: "Jazz Age",
    date: "1925-04-10",
  },
  {
    title: "Moby Dick",
    author: "Herman Melville",
    isbn: "978-0142437247",
    genre: "Adventure Fiction",
    date: "1851-10-18",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    isbn: "978-0143035005",
    genre: "Historical Fiction",
    date: "1869-01-01",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0316769488",
    genre: "Coming-of-Age Fiction",
    date: "1951-07-16",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
    isbn: "978-0060883287",
    genre: "Magical Realism",
    date: "1967-05-30",
  },
  {
    title: "The Odyssey",
    author: "Homer",
    isbn: "978-0140268867",
    genre: "Epic Poetry",
    date: "0800 BC",
  },
];

export default function BookCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-white p-6 mb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Book Catalog</h1>
            <p className="text-gray-500 mt-1">
              Search and manage your book collection.
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Add Book
          </button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:outline-none"
          />
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600">
            <option>Genre</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600">
            <option>Author</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600">
            <option>Publication Date</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">ISBN</th>
                <th className="px-6 py-3">Genre</th>
                <th className="px-6 py-3">Publication Date</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {books.map((book, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 text-blue-600 whitespace-nowrap">{book.author}</td>
                  <td className="px-6 py-4">{book.isbn}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {book.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4">{book.date}</td>
                  <td className="px-6 py-4 text-sm text-blue-500 font-medium space-x-2">
                    <button className="hover:underline">Edit</button>
                    <span>|</span>
                    <button className="hover:underline text-red-500">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
