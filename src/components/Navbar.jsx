import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');


    // Fetch movies
    const fetchMovies = async () => {
      if (!debouncedQuery.trim()) return;
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${debouncedQuery}&api_key=${API_KEY}`
        );
        setMovies(res.data.results.slice(0, 5)); // show top 5
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      }
    };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

    // Clear the suggestions when the searchbar is empty
  useEffect(() => {
  if (!debouncedQuery.trim()) {
    setMovies([]);
    return;
  }
  fetchMovies();
}, [debouncedQuery]);




  return (
    <div className='w-full h-[80px] relative z-50'>

      {/* Mobile Menu Button */}
      <div className="lg:hidden p-4 absolute top-5 left-[24px] md:top-5 md:left-10 z-50">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-black focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav Bar */}
      <div className='w-[90%] h-[100px] mx-auto flex justify-between items-center'>

        {/* Left Nav */}
        <ul className='hidden lg:flex items-center gap-[16px] text-base font-semibold list-none'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recently">Genre</Link></li>
          <li><Link to="/trending">Country</Link></li>
        </ul>

        {/* Search Bar */}
        <div className='relative w-full lg:max-w-md'>
          <form onSubmit={(e) => e.preventDefault()} className='flex items-center w-full'>
            <input
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-full h-[48px] border border-gray-300 rounded-2xl text-base font-normal outline-none placeholder:text-black placeholder:font-semibold text-black px-10'
              placeholder="Search movies......."
            />
            <button type="submit" className='ml-[-2rem] text-xl text-black'><FiSearch /></button>
          </form>

          {/* Search Result Dropdown */}
          {movies.length > 0 && (
            <ul className="absolute top-[110%] left-0 bg-white w-full text-black rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {movies.map(movie => (
                <li key={movie.id} className="p-3 hover:bg-gray-100">
                  <Link to={`/details/${movie.id}`} onClick={() => setQuery('')}>
                    {movie.title || movie.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Nav */}
        <ul className='hidden lg:flex items-center gap-[16px] text-base font-semibold list-none'>
          <li><Link to="/newseriestv">Series</Link></li>
          <li><Link to="/newmovies">Movies</Link></li>
          <li><Link to="/recommends">Animation</Link></li>
        </ul>

        {/* Login/Signup */}
        <div className='hidden lg:flex gap-2 items-center justify-center'>
          <p className='text-base font-semibold'>
            <li><Link to="/">Login/Signup</Link></li>
          </p>
          <GoBell />
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Mobile Menu */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-[80px] left-0 w-[70%] bg-gray-900 text-white shadow-md px-4 py-6 rounded-tr-xl rounded-br-xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col gap-4 text-base font-semibold">
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/recently" onClick={() => setMenuOpen(false)}>Genre</Link></li>
          <li><Link to="/trending" onClick={() => setMenuOpen(false)}>Country</Link></li>
          <li><Link to="/newmovies" onClick={() => setMenuOpen(false)}>Movies</Link></li>
          <li><Link to="/newseriestv" onClick={() => setMenuOpen(false)}>Series</Link></li>
          <li><Link to="/recommends" onClick={() => setMenuOpen(false)}>Animations</Link></li>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Login/Signup</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
