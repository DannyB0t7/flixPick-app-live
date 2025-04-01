import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Header({ onEnterMovie, enterMovie }) {
  const enteredMovieHandler = function (e) {
    onEnterMovie(e.target.value);
  };

  return (
    <div className="bg-slate-900 p-5 flex flex-wrap gap-5 items-center justify-between">
      <div className="flex gap-2 items-center">
        <div className="overflow-hidden rounded-full">
          <img src="/movie-logo.png" alt="movie logo" className="h-10 w-10" />
        </div>
        <h1 className="font-bold text-2xl">Flix Pick</h1>
      </div>
      <div className="relative flex-1 max-w-md min-w-48">
        <input
          type="text"
          placeholder="Search..."
          value={enterMovie}
          className="w-full p-3 pl-10 rounded-full text-sm focus:outline-slate-900 text-white bg-slate-800"
          onChange={enteredMovieHandler}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute top-1/2 -translate-y-1/2 left-4 text-white"
        />
      </div>
    </div>
  );
}

export default Header;
