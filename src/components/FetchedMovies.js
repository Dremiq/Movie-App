import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import smallArrLeft from "../assets/smallarrleft.png";
import smallArrRight from "../assets/smallarrright.png";
import { connect } from "react-redux";
import "../styles/BlackTheme.scss";
import {
  searchMovie,
  fetchMovies,
  setNewLoading,
} from "../redux/actions/actions";
import "../styles/MovieCard.scss";
import Spinner from "./Spinner";
import Footer from "./Footer";

function FetchedMovies(props) {
  const [abc, setAbc] = useState(0);
  const { movies, newloading } = props;
  const [currentPage, setCurrentPage] = useState(1);
  let movieResults = movies.results;
  let moviePages = [];

  useEffect(() => {
    props.setNewLoading();
  }, []);

  // Gets the number of pages that are fetched when searched for a specific value

  for (let i = 1; i < movies.total_pages + 1; i++) {
    moviePages.push(i);
  }

  // handleSmallSliderUp and handleSmallSliderDown make the bottom page number slider work

  const handleSmallSliderUp = () => {
    if (abc >= (movies.total_pages / 10) * 550 - 55) {
    } else {
      setAbc(abc + 55);
    }
  };

  const handleSmallSliderDown = () => {
    if (abc <= 0) {
    } else {
      setAbc(abc - 55);
    }
  };

  let FMInfo = (
    <div>
      <div className="movies-div">
        {movieResults !== undefined
          ? movieResults.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))
          : console.log("Finding movies...")}
      </div>
      <div className="test-div">
        {movies.total_results > 0 ? (
          <div className="buttonsPrev">
            <button
              className="smallPrevBtn smallSliderBtn"
              onClick={handleSmallSliderDown}
            >
              <img src={smallArrLeft} alt="small-arrow-left" />
            </button>
          </div>
        ) : (
          ""
        )}

        {movies.total_results > 0 ? (
          <div className="pageBtn-div">
            <div className="pageBtn-inner">
              <div
                className="pageBtn-inner-inner"
                style={{ transform: `translateX(-${abc}px)` }}
              >
                {moviePages.map((page, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentPage(page);
                    }}
                  >
                    <a
                      className="pageBtn"
                      key={index}
                      onClick={() => {
                        props.fetchMovies(props.text, page);
                        window.scrollTo(5, 5);
                      }}
                      style={
                        currentPage === page
                          ? { backgroundColor: "white", color: "black" }
                          : {}
                      }
                    >
                      {page}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="unable-to-find">
            <p>Unable to find any movies...</p>
          </div>
        )}

        {movies.total_results > 0 ? (
          <div className="buttonsNext">
            <button
              className="smallNextBtn smallSliderBtn"
              onClick={handleSmallSliderUp}
            >
              <img src={smallArrRight} alt="small-arrow-right" />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div></div>
      {movies.total_results > 0 ? <Footer /> : <div></div>}
    </div>
  );

  return <div>{newloading ? <Spinner /> : <div>{FMInfo}</div>}</div>;
}

const mapStateToProps = (state) => {
  return {
    text: state.movieReducer.text,
    movies: state.movieReducer.movies,
    newloading: state.movieReducer.newloading,
  };
};

export default connect(mapStateToProps, {
  searchMovie,
  fetchMovies,
  setNewLoading,
})(FetchedMovies);
