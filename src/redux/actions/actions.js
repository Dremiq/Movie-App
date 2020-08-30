import {
  SEARCH_MOVIE,
  FETCH_MOVIES,
  FETCH_POPULAR,
  FETCH_TOP_RATED,
  FETCH_MOVIE,
  FETCH_SIMILAR,
  LOADING,
  NEW_LOADING,
  NEW_NEW_LOADING,
} from "./actionTypes";
import axios from "axios";
import { API_KEY } from "../../API_KEY";

// Fetches movies that are being searched for in the input

export const searchMovie = (text) => {
  return {
    type: SEARCH_MOVIE,
    payload: text,
  };
};

// Fetches front page movies

export const fetchMovies = (text, page) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: FETCH_MOVIES,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};



export const fetchPopular = (page) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: FETCH_POPULAR,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const fetchTopRated = (page) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`
    )
    .then((res) =>
      dispatch({
        type: FETCH_TOP_RATED,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

// Fetches a single movie when you click on it for more details

export const fetchMovie = (id) => (dispatch) => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((response) =>
      dispatch({
        type: FETCH_MOVIE,
        payload: response.data,
      })
    )
    .catch((err) => console.log(err));
};

export const fetchSimilar = (id) => (dispatch) => {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&page=1`
    )
    .then((res) =>
      dispatch({
        type: FETCH_SIMILAR,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

export const setLoading = () => {
  return {
    type: LOADING,
  };
};
export const setNewLoading = () => {
  return {
    type: NEW_LOADING,
  };
};
export const setNewNewLoading = () => {
  return {
    type: NEW_NEW_LOADING,
  };
};
