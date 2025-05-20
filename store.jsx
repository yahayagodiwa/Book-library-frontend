import axios from "axios";


const { create } = require("zustand");


const useAuthStore = create((set, get)=>({
    url: "https://book-library-94kz.onrender.com/",
    user: null,
    books: null,
    token: localStorage.getItem('token'),

    setUser: (user)=> set({user}),
    setBooks: (books)=> set({books}),


    getUser: async ()=>{
        const {url}= get()
        const res = await axios.get(`${url}user/dashboard`, {headers : {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        const data = res.data
        // console.log(data.user);
            set({user: data.user})
    },
////---------------------------- Due books ----------------------------- ////////////

fetchBooks: async () => {
    const {url} = get()
      const res = await axios.get(`${url}book/all-book`);
      const data = res.data.books;
      set({books: data});
      console.log(data);
      
      
    },

////---------------------------- Due books ----------------------------- ////////////

   getDueBooks: () => {
    const { user } = get();
    const today = new Date();

    if (!user || !user.borrows) return [];

    return user.borrows.filter((borrow) => {
      const returnDate = new Date(borrow.returnDate);
      return returnDate < today && !borrow.returned;
    });
  },

}))

export default useAuthStore