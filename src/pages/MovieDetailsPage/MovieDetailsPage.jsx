import { useEffect, useState, Suspense } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { IMAGE_URL, fetchMoviesId } from '../../components/movie-api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMoviesId(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  const getYear = () => new Date(movie.release_date).getFullYear();

  return (
    <div>
      <Link to={location.state}>Go back</Link>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <div>
            <div>
              <img
                src={`${IMAGE_URL}${movie.backdrop_path}`}
                alt={movie.title}
              />
            </div>
            <div>
              <h3>
                {movie.title} ({getYear()})
              </h3>
              <p>User score {movie.vote_average}</p>
            </div>
            <div>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>
                    <p>{genre.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>

            <Suspense fallback={<div>Loading subpage...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
