import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieSearch } from '../../components/movie-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [params, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = params.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [params]);

  useEffect(() => {
    const searchMovies = async () => {
      if (!searchQuery) return;

      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieSearch(searchQuery);
        setMovies(data);
        // setSearchParams({ search: searchQuery });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [searchQuery]);

  const handleSearch = event => {
    event.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  return (
    <div>
      <h1>Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter movie title..."
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <ErrorMessage />}
      {loading && <Loader />}

      {movies.length > 0 && !loading && <MovieList movies={movies} />}
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { fetchMovieSearch } from '../../components/movie-api';
// import MovieList from '../../components/MovieList/MovieList';
// import Loader from '../../components/Loader/Loader';
// import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

// export default function MoviesPage() {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [params, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const search = params.get('search');
//     if (search) {
//       setSearchQuery(search);
//     }
//   }, [params]);

//   const handleSearch = async event => {
//     event.preventDefault();

//     if (!searchQuery) return;

//     try {
//       setLoading(true);
//       setError(false);
//       const data = await fetchMovieSearch(searchQuery);
//       setMovies(data);
//       setSearchParams({ search: searchQuery });
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Movies</h1>
//       <form onSubmit={handleSearch}>
//         <input
//           type="text"
//           placeholder="Enter movie title..."
//           value={searchQuery}
//           onChange={event => setSearchQuery(event.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>

//       {error && <ErrorMessage />}
//       {loading && <Loader />}

//       {movies.length > 0 && !loading && <MovieList movies={movies} />}
//     </div>
//   );
// }
