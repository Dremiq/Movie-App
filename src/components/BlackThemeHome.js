import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import search from "../assets/search1.png";
import "../styles/BlackTheme.scss";
import {
  searchMovie,
  fetchMovies,
  fetchPopular,
  setNewNewLoading,
} from "../redux/actions/actions";
import { connect } from "react-redux";
import "../styles/MovieCard.scss";
import { Link } from "react-router-dom";
import PopularMovies from "./PopularMovies";
import FetchedMovies from "./FetchedMovies";
import TopRatedMovies from "./TopRatedMovies";
import Footer from "./Footer";
import Spinner from "./Spinner";
const BlackThemeHome = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [isActiveTwo, setIsActiveTwo] = useState(false);
  const [abc, setAbc] = useState(0);
  useEffect(() => {
    props.setNewNewLoading();
  }, []);
  const handleChangeOne = () => {
    setIsActive(true);
    setIsActiveTwo(false);
  };
  const handleChangeTwo = () => {
    setIsActive(false);
    setIsActiveTwo(true);
  };
  const handleChange = (e) => {
    props.searchMovie(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.fetchMovies(props.text, 1);
    setAbc(0);
    props.history.push("/bT/searched");
    e.target.reset();
  };
  const { movies, newnewloading } = props;
  let moviePages = [];
  for (let i = 1; i < movies.total_pages + 1; i++) {
    moviePages.push(i);
  }
  let BTHInfo = (
    <div className="black-div">
      <div className="navbar">
        <div className="logo">
          <Link to="/bT/popular" href="#" className="logo-title">
            KROST
          </Link>
          <Link to="/bT/popular" className="logo-desc">
            easy. simple. free.
          </Link>
        </div>
      </div>
      <div className="search-div">
        <img src={search} className="search-img" alt="search-img" />

        <form onSubmit={handleSubmit}>
          <input
            className="search-bar"
            onChange={handleChange}
            placeholder="SEARCH FOR A MOVIE"
          />
        </form>
      </div>
      <div className="two-buttons">
        <Link
          className={isActive ? "btn btn1 btnTrue" : "btn btn1 btnFalse"}
          onClick={handleChangeOne}
          to="/bT/popular"
        >
          MOST POPULAR
        </Link>
        <Link
          to="/bT/top_rated"
          className={isActiveTwo ? "btn2 btn btnTrue" : "btn btn2 btnFalse"}
          onClick={handleChangeTwo}
        >
          TOP RATED
        </Link>
      </div>
      <Route path="/bT/popular" exact component={PopularMovies} />
      <Route path="/bT/searched" exact component={FetchedMovies} />
      <Route path="/bT/top_rated" exact component={TopRatedMovies} />
      {movies.total_results > 0 ? <Footer /> : <p></p>}
    </div>
  );

  return <div>{newnewloading ? <Spinner /> : BTHInfo}</div>;
};
const mapStateToProps = (state) => {
  return {
    text: state.movieReducer.text,
    movies: state.movieReducer.movies,
    popular: state.movieReducer.popular,
    newnewloading: state.movieReducer.newnewloading,
  };
};
export default connect(mapStateToProps, {
  searchMovie,
  fetchMovies,
  fetchPopular,
  setNewNewLoading,
})(BlackThemeHome);
