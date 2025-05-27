"use client";
import axios from "axios";
import {useState } from "react";
import useAuthStore from "../../../../../../store";
import { toast, ToastContainer } from "react-toastify";

const categories = [
  "General",
  "Fiction",
  "Non-Fiction",
  "Biography",
  "Autobiography",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Historical Fiction",
  "Horror",
  "Self-Help",
  "Health & Wellness",
  "Travel",
  "Science",
  "Technology",
  "Philosophy",
  "Psychology",
  "Religion & Spirituality",
  "Business & Economics",
  "Politics",
  "Education",
  "Art & Photography",
  "Comics & Graphic Novels",
  "Poetry",
  "Young Adult",
  "Children's Books",
  "Cooking",
  "Law",
  "Sports & Outdoors",
  "Parenting",
  "Crafts & Hobbies",
  "True Crime",
  "Memoir",
];

const AddBookForm = () => {
  const { url, token } = useAuthStore();
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fineAmount: "",
    category: "General",
    author: "",
  });

  const [bookCover, setBookCover] = useState(null);
  const handleFile = (e)=>{
    const file = e.target.files[0];
    if (file) {
      setBookCover(file);
    } else {
      setBookCover(null);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true)

    if (!formData.title || !formData.description || !formData.fineAmount || !formData.category || !bookCover) {
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
    form.append("bookCover", bookCover);

    try {
      const res = await axios.post(`${url}admin/record`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200 && res.status !== 201) {
        return toast.error(res.data?.error || "Failed to add book");
        setLoading(false)
      }
      // console.log(res.data);
      toast.success(res.data.message)
      setLoading(false)
      setFormData({
        title: "",
        description: "",
        fineAmount: "",
        category: "General",
        author: "",
      });
        setBookCover(null);
        setInterval(()=>{
          window.location.href = '/auth/dashboard/books'
        }, 2000)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-3xl mx-auto mb-10">
      <h2 className="text-3xl font-bold text-[#1E2A38] mb-8">Add New Book</h2>
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Book Cover (JPG, PNG, GIF) *
          </label>
          <input

            type="file"
            name="bookCover"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFile}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 cursor-pointer text-white font-bold py-3 rounded-lg transition duration-200 shadow-md"
          >
           {loading ? "Uploading......": " Upload Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBookForm;
