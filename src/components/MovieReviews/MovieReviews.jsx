import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../movie-api';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        setError(false);

        const data = await fetchMovieReviews(movieId);
        console.log(data);

        setReviews(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <ul>
        {reviews.map(reviewsItem => {
          return (
            <li key={reviewsItem.id}>
              <div>
                <p>{reviewsItem.author_details.name}</p>
                <p>{reviewsItem.content}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
