import { useContext } from "react";
import MovieContext from "../context/MovieContext";

function SimpleMovie({ movie: { Title, Poster, Year, imdbID } }) {
  const { setMovie, selectedMovie } = useContext(MovieContext);

  return (
    <div
      className={`card shadow-sm my-3 ${
        selectedMovie === imdbID && "bg-light boder border-primary"
      }`}
      onClick={() => setMovie(imdbID)}
    >
      <div className="card-body p-0">
        <div className="row">
          <div className="col-4">
            <img
              src={Poster}
              className="img-fluid rounded-left"
              alt={Title}
            ></img>
          </div>
          <div className="col-8 p-2">
            <h4>{Title}</h4>
            <small className="text-muted">{Year}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimpleMovie;
