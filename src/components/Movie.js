import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovie, fetchSimilar, setLoading } from "../redux/actions/actions";
import star from "../assets/star.png";
import "../styles/Movie.scss";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

// Once clicked on a specific movie card this component loads up and gives all the details about that movie

const Movie = (props) => {
  const { movie, loading } = props;
  const { similarMovies } = props;

  useEffect(() => {
    props.fetchMovie(props.match.params.id);
    props.fetchSimilar(props.match.params.id);
    window.scrollTo(1, 1);
    props.setLoading();
  }, []);

  let simRes = similarMovies.results;

  // Makes similar movie cards clickable
  
  const handleSwap = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  let movieInfo = (
    <div>
      <div className="movie-details">
        <div className="bg-div">
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
          <div className="upper-div">
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <div className="upper-div-right-inner">
              <div className="movie-title">
                <p>{movie.title}</p>
                <div className="movie-rating">
                  <img src={star} />
                  {movie.vote_average}
                </div>
              </div>

              <div className="movie-genre">
                <p className="genre-title title">Genre:</p>
                <div className="genre-inner">
                  {movie.title != undefined
                    ? movie.genres.map((item, index) => (
                        <p key={index}>{item.name}</p>
                      ))
                    : console.log("Could not find genres for this specific movie...")}
                </div>
              </div>

              <div className="movie-release-date">
                <p className="release-title title">Release date:</p>
                <div>{movie.release_date}</div>
              </div>
              <div className="movie-languages">
                <p className="languages-title title">Languages:</p>
                <div>
                  {movie.title != undefined
                    ? movie.spoken_languages.map((language, index) => (
                        <p key={index}>{language.name}</p>
                      ))
                    : console.log("Could not find spoken languages for this specific movie...")}
                </div>
              </div>
              <div className="movie-storyline">
                <p className="storyline-title title">Storyline: </p>
                <div>{movie.overview}</div>
              </div>
              <div className="movie-companies">
                <p className="companies-title title">Production companies:</p>{" "}
                <div className="companies-inner">
                  {movie.title != undefined
                    ? movie.production_companies.map((company, index) => (
                        <p key={index}>{company.name}</p>
                      ))
                    : console.log("Could not find production companies for this specific movie...")}
                </div>
              </div>
              <div className="movie-watch">
                <p className="watch-title title">Check it out:</p>{" "}
                <div>
                  {movie.homepage != "" ? (
                    <button
                      className="activeBtn"
                      onClick={() => window.open(movie.homepage)}
                    >
                      WATCH NOW
                    </button>
                  ) : (
                    <button
                      className="notActiveBtn"
                      onClick={() =>
                        alert(
                          `OMDb API was unable to find a video for ${movie.title}`
                        )
                      }
                    >
                      WATCH NOW
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sim-title">Similar movies</div>

      <div className="similar-movies-div" onClick={handleSwap}>
        {simRes != undefined
          ? simRes.map((item, index) => <MovieCard movie={item} key={index} />)
          : console.log("Could not fetch movies...")}

        {simRes === undefined || simRes.length == 0 ? (
          <div className="similar-help-div">
            <p>Unable to find any similar movies</p>
          </div>
        ) : (
          console.log("Similar movies found...")
        )}
      </div>
    </div>
  );
  let content = loading ? <Spinner /> : movieInfo;
  return <div>{content}</div>;
};

const mapStateToProps = (state) => ({
  movie: state.movieReducer.movie,
  similarMovies: state.movieReducer.similarMovies,
  loading: state.movieReducer.loading,
});

export default connect(mapStateToProps, {
  fetchMovie,
  fetchSimilar,
  setLoading,
})(Movie);
