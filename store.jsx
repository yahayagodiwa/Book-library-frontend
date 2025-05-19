const { create } = require("zustand");


const useAuthStore = create((set, get)=>({
    url: "https://book-library-94kz.onrender.com/",
    // token: localStorage.getItem('token')
}))

export default useAuthStore