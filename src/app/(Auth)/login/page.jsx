import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <section className="h-screen flex items-center justify-center">
        <div className="flex justify-between bg-[#1E2A38] h-[80vh] rounded-xl">
      <div className="p-6 w-full hidden md:flex flex-col space-y-6 ">
        <h2 className="text-2xl font-semibold text-white">Welcome back!</h2>
        <p className="text-gray-200">Complete these easy steps to login</p>
        <button  className="text-[#1E2A38] bg-white py-3 rounded-md font-semibold hover:bg-gray-300 transition ">Fill in your details</button>
        <button className="text-[#1E2A38] bg-white py-3 rounded-md font-semibold transition hover:bg-gray-300">Click Login</button>
        <button className="text-[#1E2A38] bg-white py-3 rounded-md font-semibold transition hover:bg-gray-300">Boom!</button>
      </div>

      <form className="flex flex-col space-y-6  bg-white p-6 rounded-xl shadow-md w-[90vw] md:w-full max-w-md">
        <h2 className="text-2xl font-semibold">Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] transition"
        />
        <button
          type="submit"
          className="bg-[#1E2A38] text-white py-3 rounded-md font-semibold hover:bg-[#111827] transition"
        >
          Login
        </button>
        <div className="text-center flex flex-col">
            <p>Don't have an account ?</p>
        <Link href='/register' className="text-blue-600">Sign Up</Link>
        <Link href='/login' className="text-blue-600">Forgot Password</Link>
        </div>
      </form>
      </div>
    </section>
  );
};

export default page;
