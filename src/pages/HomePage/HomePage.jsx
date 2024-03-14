import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../components/movie-api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchTrendingMovies();
        setMovies(data);
        console.log(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {error && <ErrorMessage />}
      {loading && <Loader />}

      {movies.length > 0 && !loading && <MovieList movies={movies} />}
    </div>
  );
}
