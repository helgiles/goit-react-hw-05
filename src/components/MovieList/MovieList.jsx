// import css from './MovieList.module.css';
import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
  const location = useLocation();
  console.log(location);

  return (
    <ul>
      {movies.map(({ id, original_title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={location}>
            <h3>{original_title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
