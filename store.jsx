// store.js
import axios from "axios";
import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  url: "https://book-library-94kz.onrender.com/",
  user: null,
  books: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setUser: (user) => set({ user }),
  setBooks: (books) => set({ books }),

  getUser: async () => {
    const { url } = get();
    try {
      const res = await axios.get(`${url}user/dashboard`, {
        headers: {
          Authorization: `Bearer ${
            typeof window !== "undefined" ? localStorage.getItem("token") : null
          }`,
        },
      });
      const data = res.data;
      set({ user: data.user });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  },

  fetchBooks: async () => {
    const { url } = get();
    try {
      const res = await axios.get(`${url}book/all-book`);
      const data = res.data.books;
      set({ books: data });
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  },

  getDueBooks: () => {
    const { user } = get();
    const today = new Date();

    if (!user || !user.borrows) return [];

    return user.borrows.filter((borrow) => {
      const returnDate = new Date(borrow.returnDate);
      return returnDate < today && !borrow.returned;
    });
  },
}));

export default useAuthStore;