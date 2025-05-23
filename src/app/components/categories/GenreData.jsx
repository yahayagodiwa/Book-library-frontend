const genreData = [
  { name: "Fiction", image: "/images/fiction.jpg" },
  { name: "Romance", image: "/images/romance.jpg" },
  { name: "Mystery", image: "/images/mystery.jpg" },
  { name: "Thriller", image: "/images/thriller.jpg" },
  { name: "Science Fiction", image: "/images/sfiction.jpg" },
  { name: "Fantasy", image: "/images/fantasy.jpg" },
  { name: "Non-Fiction", image: "/images/nfiction.jpg" },
  { name: "Biography", image: "/images/biography.jpg" },
  { name: "Historical Fiction", image: "/images/lab-bg.jpg" },
  { name: "Self-Help", image: "/images/shelp.jpg" },
  { name: "Horror", image: "/images/horror.jpg" },
  { name: "Young Adult", image: "/images/yadult.jpg" },
]

 function GenreD() {
  return (
    <section className="mt-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#1E2A38] mb-6">
        Popular Genres
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genreData.map((genre) => (
          <div
            key={genre.name}
            className="rounded-xl overflow-hidden hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-3 text-center font-semibold text-[#1E2A38]">
              {genre.name}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="bg-[#60A5FA] text-white px-6 py-2 rounded-full hover:bg-blue-500 transition">
          View All Genres
        </button>
      </div>
    </section>
  );
}
export default GenreD