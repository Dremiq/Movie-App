import React, { useEffect, useState } from "react";
import { fetchPopular, setNewLoading } from "../redux/actions/actions";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import "../styles/MovieCard.scss";
import smallArrLeft from "../assets/smallarrleft.png";
import smallArrRight from "../assets/smallarrright.png";
import Spinner from "./Spinner";

import Footer from "./Footer";

const PopularMovies = (props) => {
  const [abc, setAbc] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    props.fetchPopular(1);
  }, []);

  const { popular, newloading } = props;
  const popularRes = popular.results;
  let popularPages = [];

  for (let i = 1; i < popular.total_pages + 1; i++) {
    popularPages.push(i);
  }

  // const handleSliderUp = () => {
  //   if (abc >= (popular.total_pages / 10) * 550 - 550) {
  //   } else {
  //     setAbc(abc + 550);
  //   }
  // };
  // const handleSliderDown = () => {
  //   if (abc <= 0) {
  //   } else {
  //     setAbc(abc - 550);
  //   }
  // };
  const handleSmallSliderUp = () => {
    if (abc >= (popular.total_pages / 10) * 550 - 55) {
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
  let PMInfo = (
    <div>
      <div className="movies-div">
        {popularRes === undefined
          ? console.log("loading movies")
          : popularRes.map((movie, index) => (
              <MovieCard movie={movie} key={index} />
            ))}
      </div>
      <div className="test-div">
        {props.movies != "" ? (
          <div className="buttonsPrev">
            {/* <button className="prevBtn sliderBtn" onClick={handleSliderDown}>
        <img src={arrowLeft} alt="arrow-left" />
      </button> */}
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
                {popularPages.map((page, index) => (
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
                        props.fetchPopular(page);
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
            {/* <button className="nextBtn sliderBtn" onClick={handleSliderUp}>
        <img src={arrowRight} alt="arrow-right" />
      </button> */}
          </div>
        ) : (
          ""
        )}
      </div>
      <div></div>
      {props.movies != "" ? <Footer /> : <div></div>}
    </div>
  );
  return <div>{newloading ? <Spinner /> : PMInfo}</div>;
};

const mapStateToProps = (state) => ({
  popular: state.movieReducer.popular,
  newloading: state.movieReducer.newloading,
});

export default connect(mapStateToProps, { fetchPopular, setNewLoading })(
  PopularMovies
);
