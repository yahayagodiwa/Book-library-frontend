import React from 'react'

const page = () => {
  return (
    <div>
         <div className=" rounded-md shadow-lg ">
        <div className="flex items-center justify-between py-4">
          <h3 className="text-lg font-semibold text-gray-800 ">
            Recently Borrowed Books
          </h3>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-800 bg-gray-200">
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Author</th>
                <th className="py-2 px-4">Borrowed</th>
                <th className="py-2 px-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {[
                {
                  title: "The Great Gatsby",
                  author: "F. Scott Fitzgerald",
                  borrowed: "May 10",
                  due: "May 20",
                },
                {
                  title: "1984",
                  author: "George Orwell",
                  borrowed: "May 5",
                  due: "May 15",
                },
                {
                  title: "Atomic Habits",
                  author: "James Clear",
                  borrowed: "May 3",
                  due: "May 13",
                },
              ].map((book, idx) => (
                <tr key={idx} className=" hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4">{book.author}</td>
                  <td className="py-2 px-4">{book.borrowed}</td>
                  <td className="py-2 px-4">{book.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
    </div>
  )
}

export default page