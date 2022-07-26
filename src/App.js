import { useEffect, useState } from "react";
import api from "./api";
import "./reset.css";
import "./style.css";
export default function App() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    api
      .get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
      .then((response) => {
        if (response.data) {
          setMovie([...response.data]);
        }
      })
      .catch((error) => console.log("Ops deu erro " + error));
  }, []);
  return (
    <>
      <div className="header">
        <h1>CINEFLEX</h1>
      </div>
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
    </>
  );
}
