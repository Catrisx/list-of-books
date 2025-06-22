import React from "react";
import { useState, useEffect } from "react";
import { FaBook } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "./ListOfBooks.css";

 const books = [
   {
     id: 0,
     title: "Hashtag This!",
     author: "Cordelia Winterbourne",
     genre: "drama",
     publicationYear: 2001,
   },
   {
     id: 1,
     title: "Shadows on Baker Street",
     author: "Victoria Ashworth",
     genre: "mystery",
     publicationYear: 2005,
   },
   {
     id: 2,
     title: "The Last Human Thought",
     author: "Marcus Chen-Rodriguez",
     genre: "fantasy",
     publicationYear: 1999,
   },
   {
     id: 3,
     title: "Between Two Worlds",
     author: "Eleanor Blackwood",
     genre: "romance",
     publicationYear: 2021,
   },
   {
     id: 4,
     title: "A Lady's Rebellion",
     author: "James O'Sullivan",
     genre: "comedy",
     publicationYear: 2015,
   },
   {
     id: 5,
     title: "Finding My Voice",
     author: "Dr. Sarah Mitchell",
     genre: "fiction",
     publicationYear: 2019,
   },
   {
     id: 6,
     title: "The Academy of Forgotten Arts",
     author: "Alexander Thornfield",
     genre: "biography",
     publicationYear: 2023,
   },
   {
     id: 7,
     title: "Digital Souls",
     author: "Maya Patel-Johnson",
     genre: "non-fiction",
     publicationYear: 2004,
   },
   {
     id: 8,
     title: "The Crystal of Eternal Storms",
     author: "Robert Hawthorne",
     genre: "memoir",
     publicationYear: 2018,
   },
   {
     id: 9,
     title: "Murder in Mayfair",
     author: "Danny McGregor",
     genre: "thriller",
     publicationYear: 2020,
   },
 ];
const ListOfBooks = () => {
 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(books);
  const genres = [...new Set(books.map(book => book.genre))];
  

  useEffect(() => {
    let result = books;

    if (searchTerm.trim()) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedGenre) {
      result = result.filter(book => book.genre === selectedGenre);
    }

    setFilteredBooks(result);
  }, [searchTerm, selectedGenre, books]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGenre("");
  };
  
  
  return (
    <div className="book-container">
      <h1 className="library-title">Library of books</h1>
      <div className="filters-panel">
        {/* Search by name */}
        <div className="search-field">
          <label className="field-label"> Search by name:</label>
          <input
            type="text"
            className="search-input"
            placeholder="Enter the title of the book..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <FaSearch className="magniffer" />
        {/* Search by genre */}
        <div className="genre-field">
          <label className="field-label">Filter by genre:</label>
          <select
            className="genre-select"
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            <option value="">All genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        {searchTerm.trim() !== "" && (
          <button className="reset-button" onClick={resetFilters}>
            Reset
          </button>
        )}
      </div>
      {/* Search results */}
      <div className="results-info">
        Found books:{" "}
        <span className="results-count">{filteredBooks.length}</span> out of{" "}
        {books.length}
      </div>

      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card">
              <FaBook className="book-icon" />

              <h3 className="book-title"> {book.title}</h3>
              <div className="book-details">
                <p className="book-info">
                  <strong> Author:</strong> {book.author}
                </p>
                <p className="book-info">
                  <strong> Genre:</strong>
                  <span className="genre-badge">{book.genre}</span>
                </p>
                <p className="book-info">
                  <strong> Publication year:</strong> {book.publicationYear}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon"></div>
          <p>Nothing was found for your query.</p>
          <p>Try changing your search criteria or resetting your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ListOfBooks;
