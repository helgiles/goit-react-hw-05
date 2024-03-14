import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmJhMTRiYjg0NmJmYjk1NTY5ZDU5ZWUyMDM0MjJjZiIsInN1YiI6IjY1ZWIwYzI5N2Y0ZjIxMDE2MmRiYmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcZRjj-Dm0nn-Tu-5QRb4pQfHm5M2n_YzuZQeT0q2CY',
    accept: 'application/json',
  },
});

export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchData(url = '') {
  const response = await axiosInstance.get(url);
  return response.data;
}

export function fetchTrendingMovies() {
  return fetchData(`/trending/movie/day?language=en-US`).then(
    data => data.results
  );
}

export function fetchMovieSearch(query) {
  return fetchData(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  ).then(data => data.results);
}

export function fetchMoviesId(movieId) {
  return fetchData(`/movie/${movieId}?language=en-US`);
}

export function fetchMovieCast(movieId) {
  return fetchData(`/movie/${movieId}/credits?language=en-US`).then(
    data => data.cast
  );
}

export function fetchMovieReviews(movieId) {
  return fetchData(`/movie/${movieId}/reviews?language=en-US&page=1`).then(
    data => data.results
  );
}

// async function fetchData(url = '') {
//   const response = await axiosInstance(url);
//   const data = response.data.results;
//   return data;
// }

// export function fetchTrendingMovies() {
//   return fetchData(`/trending/movie/day?language=en-US`);
// }

// export function fetchMoviesId(movieId) {
//   return fetchData(`/movie/${movieId}?language=en-US`);
// }

// export function fetchMovieSearch(query) {
//   return fetchData(
//     `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
//   );
// }

// export function fetchMovieCast(movieId) {
//   return fetchData(`/movie/${movieId}/credits?language=en-US`);
// }

// export function fetchMovieReviews(movieId) {
//   return fetchData(`/movie/${movieId}/reviews?language=en-US&page=1`);
// }

// axios.defaults.baseURL = 'https://api.themoviedb.org/3';

// export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

// export const fetchFilms = async () => {
//   const response = await axios.get('/trending/movie/day?language=en-US', {
//     headers: {
//       Authorization:
//         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YmJhMTRiYjg0NmJmYjk1NTY5ZDU5ZWUyMDM0MjJjZiIsInN1YiI6IjY1ZWIwYzI5N2Y0ZjIxMDE2MmRiYmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QcZRjj-Dm0nn-Tu-5QRb4pQfHm5M2n_YzuZQeT0q2CY',
//       accept: 'application/json',
//     },
//   });

//   return response.data;
// };
