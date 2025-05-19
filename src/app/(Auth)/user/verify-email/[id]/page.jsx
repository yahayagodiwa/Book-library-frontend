"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import { useParams, useRouter } from 'next/navigation'
import useAuthStore from "../../../../../../store";

const page = () => {
const {url} = useAuthStore()
const router = useRouter()
const {id} = useParams()


// console.log('url', url);
// console.log(useAuthStore.getState().url)
useEffect(()=>{

const verify = async ()=>{
  const res = await axios.get(`${url}user/verify-email/${id}`)
  toast.success(res.data.message)
  setInterval(()=>{
    router.push('/login')
  }, 2000)
}
verify()
  }, [])

  
    
  return (
    <section className="h-screen flex items-center justify-center">
            <ToastContainer />
    
       

    
     
    </section>
  );
};

export default page;
