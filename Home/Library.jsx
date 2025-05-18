const ExploreLibrary = () => {
  // Dummy data — replace with real book data from your backend
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      image: "/images/atomic.jpg",
    },
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      image: "/images/alchemist.jpg",
    },
    {
      title: "Think and Grow Rich",
      author: "Napoleon Hill",
      image: "/images/rich.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki ",
      image: "/images/rich-dad.jpg",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 text-[#1E2A38]" id="books">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore the Library</h2>
        <p className="text-[#374151] mb-10 max-w-2xl mx-auto">
          Discover thousands of books from self-help, fiction, biographies, and more. Borrow what you love.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div key={index} className="bg-[#F3F4F6] rounded-xl p-4 shadow hover:shadow-md transition">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-60 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-[#6B7280]">by {book.author}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/books"
            className="inline-block bg-[#1E2A38] text-white px-6 py-3 rounded-xl hover:bg-[#374151] transition"
          >
            Browse Full Library
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExploreLibrary;
