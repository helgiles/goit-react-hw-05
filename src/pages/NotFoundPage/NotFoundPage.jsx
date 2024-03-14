import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      Page not found. <Link to="/">Back to home page.</Link>
    </div>
  );
}
