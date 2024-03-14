// import css from './MovieList.module.css';
import { Link } from 'react-router-dom';

export default function MovieList({ movies }) {
  return (
    <ul>
      {movies.map(({ id, original_title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>
            <h3>{original_title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
