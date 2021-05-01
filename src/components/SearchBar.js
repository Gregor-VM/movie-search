import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import MovieContext from "../context/MovieContext";
import ResultsBox from "./ResultsBox";
import Spinner from "./Spinner";

function SearchBar() {
  const [textInput, setTextInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [centralize, setCentralize] = useState(true);
  const [error, setError] = useState("");
  const searchRef = useRef();

  const { getMovies } = useContext(MovieContext);

  const handleTextInput = (e) => setTextInput(e.target.value);

  const memoizeSetCentralize = useCallback(() => {
    setCentralize(false);
  }, [setCentralize]);

  const handleSearchForm = async (e) => {
    e.preventDefault();
    if (textInput === "") {
      return setError("Empty Input");
    }
    setIsSearching(true);
    try {
      const res = await getMovies(textInput);
      !res ? setError("Movie not found") : memoizeSetCentralize();
    } catch (error) {
      console.error(error);
    }
    setIsSearching(false);
  };

  useEffect(() => searchRef.current.focus(), []);

  return (
    <div className={centralize ? "col-lg-12 mt-5" : "col-lg-4"}>
      {centralize && (
        <h1 className="display-1 text-center mb-3">Movie Search</h1>
      )}
      <form
        className="form-group d-flex mb-lg-1 mb-3"
        onSubmit={handleSearchForm}
      >
        <input
          ref={searchRef}
          placeholder="Search a movie..."
          type="search"
          className="form-control rounded-0 shadow-none"
          value={textInput}
          onChange={handleTextInput}
        ></input>
        <input
          type="submit"
          className="btn btn-primary rounded-0 border-0 shadow-none"
          value="Search"
        ></input>
      </form>
      {!centralize && (
        <div className="scroll">
          <ResultsBox isSearching={isSearching} />
        </div>
      )}
      {centralize && isSearching && <Spinner></Spinner>}
      {centralize && error && !isSearching && (
        <div className="alert alert-danger">{error}</div>
      )}
    </div>
  );
}

export default SearchBar;
