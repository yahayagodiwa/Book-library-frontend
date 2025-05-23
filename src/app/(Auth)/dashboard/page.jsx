"use client";

import { useEffect, useMemo } from "react";
import useAuthStore from "../../../../store";
import Link from "next/link";
// import Image from "next/image";

export default function DashboardPage() {
  const { user, getUser, books, fetchBooks } = useAuthStore();
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  useEffect(()=>{
    if(!books){
      fetchBooks()
    }
  },[books])

 const dueBooks = useMemo(() => {
    return useAuthStore.getState().getDueBooks();
  }, [user]); 

  
  // console.log(user);

 const mostLiked = books?.slice().sort((a, b) => b.likes - a.likes);
console.log(mostLiked);

 
  // console.log(dueBooks);
  let totalFine = 0;

  dueBooks?.forEach((db) => {
    totalFine += db.fine;
  });

  return (
    <>
   
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
      <div className=" rounded-md shadow-lg ">
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-gray-800 ">
            Most Popular Books
          </h3>
        <Link href='/books'> <button className="text-blue-600 hover:underline cursor-pointer">View All</button></Link>
        </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 p-4 mb-10">
  {mostLiked?.slice(0, 6).map((book, i) => (
    <Link href={`/single-book/${book._id}`} key={i}>
    <div
      
      className="rounded-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center text-center p-4"
    >
      <img
        src={book.bookCover}
        alt="book cover"
        className="w-full max-h-90 rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author?.username || 'Unknown Author'}</p>
    </div>
    </Link>
  ))}
</div>

      </div>
    </div>
    </>
  );
}
