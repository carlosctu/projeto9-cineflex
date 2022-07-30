import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieSessionsFooter from "./movie_sessions_footer";
import MovieSessionTitle from "./movie_session_title";
import MovieSessionReferences from "./movie-sessions-reference";

export default function MovieSession() {
  const seatClass = "movie-sessions-seat";
  const [sessions, setSessions] = useState("");
  const [seats, setSeats] = useState([]);
  const [makeReservation, setReservation] = useState({
    ids: [],
    name: "",
    cpf: "",
  });
  const movieSessionId = useParams();
  useEffect(() => {
    setReservation((reservations) => ({ ...reservations, ids: seats }));
  }, [seats]);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${movieSessionId.movieSessionId}/seats`
    );
    promise.then((response) => setSessions(response.data));
    promise.catch((error) => console.log("Deu erro " + error));
  }, [movieSessionId]);
  return (
    <>
      <MovieSessionTitle />
      <div className="movie-sessions-seats">
        {sessions
          ? sessions.seats.map((session) => {
              return (
                <ReservSeat
                  key={session.id}
                  session={session}
                  setReservation={setReservation}
                  makeReservation={makeReservation}
                  seats={seats}
                  setSeats={setSeats}
                  seatClass={
                    session.isAvailable
                      ? seatClass
                      : `${seatClass}-not-available`
                  }
                />
              );
            })
          : "Carregando..."}
      </div>
      <MovieSessionReferences seatClass={seatClass} />
      <MovieSessionsForm
        setReservation={setReservation}
        makeReservation={makeReservation}
      />
      <MovieSessionsFooter sessions={sessions} />
    </>
  );
}

function ReservSeat({ session, seatClass, seats, setSeats }) {
  const [reserveSeat, setReserveSeat] = useState(false);
  return (
    <div
      className={reserveSeat ? `${seatClass}-reserving` : seatClass}
      onClick={(event) => {
        if (event.target.className === "movie-sessions-seat-not-available") {
          return alert("Assento não disponível, favor escolha outro");
        }
        setReserveSeat((prevState) => !prevState);
        setSeats([...seats, session.id]);
      }}
    >
      {session.name}
    </div>
  );
}

function MovieSessionsForm({ setReservation, makeReservation }) {
  function handleForm(event) {
    setReservation({
      ...makeReservation,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <form
      className="movie-sessions-form"
      onSubmit={(event) => {
        const promise = axios.post(
          "https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many",
          makeReservation
        );
        promise.then((response) => console.log("deu boa: " + response.data));
        promise.then((error) => console.log("deu ruim: " + error));
        event.preventDefault();
      }}
    >
      <div className="movie-sessions-form-input">
        <div>
          <label>Nome do comprador:</label>
        </div>
        <input
          type="text"
          placeholder="Digite seu nome..."
          name="name"
          onChange={handleForm}
        ></input>
      </div>

      <div className="movie-sessions-form-input">
        <div>
          <label>CPF do comprador:</label>
        </div>
        <input
          type="text"
          name="cpf"
          placeholder="Digite seu CPF..."
          onChange={handleForm}
        ></input>
      </div>
      <div className="movie-sessions-form-button">
        <button>Reservar assentos(s)</button>
      </div>
    </form>
  );
}
