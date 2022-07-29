import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function MovieSession() {
  const [sessions, setSessions] = useState("");
  const movieSessionId = useParams();
  const seatClass = "movie-sessions-seat";
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${movieSessionId.movieSessionId}/seats`
    );
    promise.then((response) => setSessions(response.data));
    promise.catch((error) => console.log("Deu erro " + error));
  }, [movieSessionId]);
  console.log(sessions);

  return (
    <>
      <div>
        <div className="movie-sessions-title">
          <p>Selecione o(s) assentos(s)</p>
        </div>
        <div className="movie-sessions-seats">
          {sessions
            ? sessions.seats.map((e) => {
                return e.isAvailable ? (
                  <div key={e.id} className={seatClass}>
                    {e.name}
                  </div>
                ) : (
                  <div key={e.id} className={`${seatClass}-not-available`}>
                    {e.name}
                  </div>
                );
              })
            : "Carregando..."}
        </div>
        <div className="movie-sessions-form">
          <form>
            <div>
              <label>Nome do comprador:</label>
              <input type="text" placeholder="Digite seu nome..."></input>
            </div>
            <div>
              <label>CPF do comprador:</label>
              <input type="number" placeholder="Digite seu CPF..."></input>
            </div>
            <button>Reservar assentos(s)</button>
          </form>
        </div>
      </div>
      {sessions ? (
        <div className="movie-availability-footer">
          <div className="movie-availability-footer-image">
            <img src={sessions.movie.posterURL} alt={sessions.movie.title} />
          </div>
          <div className="movie-availability-footer-description">
            <p>{sessions.movie.title}</p>
            <p>{`${sessions.day.weekday} ${sessions.name}`}</p>
          </div>
        </div>
      ) : (
        "Carregando..."
      )}
    </>
  );
}
