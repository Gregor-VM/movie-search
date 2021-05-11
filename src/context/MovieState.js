import React, { useReducer } from "react";
import MovieContext from "./MovieContext";
import reducer from "./MovieReducer";
import axios from "axios";

function MovieState({ children }) {
  const init = { movies: [], selectedMovie: null };

  const [state, dispatch] = useReducer(reducer, init);

  const getMovies = async (query) => {
    const res = await axios.get(
      `https://www.omdbapi.com/?apikey=66ce2ccf&s=${query}`
    );
    dispatch({ type: "GET_MOVIES", payload: res.data.Search });
    return res.data.Search;
  };

  const setMovie = (id) => {
    dispatch({ type: "SET_MOVIE", payload: id });
  };

  return (
    <MovieContext.Provider value={{ ...state, getMovies, setMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export default MovieState;
