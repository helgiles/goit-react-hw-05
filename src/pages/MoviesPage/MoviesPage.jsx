import { useState } from 'react';
import { fetchMovieSearch } from '../../components/movie-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async e => {
    e.preventDefault();

    if (!searchQuery) return;

    try {
      setLoading(true);
      setError(false);
      const data = await fetchMovieSearch(searchQuery);
      setMovies(data);
      console.log(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <ErrorMessage />}
      {loading && <Loader />}

      {movies.length > 0 && !loading && <MovieList movies={movies} />}
    </div>
  );
}

// export default function MoviesPage() {
//   const [query, setQuery] = useState('');
//   const [movies, setMovies] = useState([]);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     const form = event.target;
//     const search = form.elements.searchInput.value;

//     event.target.reset();
//   };

//   useEffect(() => {
//     async function getMovie() {
//       try {
//         setLoading(true);
//         setError(false);
//         const data = await fetchMovieSearch(query);
//         setQuery(data);
//       } catch (error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     }
//     getMovie();
//   }, [query]);

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="searchInput"
//           type="text"
//           // value={query}
//           autoComplete="off"
//           autoFocus
//           placeholder="Search movies"
//         />
//         <button type="submit">Search</button>
//       </form>
//       {error && <ErrorMessage />}
//       {loading && <Loader />}
//       {movies.length > 0 && !loading && <MovieList movies={query} />}
//     </div>
//   );
// }
