import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function MovieCard({ movie, onFavorite, onRemoveFavorite, favorite }) {
  let cssclass = "absolute top-1 right-2 z-20 p-2 cursor-pointer";

  if (favorite) {
    cssclass += " text-red-500";
  } else {
    cssclass += ' text-gray-100'
  }

  const clickHandler = function (favorite) {
    if (favorite) {
      onRemoveFavorite(movie.imdbID);
    } else {
      onFavorite(movie);
    }
  };

  return (
    <div className="p-2 pb-5 bg-slate-900 rounded-lg max-h-96 min-h-96 min-w-60 max-w-60 flex flex-col gap-3 card-container">
      <div className="rounded-md overflow-hidden flex-1 relative">
        <div className="skeleton absolute inset-0 rounded-md" />
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            e.currentTarget.style.opacity = 1;
            e.currentTarget.previousElementSibling.style.display = "none";
          }}
        />
      </div>
      <p className="text-sm text-nowrap overflow-hidden text-ellipsis">
        {movie.Title}
      </p>
      <div className="flex gap-10 justify-between items-center">
        <p className="text-xs">{movie.Year}</p>
        <p className="text-xs p-1 border border-slate-700 rounded-sm">
          {movie.Type}
        </p>
      </div>
      <div className="overlay">
        <FontAwesomeIcon
          icon={faHeart}
          className={cssclass}
          onClick={() => clickHandler(favorite)}
        />
      </div>
    </div>
  );
}

export default MovieCard;
