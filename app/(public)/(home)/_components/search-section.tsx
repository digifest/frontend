"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchSection() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log("Searching for:", query);
    }
  };

  return (
    <section className="bg-white py-40 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Find What You Need
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Search by course, department, or keyword to discover materials
          instantly.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 max-w-xl mx-auto"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              className="w-full rounded-full border border-gray-300 py-3 px-5 pr-12 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary duration-300"
              placeholder="e.g. CSC201, Engineering notes, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <FiSearch className="absolute right-4 top-3.5 text-gray-400 text-xl" />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary hover:bg-primary/80 cursor-pointer px-6 py-3 text-black font-medium transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
