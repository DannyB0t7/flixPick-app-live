import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import placeholder from "./assets/images/placeholder.jpg";

function App() {
  const [movies, setMovies] = useState([]);
  const [enteredMovie, setEnteredMovie] = useState("avengers");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("Favorites")) || []
  );

  async function movieFetch() {
    const url = `https://www.omdbapi.com/?s=${enteredMovie}&apikey=${
      import.meta.env.VITE_APP_KEY
    }`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(() => {
        return responseJson.Search.map((movie) => {
          if (movie.Poster === "N/A") {
            return {
              ...movie,
              Poster: placeholder,
            };
          } else {
            return movie;
          }
        });
      });
    }
  }

  useEffect(() => {
    movieFetch();
  }, [enteredMovie]);

  const enteredMovieHandler = function (movie) {
    setEnteredMovie(movie);
  };

  const favoriteHandler = function (movie) {
    setFavorites((prevState) => {
      const exsistingFavorites = [...prevState];

      const exsistingMovieIndex = exsistingFavorites.findIndex(
        (item) => item.imdbID === movie.imdbID
      );

      if (exsistingMovieIndex === -1) {
        exsistingFavorites.push(movie);
        localStorage.setItem("Favorites", JSON.stringify(exsistingFavorites));
      }

      return exsistingFavorites;
    });
  };

  const removeFavoriteHandler = function (id) {
    setFavorites((prevState) => {
      const updatedFavorites = prevState.filter((movie) => movie.imdbID !== id);
      localStorage.setItem("Favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="">
      <Header onEnterMovie={enteredMovieHandler} enterMovie={enteredMovie} />
      {movies.length > 0 ? (
        <MovieList movies={movies} onFavorite={favoriteHandler} />
      ) : (
        <p className="p-5">No movies to display...</p>
      )}
      <h2 className="p-5 text-lg font-semibold">Favorites</h2>
      {favorites.length > 0 ? (
        <MovieList
          movies={favorites}
          onRemoveFavorite={removeFavoriteHandler}
          favorite
        />
      ) : (
        <div className="p-5">
          <p>No favorites to display.</p>
        </div>
      )}
    </div>
  );
}

export default App;
