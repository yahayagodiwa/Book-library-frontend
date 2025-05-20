"use client"

import axios from 'axios'
import React, { useState } from 'react'
import useAuthStore from '../../../../store'
import { toast, ToastContainer } from 'react-toastify'

const  BorrowModal = ({id}) => {
    const [loading, setLoading] = useState(false)
    const {url, token} = useAuthStore()
    const [formData,  setFormData] = useState({
        borrowNote: '',
        returnDate: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await axios.post(
      `${url}book/borrow-book/${id}`,
      formData, // this is the request body
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
      className="flex flex-col space-y-6  bg-white p-6 rounded-xl shadow-md w-[90vw] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold">Borrow Details</h2>
        <label htmlFor="borrowNote" className='flex flex-col gap-2'>
        Reason:
        <textarea
          type="text"
          placeholder="What are you borrowing for"
          name="borrowNote"
          onChange={handleChange}
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        </label>
        <label htmlFor="returnDate" className='flex flex-col gap-2'>
            Return Date:
        <input
          type="date"
          placeholder="Return data"
          name="returnDate"
          onChange={handleChange}
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

export default BorrowModal