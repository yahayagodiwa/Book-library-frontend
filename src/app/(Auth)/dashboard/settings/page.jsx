"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../../../../../store";

 function Page() {
  const [editing, setEditing] = useState(false);
  const {url, user, getUser, token } = useAuthStore();
  const [formData,  setFormData] = useState({
          username: user?.username,
          email: user?.email,
         
      })

  useEffect(() => {
  
    getUser();
  
}, [user]);

useEffect(() => {
  if (user) {
    setFormData({
      username: user.username,
      email: user.email,
    });
  }
}, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  

  const update = async (e)=>{
    e.preventDefault()
    setEditing(false);
    const res = await axios.patch(`${url}user/update-profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(res.status != 200){
      toast.error(res.data.error)
    }
    const data = res.data
    console.log(data);
    toast.success(data.message)
    
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className=" rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Update Password</h2>
<ToastContainer />
       

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Old Password</label>
            <input
              name="username"
              disabled={!editing}
              value={formData.username || ''}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              name="email"
              type="email"
              disabled={!editing}
              value={formData.email || ''}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
            />
          </div>

          
        </div>

        <div className="mt-6 flex space-x-4">
          {editing ? (
            <>
              <button
                onClick={update}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-[#1E2A38] text-white px-4 py-2 rounded-md hover:bg-[#111827] transition"
            >
              Update Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default Page