import React, { useEffect, useState } from "react";
import { fetchTopRated, setNewLoading } from "../redux/actions/actions";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import "../styles/MovieCard.scss";
import smallArrLeft from "../assets/smallarrleft.png";
import smallArrRight from "../assets/smallarrright.png";
import Spinner from "./Spinner";

import Footer from "./Footer";

const TopRatedMovies = (props) => {
  const [abc, setAbc] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    props.setNewLoading();
    props.fetchTopRated(1);
  }, []);

  const { TopRated, newloading } = props;
  const TopRatedRes = TopRated.results;
  let TopRatedPages = [];

  // Gets the number of total pages fetched and stores them into a variable

  for (let i = 1; i < TopRated.total_pages + 1; i++) {
    TopRatedPages.push(i);
  }

  // handleSmallSliderUp and handleSmallSliderDown make the bottom page number slider work

  const handleSmallSliderUp = () => {
    if (abc >= (TopRated.total_pages / 10) * 550 - 55) {
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
  let TRMInfo = (
    <div>
      {" "}
      <div>
        <div className="movies-div">
          {TopRatedRes === undefined
            ? console.log("loading movies")
            : TopRatedRes.map((movie, index) => (
                <MovieCard movie={movie} key={index} />
              ))}
        </div>
        <div className="test-div">
          {props.movies != "" ? (
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

          {props.movies != "" ? (
            <div className="pageBtn-div">
              <div className="pageBtn-inner">
                <div
                  className="pageBtn-inner-inner"
                  style={{ transform: `translateX(-${abc}px)` }}
                >
                  {TopRatedPages.map((page, index) => (
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
                          props.fetchTopRated(page);
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
            <div></div>
          )}

          {props.movies != "" ? (
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
      </div>
      {props.movies != "" ? <Footer /> : <div></div>}
    </div>
  );
  return <div>{newloading ? <Spinner /> : <div>{TRMInfo}</div>}</div>;
};

const mapStateToProps = (state) => ({
  TopRated: state.movieReducer.top_rated,
  newloading: state.movieReducer.newloading,
});
export default connect(mapStateToProps, { fetchTopRated, setNewLoading })(
  TopRatedMovies
);
