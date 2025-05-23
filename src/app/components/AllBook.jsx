"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../../../Home/Navbar';
import useAuthStore from '../../../store';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GenreSlider from '@/app/components/categories/Genre';
import GenreD from '@/app/components/categories/GenreData';
import Footer from '../../../Home/Footer';
import BlogSnippet from '@/app/components/Blog/Posts';
import Link from 'next/link';

const Allbook = () => {
  const { books, fetchBooks } = useAuthStore();
  


  useEffect(() => {
   if(!books){
    fetchBooks()
   }
  }, []);

  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  const heroContent = [
    {
      image: "/images/lab-bg.jpg",
      title: "THOUSANDS OF BOOKS. 100% ACCESSIBLE",
      description:
        "Welcome to your school library — your go-to place for research, reading, and discovery. Search, borrow, and return with ease.",
    },
    {
      image: "/images/lab-bg1.jpg",
      title: "ORGANIZED. RELIABLE. EFFICIENT.",
      description:
        "Manage borrowing records, track overdue books, and stay updated — all in one place. Designed for students, teachers, and librarians.",
    },
    {
      image: "/images/lab-bg2.jpg",
      title: "POWERED FOR LEARNING",
      description:
        "From textbooks to fiction, keep your library running smoothly with a smart system that supports academic success.",
    },
  ];

  return (
    <>
      <Navbar />
    <section className="min-h-screen relative bg-[#F3F4F6] overflow-x-hidden pt-16">

      {/* Hero Carousel */}
      <Slider {...settings}>
  {heroContent.map((slide, i) => (
    <div className="relative h-80 w-full md:pt-10">
  <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black/50 z-0"></div>
  <div className="relative z-10 p-10 text-white text-center">
    <h1 className="text-3xl font-bold">{slide.title}</h1>
    <p className="font-medium text-xl md:w-[50vw] mx-auto mt-2">{slide.description}</p>
  </div>
</div>

  ))}
</Slider>


      {/* Book Sections */}
      <div className="px-4 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A38] mb-6">
          Recent Books
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6" 
        >
          {books?.slice(0, 18).map((book) => (
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
           <div className="text-center mt-6">
       <Link href='/books'> <button className="bg-[#60A5FA] cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-500 transition">
          View All Books
        </button></Link>
      </div>

       {/* <GenreSlider /> */}

       <GenreD />
      
      </div>
      <BlogSnippet />

      <Footer />
    </section>
    </>
  );
};

export default Allbook;
