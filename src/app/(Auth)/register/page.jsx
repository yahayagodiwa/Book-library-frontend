"use client"
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import useAuthStore from "../../../../store";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const page = () => {
const {url} = useAuthStore()
const router = useRouter()
const [loading, setLoading] = useState(false)
    const [formData,  setFormData] = useState({
        username: "",
        email: "",
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
      const response = await axios.post(`${url}user/register`, formData);
      if (response.status === 201) {
        toast.success(response.data.message);
        setInterval(()=>{
            router.push('/login')
        }, 2000)
      } else {
        toast.error(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
    
  return (
    <section className="h-screen flex items-center justify-center">
            <ToastContainer />
        <div className="flex justify-between bg-[#1E2A38] h-[80vh] rounded-xl">
      <div className="p-6 w-full hidden md:flex flex-col ">
        <h2 className="text-2xl font-semibold text-white">Get Started with us</h2>
        <p className="text-gray-200">Sign up to become a member</p>
       <Image src='/images/signup.png' alt="Sign up" width={500} height={600} />
        </div>

      <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6  bg-white p-6 rounded-xl shadow-md w-[90vw] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
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
          className="bg-[#1E2A38] cursor-pointer text-white py-3 rounded-md font-semibold hover:bg-[#111827] transition"
        >
          {loading ?
            <div
            class="w-5 h-5 border-4 text-center mx-auto border-t-blue-500 border-gray-300 rounded-full animate-spin"
            ></div> 
            : "Sign Up"}
                    </button>
        <div className="text-center">
            <p>Already have an account ?</p>
        <Link href='/login' className="text-blue-600">Login</Link>
        </div>
      </form>
      </div>
    </section>
  );
};

export default page;
