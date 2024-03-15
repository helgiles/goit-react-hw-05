import css from './MoviesPage.module.css';
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

  const query = params.get('query');

  useEffect(() => {
    if (query) {
      const searchMovies = async () => {
        try {
          setLoading(true);
          setError(false);
          const data = await fetchMovieSearch(query);
          setMovies(data);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      searchMovies();
    }
    return;
  }, [query]);

  const changeQuery = q => {
    setSearchParams({ query: q });
  };
  const onChangeValue = e => {
    const { value } = e.target;
    setSearchQuery(value);
  };
  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery === '') {
      alert('Empty query!');
    }
    changeQuery(searchQuery);
    setSearchQuery('');
  };

  return (
    <div className={css.moviesPage}>
      <h1 className={css.title}>Movies</h1>
      <form className={css.form} onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Enter movie title..."
          value={searchQuery}
          onChange={onChangeValue}
        />
        <button type="submit">Search</button>
      </form>

      {error && <ErrorMessage />}
      {loading && <Loader />}

      {movies.length > 0 && !loading && <MovieList movies={movies} />}
    </div>
  );
}
