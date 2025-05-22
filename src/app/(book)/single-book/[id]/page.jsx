"use client";
import React, { useEffect, useState, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../../../../../Home/Navbar";
import Footer from "../../../../../Home/Footer";
import useAuthStore from "../../../../../store";
import axios from "axios";
import { AiOutlineLike } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import Link from "next/link";
import Modal from "@/app/Modal";
import BorrowModal from "@/app/components/Modals/BorrowModal";
import BookReview from "@/app/components/BookReview";

export default function SingleBookPage() {
  const { id } = useParams();
  const { url, books, fetchBooks, token } = useAuthStore();
  const [book, setBook] = useState();
  const [reviews, setReviews] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [isModal, setIsModal] = useState()

  console.log(reviews);

  // Get all books
  useEffect(() => {
    if (!books) {
      fetchBooks();
    }
  }, [books]);

  // Get single book
  const getBook = async () => {
    try {
      const res = await axios.get(`${url}book/single-book/${id}`);
      if (res.status !== 200) {
        toast.error(res.data?.error || "Failed to fetch book");
      }
      const data = res.data.book;
      setBook(data);
      setReviews(data.reviews);
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(error);
    }
  };

  useEffect(() => {
    getBook();
  }, [id, url]); 

  // Like book
  const likeBook = useCallback(async () => {
    try {
      const res = await axios.post(
        `${url}book/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      getBook(); 
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      console.error(error);
    }
  }, [id, token, url]);

  const recentBooks = books?.filter((book) => book.category === book.category); // Fix this filter (see below)

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-30">
        <ToastContainer />
        {/* Book Info */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={book?.bookCover}
            alt="Book Cover"
            className="w-48 h-64 object-cover rounded shadow"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
            <p className="text-gray-600 mb-1">
              by <span className="font-semibold">{book?.author?.username}</span>
            </p>
            <p className="text-sm text-blue-600 mb-4">Genre: {book?.category}</p>
            <p className="text-gray-700 mb-4">{book?.description}</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              Borrow Book
            </button>
            <div className="flex gap-4 my-4">
              <AiOutlineLike size={20} onClick={likeBook} className="cursor-pointer" />
              <span>{book?.likes} Likes</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12">
          <div className="flex gap-6 items-center ">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <button className="bg-blue-600 text-white mb-4 px-2 py-1 cursor-pointer rounded-2xl"
            onClick={()=>setIsModal(true)}
            >Write a Review</button>
          </div>
          <h3 className="text-xl font-semibold text-gray-400">
            {reviews?.length <= 0 ? "No review yet" : ""}
          </h3>
          {reviews?.map((review) => (
            <div key={review.id} className="mb-6 pb-4">
              <p className="font-semibold py-2">{review.reviewAuthor.username}</p>
              <div className="flex items-center mb-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Related Books */}
        <div className="px-4 py-10 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A38] mb-6">
            Related Books
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recentBooks?.slice(0, 8).map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition w-full"
              >
                <Link href={`/single-book/${book._id}`}>
                  <div className="aspect-[3/4] w-full bg-gray-100 rounded overflow-hidden mb-3">
                    <img
                      src={book.bookCover}
                      alt={book.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-[#111827] text-lg mb-1 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-500">{book.author.username}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <BorrowModal modalOpen id={id} />
      </Modal>

       <Modal isOpen={isModal} onClose={() => setIsModal(false)}>
       <BookReview isModal id={id} />
      </Modal>
      <Footer />
    </>
  );
}