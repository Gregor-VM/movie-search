import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import Spinner from "./Spinner";
import SimpleMovie from "./SimpleMovie";

export default function ResultsBox({ isSearching }) {
  const { movies } = useContext(MovieContext);
  if (isSearching) {
    return isSearching ? <Spinner /> : <></>;
  }
  if (movies) {
    return movies.map((movie) => (
      <SimpleMovie key={movie.imdbID} movie={movie} />
    ));
  }
  return "Not movies found";
}
