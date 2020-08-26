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
} from "../actions/actionTypes";

const initialState = {
  text: "",
  movies: [],
  movie: [],
  page: 1,
  popular: [],
  top_rated: [],
  similarMovies: "",
  loading: false,
  newloading: false,
  newnewloading: false,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return {
        ...state,
        text: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };

    case FETCH_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };
    case FETCH_POPULAR:
      return {
        ...state,
        popular: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };
    case FETCH_TOP_RATED:
      return {
        ...state,
        top_rated: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };
    case FETCH_MOVIE:
      return {
        ...state,
        movie: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };
    case FETCH_SIMILAR:
      return {
        ...state,
        similarMovies: action.payload,
        loading: false,
        newloading: false,
        newnewloading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case NEW_LOADING:
      return {
        ...state,
        newloading: true,
      };
    case NEW_NEW_LOADING:
      return {
        ...state,
        newnewloading: true,
      };
    default:
      return state;
  }
};

export default movieReducer;
