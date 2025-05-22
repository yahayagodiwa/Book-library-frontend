"use client"

import axios from 'axios'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import useAuthStore from '../../../store'
import { FaStar } from 'react-icons/fa'

const  BookReview = ({id}) => {
    const [loading, setLoading] = useState(false)
    const {url, token} = useAuthStore()
    const [ratings, setRatings] = useState(0)
    const [comment, setComment] = useState('')

    const maxRating = 5


    const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${url}book/review/${id}`,
      {
        comment: comment,
        rating: ratings
      }, // this is the request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;
    console.log(data);
    toast.success(data.message);
  } catch (error) {
    const errorMsg = error.response?.data?.error || "Something went wrong";
    toast.error(errorMsg);
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='h-[80vh] flex justify-center items-center'>
        <ToastContainer />
        <form 
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6  p-6 rounded-xl w-[90vw] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold">Drop a review</h2>
        <div className='flex'>
            {Array(maxRating).fill().map((_, i)=>{
                const starvalue = i + 1 

                return(
                    <span key={starvalue} onClick={()=>setRatings(starvalue)}
                    className={`cursor-pointer text-xl transition duration-300 ${
                              starvalue <= ratings ? "text-yellow-300" : "text-gray-700"
                            }`}
                    >
                        <FaStar />
                    </span>
                )
            })}
        </div>

        <label htmlFor="comment" className='flex flex-col gap-2'>
        Reason:
        <textarea
          type="text"
          required
          placeholder="What are you borrowing for"
          name="comment"
          onChange={(e)=>setComment(e.target.value)}
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        </label>
        <button
          type="submit"
          className="bg-[#1E2A38] text-white py-3 rounded-md font-semibold hover:bg-[#111827] transition cursor-pointer"
        >
        {loading ?
            <div
            class="w-5 h-5 border-4 text-center mx-auto border-t-blue-500 border-gray-300 rounded-full animate-spin"
            ></div> 
            : "Borrow"}
        </button>
       
      </form>
    </div>
  )
}

export default BookReview