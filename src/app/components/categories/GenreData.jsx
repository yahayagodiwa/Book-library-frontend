const genreData = [
  { name: "Science", image: "/images/lab-bg.jpg" },
  { name: "Engineering", image: "/images/lab-bg.jpg" },
  { name: "Technology", image: "/images/lab-bg.jpg" },
  { name: "Medicine", image: "/images/lab-bg.jpg" },
  { name: "Law", image: "/images/lab-bg.jpg" },
  { name: "Arts", image: "/images/lab-bg.jpg" },
  { name: "Social Sciences", image: "images/lab-bg.jpg" },
  { name: "Education", image: "/images/lab-bg.jpg" },
  { name: "Agriculture", image: "/images/lab-bg.jpg" },
  { name: "History", image: "/images/lab-bg.jpg" },
  { name: "Literature", image: "/images/lab-bg.jpg" },
  { name: "Mathematics", image: "/images/lab-bg.jpg" },
];

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