import React, { useEffect, useState } from "react";
import { fetchTopRated, setNewLoading } from "../redux/actions/actions";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import "../styles/MovieCard.scss";
import smallArrLeft from "../assets/smallarrleft.png";
import smallArrRight from "../assets/smallarrright.png";
// import arrowLeft from "../assets/arrowLeft.png";
// import arrowRight from "../assets/arrowRight.png";
import Spinner from "./Spinner";

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

  for (let i = 1; i < TopRated.total_pages + 1; i++) {
    TopRatedPages.push(i);
  }
  // const handleSliderUp = () => {
  //   if (abc >= (TopRated.total_pages / 10) * 550 - 550) {
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
              {/* <button className="nextBtn sliderBtn" onClick={handleSliderUp}>
          <img src={arrowRight} alt="arrow-right" />
        </button> */}
            </div>
          ) : (
            ""
          )}
        </div>
        <div></div>
      </div>
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