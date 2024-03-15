import css from './MovieCast.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IMAGE_URL, fetchMovieCast } from '../movie-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getCast() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovieCast(movieId);
        console.log(data);

        setCast(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.cast}>
        {cast.map(castItem => {
          return (
            <li className={css.item} key={castItem.id}>
              <img
                className={css.image}
                src={`${IMAGE_URL}${castItem.profile_path}`}
                alt={castItem.name}
              />
              <div>
                <p>Name: {castItem.name}</p>
                <p>Character: {castItem.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
