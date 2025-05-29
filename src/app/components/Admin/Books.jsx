"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import useAuthStore from "../../../../store";

 function BookCatal() {
  const { books, fetchBooks, token, url } = useAuthStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  useEffect(() => {
    if (!books) {
      fetchBooks();
    }
  }, [books]);

  const deleteBook = async (bookId) => {
    try {
      const res = await axios.delete(`${url}admin/delete-book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message);
        fetchBooks(); // Refresh the book list
      } else {
        toast.error("Failed to delete book.");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || "Something went wrong while deleting the book."
      );
    }
  };

  const genres = [...new Set(books?.map((book) => book.category).filter(Boolean))];
  const authors = [...new Set(books?.map((book) => book.author).filter(Boolean))];

  const filteredBooks = books?.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = selectedGenre ? book.category === selectedGenre : true;
    const matchesAuthor = selectedAuthor ? book.author === selectedAuthor : true;

    return matchesSearch && matchesGenre && matchesAuthor;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-white p-2 md:p-6 mb-12">
      <ToastContainer />
      <div className="md:max-w-7xl mx-auto space-y-8">
      
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title or ISBN"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:outline-none"
          />

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600 w-full md:w-auto"
          >
            <option value="">All Genres</option>
            {genres.map((genre, i) => (
              <option key={i} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600 w-full md:w-auto"
          >
            <option value="">All Authors</option>
            {authors.map((author, i) => (
              <option key={i} value={author}>
                {author}
              </option>
            ))}
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
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-800">
              {filteredBooks?.map((book, i) => (
                <tr key={i} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{book.title}</td>
                  <td className="px-6 py-4 text-blue-600 whitespace-nowrap">
                    {book.author}
                  </td>
                  <td className="px-6 py-4">{book.isbn || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                      {book.category || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-500 font-medium space-x-2">
                    <Link href={`/auth/dashboard/update/${book._id}`}>
                      <button className="hover:underline cursor-pointer">Edit</button>
                    </Link>
                    <span>|</span>
                    <button
                      className="hover:underline text-red-500 cursor-pointer"
                      onClick={() => deleteBook(book._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBooks?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookCatal