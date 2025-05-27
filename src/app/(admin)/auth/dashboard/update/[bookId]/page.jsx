"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../../../../../../../store";
import { useParams } from "next/navigation";

const categories = [
  "General", "Fiction", "Non-Fiction", "Biography", "Autobiography", "Science Fiction",
  "Fantasy", "Mystery", "Thriller", "Romance", "Historical Fiction", "Horror", "Self-Help",
  "Health & Wellness", "Travel", "Science", "Technology", "Philosophy", "Psychology",
  "Religion & Spirituality", "Business & Economics", "Politics", "Education",
  "Art & Photography", "Comics & Graphic Novels", "Poetry", "Young Adult", "Children's Books",
  "Cooking", "Law", "Sports & Outdoors", "Parenting", "Crafts & Hobbies", "True Crime", "Memoir",
];

const page = () => {
  const { url, token } = useAuthStore();
  const { bookId } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [bookCover, setBookCover] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fineAmount: "",
    category: "General",
    author: "",
  });

   // Update formData after book is fetched
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        description: book.description || "",
        fineAmount: book.fineAmount || "",
        category: book.category || "General",
        author: book.author || "",
      });
    }
  }, [book]);

  // Fetch Book Details
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${url}book/single-book/${bookId}`);
        if (res.status === 200) {
          setBook(res.data.book);
        } else {
          toast.error(res.data.error || "Failed to fetch book details.");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error("Failed to fetch book details.");
      }
    };
    fetchBook();
  }, [bookId]);

 

  const handleFile = (e) => {
    const file = e.target.files[0];
    setBookCover(file || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update Book
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!formData.title || !formData.description || !formData.fineAmount || !formData.category) {
      return toast.error("Please fill all required fields.");
    }

    if (isNaN(formData.fineAmount) || formData.fineAmount <= 0) {
      return toast.error("Fine amount must be a positive number.");
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("fineAmount", formData.fineAmount);
    form.append("category", formData.category);
    form.append("author", formData.author);
    if (bookCover) form.append("bookCover", bookCover);

    try {
      const res = await axios.patch(`${url}admin/update-book/${bookId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        toast.success(res.data.message );
        setLoading(false);
        // console.log(res.data);
        setInterval(()=>{
            window.location.reload();
        }, 1000)
        
        setFormData({
          title: "",
          description: "",
          fineAmount: "",
          category: "General",
          author: "",
        });
        setBookCover(null);
      } else {
        toast.error("Failed to update book.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong while updating the book.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl font-bold text-[#1E2A38] mb-8">Update Book</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Enter book description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fine Amount *</label>
            <input
              type="number"
              name="fineAmount"
              value={formData.fineAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              placeholder="e.g. 500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Change Book Cover</label>
          <input
            type="file"
            name="bookCover"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFile}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
          {book?.bookCover && (
            <img
              src={book.bookCover}
              alt="Current book cover"
              className="mt-4 h-40 rounded shadow border object-cover"
            />
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-indigo-500 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md"
          >
           {loading ? "Processing…": "Update Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
