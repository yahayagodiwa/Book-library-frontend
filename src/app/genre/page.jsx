"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../Home/Navbar';
import useAuthStore from '../../../store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from '../../../Home/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

const page = () => {
  const { url} = useAuthStore();
  const [books, setBooks] = useState()
  const [error, setError] = useState()
  const searchParam = useSearchParams()
// console.log(error);

  const category = searchParam.get('category')
//   console.log(category);
  
  useEffect(()=>{
    
    const getBooks = async () => {
  try {
    const res = await axios.get(`${url}book/all-book-by-category?category=${category}`);

    if (res.status === 200) {
      setBooks(res.data.books || []);
      setError(null); // Clear previous errors
    } else {
      setError(res.data.error || 'Failed to fetch books.');
      setBooks([]);
    }
  } catch (err) {
    // Network error or unexpected issue
    console.error("Fetch error:", err);
    setError(err.response?.data?.error || 'An unexpected error occurred.');
    setBooks([]);
  }
};


    getBooks()

  },[])


  
  return (
    <>
      <Navbar />
    <section className="min-h-screen relative bg-[#F3F4F6] overflow-x-hidden pt-16">


      {/* Book Sections */}
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A38] mb-6">
          Books in {category}
        </h2>

        <h3 className='text-xl text-center font-semibold text-red-500 pb-16 py-6'>{error}</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6" 
        >
          {books?.map((book) => (
            <div
              key={book._id}
              
              className="bg-white rounded-lg p-3 shadow hover:shadow-lg transition w-full"
            > <Link href={`/single-book/${book._id}`}>
              <div className=" aspect-[3/4] w-full bg-gray-100 rounded overflow-hidden mb-3">
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
    

      <Footer />
    </section>
    </>
  );
};

export default page;
