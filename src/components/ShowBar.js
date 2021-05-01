import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import MovieContext from "../context/MovieContext";
import axios from "axios";
import Spinner from "./Spinner";

function ShowBar() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rate, setRate] = useState(0);
  const { selectedMovie } = useContext(MovieContext);

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [selectedMovie]);

  //const rate = Math.round((movie.imdbRating/10)*100);

  useEffect(() => {
    setTimeout(() => setRate(Math.round((movie.imdbRating / 10) * 100), 100));
  }, [movie]);

  const getMovieSelectedMemoize = useCallback(
    async (id) => {
      if (selectedMovie) {
        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=66ce2ccf&i=${id}`
        );
        setMovie(res.data);
        setIsLoading(false);
      }
    },
    [selectedMovie]
  );

  useEffect(() => {
    if (selectedMovie) {
      setIsLoading(true);
    }
    getMovieSelectedMemoize(selectedMovie);
  }, [selectedMovie, getMovieSelectedMemoize]);

  if (!isLoading) {
    if (movie?.Title !== undefined) {
      return (
        <div className="col-lg-8 center-class" ref={messageRef}>
          <div className="card shadow">
            <div className="card-body d-flex p-0">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded-left d-lg-inline-block d-none"
              />
              <div className="d-flex flex-column p-3">
                <h4 className="border-bottom pb-2 border-info text-center">
                  {movie.Title}
                </h4>
                <p>{movie.Plot}</p>
                <small className="d-flex flex-column">
                  <p>
                    <b className="text-info">Released: </b>
                    {movie.Released}
                  </p>
                  <p>
                    <b className="text-info">Director: </b>
                    {movie.Director}
                  </p>
                </small>

                <p>
                  <b>Actores: </b>
                  {movie.Actors.split(", ").map((actor) => {
                    return <span class="badge badge-info mr-1">{actor}</span>;
                  })}
                </p>

                <p>
                  <b>Genre: </b>
                  {movie.Actors.split(", ").map((genre) => {
                    return <span class="badge badge-info mr-1">{genre}</span>;
                  })}
                </p>
                <p class="text-muted">
                  <b>IMDB - Rating:</b>
                </p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: rate + "%",
                      transitionDuration: 1,
                      transitionProperty: "all",
                    }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >{`${rate}%`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  } else {
    return (
      <div className="col-lg-8 center-class d-flex justify-content-center w-100">
        <Spinner />
      </div>
    );
  }
}

export default ShowBar;
