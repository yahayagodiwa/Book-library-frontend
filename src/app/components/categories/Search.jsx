import { useState } from "react";

const genres = [
  "All Genres",
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

export default function BookSearchFilter({ onSearch, isOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      searchTerm: searchTerm.trim() || null,
      category: selectedGenre === "All Genres" ? null : selectedGenre,
      isbn: isbn.trim() || null,
      year: year.trim() || null,
    };
    onSearch(filters); // Call parent filter function
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isOpen ? "flex" : "hidden"} w-[90vw] justify-center transition-all duration-300 p-4 max-w-7xl mx-auto rounded-md grid grid-cols-1 md:grid-cols-5 gap-4`}
    >
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <input
        type="text"
        placeholder="Publication Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition"
      >
        Search Books
      </button>
    </form>
  );
}