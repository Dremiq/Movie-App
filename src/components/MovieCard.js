import React, { useEffect } from "react";
import "../styles/MovieCard.scss";
import star from "../assets/star.png";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  const { movie } = props;

  if (movie.poster_path != undefined) {
    return (
      <Link
        className="oneMovie"
        to={"/movie/" + movie.id}
        onClick={() => window.scrollTo(0, 0)}
      >
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt="movie-poster"
        />
        <p className="movieRating">
          <img src={star} className="rating-img" alt="movie-rating" />
          {movie.vote_average}
        </p>
        <p className="movieTitle"> {movie.title}</p>
      </Link>
    );
  } else {
    return <div></div>;
  }
};

export default MovieCard;
