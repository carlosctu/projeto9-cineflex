import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieSessionsFooter from "./movie_sessions_footer";
import MovieSessionTitle from "./movie_session_title";
import MovieSessionReferences from "./movie-sessions-reference";

export default function MovieSession() {
  const seatClass = "movie-sessions-seat";
  const [seat, setSeat] = useState([]);
  const [sessionInfo, setInfo] = useState({
    title: "",
    day: "",
    hour: "",
    seats: [],
  });
  const [sessions, setSessions] = useState("");
  const [seats, setSeats] = useState([]);
  const [makeReservation, setReservation] = useState({
    ids: [],
    name: "",
    cpf: "",
  });
  const movieSessionId = useParams();
  console.log(sessionInfo);
  useEffect(() => {
    setReservation((reservations) => ({ ...reservations, ids: seats }));
    setInfo((info) => ({ ...info, seats: seat }));
  }, [seats, seat]);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${movieSessionId.movieSessionId}/seats`
    );
    promise.then((response) => {
      setSessions(response.data);
      setInfo((userInfo) => ({
        ...userInfo,
        title: response.data.movie.title,
        day: response.data.day.date,
        hour: response.data.name,
      }));
    });
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
                  setSeat={setSeat}
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
        sessionInfo={sessionInfo}
      />
      <MovieSessionsFooter sessions={sessions} />
    </>
  );
}

function ReservSeat({ session, setSeat, seatClass, setSeats }) {
  const [reserveSeat, setReserveSeat] = useState(false);
  return (
    <div
      className={reserveSeat ? `${seatClass}-reserving` : seatClass}
      onClick={(event) => {
        if (event.target.className === "movie-sessions-seat-not-available") {
          return alert("Assento não disponível, favor escolha outro");
        }
        setReserveSeat((prevState) => !prevState);
        setSeats((seats) => [...seats, session.id]);
        setSeat((seat) => [...seat, session.name]);
      }}
    >
      {session.name}
    </div>
  );
}

function MovieSessionsForm({ setReservation, makeReservation, sessionInfo }) {
  const navigate = useNavigate();

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

        navigate("/checkout", {
          state: {
            name: makeReservation.name,
            userId: makeReservation.cpf,
            title: sessionInfo.title,
            day: sessionInfo.day,
            hour: sessionInfo.hour,
            seats: sessionInfo.seats,
          },
          replace: true,
        });
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
