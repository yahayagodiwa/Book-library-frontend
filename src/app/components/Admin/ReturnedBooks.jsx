"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useAuthStore from "../../../../store";

const ReturnedBooks = () => {
  const { token, url } = useAuthStore();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReturnedBooks = async () => {
    try {
      const res = await axios.get(`${url}admin/returned-books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(res.data.books);
    } catch (err) {
      console.error("Error fetching returned books:", err);
    } finally {
      setLoading(false);
    }
  };

  const confirmReturn = async (id) => {
    try {
     const res = await axios.patch(`${url}admin/confirm-returns/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if(res.status !== 200 || res.status !== 201){
        toast.error(res.data.error)
      }
      toast.success(res.data.message)
      fetchReturnedBooks(); // Refresh list
    } catch (err) {
      console.error("Error confirming return:", err);
    }
  };

  useEffect(() => {
    fetchReturnedBooks();
  }, []);

  const filteredBooks = books.filter((item) => {
    const title = item?.book?.title?.toLowerCase() || "";
    const author = item?.book?.author?.toLowerCase() || "";
    return (
      title.includes(search.toLowerCase()) ||
      author.includes(search.toLowerCase())
    );
  });

  if (loading) return <div className="text-center py-10">Loading returned books...</div>;

  return (
    <div className="p-2 md:p-6 overflow-x-auto">
        <ToastContainer />
      <h2 className="text-3xl font-bold mb-6"> Returned Books</h2>

      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded-md w-full md:w-1/2"
      />

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Author</th>
              <th className="p-3 border-b">Borrower</th>
              <th className="p-3 border-b">Borrowed On</th>
              <th className="p-3 border-b">Return Date</th>
              <th className="p-3 border-b">Fine</th>
              <th className="p-3 border-b text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((item) => {
              const book = item.book;
              return (
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{book?.title || "N/A"}</td>
                  <td className="p-3">{book?.author || "N/A"}</td>
                  <td className="p-3">
                    {item.user?.username} <br />
                    <span className="text-sm text-gray-500">{item.user?.email}</span>
                  </td>
                  <td className="p-3">{new Date(item.borrowDate).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(item.returnDate).toLocaleDateString()}</td>
                  <td className="p-3 text-red-600">₦{item.fine}</td>
                  <td className="p-3 text-center">
                    {item.confirmed ? (
                      <span className="text-green-600 font-medium">✅ Confirmed</span>
                    ) : (
                      <button
                        onClick={() => confirmReturn(item._id)}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer  text-white px-3 py-1 rounded-md text-sm"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReturnedBooks;
