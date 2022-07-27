import { useEffect, useState } from "react";
import axios from "axios";

export default function MoviesList() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v5/cineflex/movies"
    );
    promise.then((response) => {
      setMovie(response.data);
    });
    promise.catch((error) => console.log("Erro: " + error));
  }, []);
  return (
    <div className="movies-list">
      <div className="movies-list-title">
        <h3>Selecione o filme</h3>
      </div>
      <div className="movies">
        {movie.map((e, index) => {
          return (
            <div key={index} className="movie">
              <img key={index} src={e.posterURL} alt={e.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
