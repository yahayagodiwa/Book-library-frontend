import { useState } from "react";

const genres = [
  "All Genres",
  "Science",
  "Technology",
  "Literature",
  "Medicine",
  "Law",
  "Mathematics",
  "Engineering",
  "Arts",
];

const departments = [
  "All Departments",
  "Computer Science",
  "Physics",
  "English",
  "Law",
  "Biology",
  "Economics",
  "History",
];

export default function BookSearchFilter({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      searchTerm,
      genre: selectedGenre === "All Genres" ? null : selectedGenre,
      department: selectedDept === "All Departments" ? null : selectedDept,
      year: year || null,
    };
    onSearch(filters); // Call parent filter function
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-md grid grid-cols-1 md:grid-cols-4 gap-4"
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

      <select
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      >
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Year (e.g. 2022)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      <button
        type="submit"
        className="md:col-span-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Search Books
      </button>
    </form>
  );
}
