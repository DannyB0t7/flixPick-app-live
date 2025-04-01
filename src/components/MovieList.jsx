import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ movies, ...props }) {
  return (
    <div className="p-5 flex gap-5 overflow-x-scroll scrollbar">
      {movies.map((movie) => (
        <MovieCard movie={movie} key={movie.imdbID} {...props} />
      ))}
    </div>
  );
}

export default MovieList;
