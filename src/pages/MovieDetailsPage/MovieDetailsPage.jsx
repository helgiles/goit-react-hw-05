import css from './MovieDetailsPage.module.css';
import { useEffect, useState, Suspense, useRef } from 'react';
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
  const backLinkRef = useRef(location.state ?? '/movies');
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
    <div className={css.movieDetails}>
      <Link className={css.link} to={backLinkRef.current}>
        Go back
      </Link>

      <div className={css.container}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {movie && (
          <div className={css.card}>
            <div className={css.mainInfo}>
              <div>
                <img
                  src={`${IMAGE_URL}${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </div>

              <div>
                <div>
                  <h3>
                    {movie.title} ({getYear()})
                  </h3>
                  <p>User score {Math.round(movie.vote_average)}</p>
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
            </div>
            <div className={css.addInfo}>
              <h3>Additional information</h3>
              <ul className={css.list}>
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
    </div>
  );
}
