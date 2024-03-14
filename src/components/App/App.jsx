import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import css from './App.module.css';
import Navigation from '../Navigation/Navigation';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx')
);
const MovieCast = lazy(() =>
  import('../../components/MovieCast/MovieCast.jsx')
);
const MovieReviews = lazy(() =>
  import('../../components/MovieReviews/MovieReviews.jsx')
);
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage.jsx')
);

export default function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>LOADING PAGE...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
