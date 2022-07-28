import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Hours({ id, name }) {
  return <button key={id}>{name}</button>;
}

function ShowTimes({ movieShowtime }) {
  return movieShowtime.map((showtime) => {
    return (
      <div key={showtime.id} className="movie-showtime">
        <div className="movie-showtime-date">
          {`${showtime.weekday} - ${showtime.date}`}
        </div>
        <div className="movie-showtime-hour">
          {showtime.showtimes.map((hour) => {
            return <Hours key={hour.id} name={hour.name} />;
          })}
        </div>
      </div>
    );
  });
}

export default function MovieAvailability() {
  const [movieShowtime, setMovieShowtime] = useState("");
  const moviesId = useParams();
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v5/cineflex/movies/${moviesId.moviesId}/showtimes`
    );
    promise.then((response) => {
      setMovieShowtime(response.data);
    });
    promise.catch((error) => console.log("erro " + error));
  }, [moviesId]);
  console.log(movieShowtime);
  return (
    <>
      <div className="movie-availability">
        <div className="movie-availability-title">Selecione o horário</div>
        {movieShowtime ? (
          <ShowTimes movieShowtime={movieShowtime.days} />
        ) : (
          "Carregando.."
        )}
      </div>
      <div className="movie-availability-footer">
        <div className="movie-availability-footer-image">
        <img src={movieShowtime.posterURL} />
        </div>
        <p>{movieShowtime.title}</p>
      </div>
    </>
  );
}
