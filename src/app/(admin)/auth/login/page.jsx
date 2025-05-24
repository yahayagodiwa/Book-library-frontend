"use client"
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import useAuthStore from "../../../../../store";

const page = () => {
    const {url} = useAuthStore()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
        const [formData,  setFormData] = useState({
            username: "",
            password: ""
        })
        
    // console.log('url', url);
    // console.log(useAuthStore.getState().url)
    
        const handleChange = (e)=>{
            const {name, value} = e.target
            setFormData((prev)=>({
                ...prev,
                [name] : value
            }))
        }
    
         const handleSubmit = async (e) => {
            e.preventDefault()
        setLoading(true);
        try {
          const response = await axios.post(`${url}admin/login`, formData);
          // console.log(response);
          
          if (response.status === 200) {
            const data = response.data
            localStorage.setItem('token', data.token)
            toast.success(data.message);
           
                router.push('/auth/dashboard')
           
          } else {
            toast.error(response.data.error || 'Something went wrong');
          }
        } catch (error) {
          toast.error(error.response?.data?.error);
        } finally {
          setLoading(false);
        }
      };
        
  return (
    <section className="h-screen flex items-center justify-center w-full md:w-[35vw] mx-auto">
        <ToastContainer />
      <form 
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6  bg-white p-6 md:py-10 rounded-xl shadow-md  md:w-full">
        <h2 className="text-2xl font-semibold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        <button
          type="submit"
          className="bg-[#1E2A38] text-white py-3 rounded-md font-semibold hover:bg-[#111827] transition cursor-pointer"
        >
        {loading ?
            <div
            class="w-5 h-5 border-4 text-center mx-auto border-t-blue-500 border-gray-300 rounded-full animate-spin"
            ></div> 
            : "Login"}
        </button>
      </form>
     
    </section>
  );
};

export default page;
