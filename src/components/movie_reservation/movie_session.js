import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieSessionReferences from "./movie-sessions-reference";
import MovieSessionTitle from "./movie_session_title";
import Footer from "../fixed_components/footer";
import styled from "styled-components";
import "./style.css";
import axios from "axios";

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
      <Wrapper>
        <Seats>
          {sessions ? sessions.seats.map((session) => {
                return (
                  <ReservSeat
                    key={session.id}
                    session={session}
                    setSeat={setSeat}
                    setSeats={setSeats}
                    seatClass={session.isAvailable ? seatClass
                        : `${seatClass}-not-available`}/>);
              }) : "Carregando..."}
        </Seats>
      </Wrapper>
      <MovieSessionReferences seatClass={seatClass} />
      <MovieSessionsForm
        setReservation={setReservation}
        makeReservation={makeReservation}
        sessionInfo={sessionInfo}
      />
      {sessions ? (
        <Footer showTime={sessions.movie}>
          <FooterInfo>
            <p>{sessions.movie.title}</p>
            <p>{`${sessions.day.weekday} ${sessions.name}`}</p>
          </FooterInfo>
        </Footer>)
         : ("")}
    </>
  );
}

function ReservSeat({ session, setSeat, seatClass, setSeats }) {
  const [reserveSeat, setReserveSeat] = useState(false);
  function handleReserve(event) {
    if (event.target.className === "movie-sessions-seat-not-available") {
      return alert("Assento não disponível, favor escolha outro");
    }
    if (event.target.className === "movie-sessions-seat-reserving") {
      setSeats((seats) => seats.filter((item) => item !== session.id));
      setSeat((seat) => seat.filter((item) => item !== session.name));
    } else {
      setSeats((seats) => [...seats, session.id]);
      setSeat((seat) => [...seat, session.name]);
    }
    setReserveSeat((prevState) => !prevState);
  }

  return (
    <div className={reserveSeat ? `${seatClass}-reserving` : seatClass}
      onClick={handleReserve}>
      {session.name} </div>
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
    <Form onSubmit={(event) => {
        if (sessionInfo.seats.length === 0) {
          event.preventDefault();
          return alert("Nenhum assento selecionado!");
        }
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
          }, replace: true,
        });
      }}
    >
      <InputForm label="Nome do comprador:">
        <Input
          type="text"
          placeholder="Digite seu nome..."
          name="name"
          onChange={handleForm}
          required
        />
      </InputForm>
      <InputForm label="CPF do comprador:">
        <Input
          type="text"
          name="cpf"
          placeholder="Digite seu CPF..."
          onChange={handleForm}
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
          title="Favor digite o CPF no formato: xxx.xxx.xxx-xx"
          required
        />
      </InputForm>
      <ButtonContainer>
        <Button>Reservar assentos(s)</Button>
      </ButtonContainer>
    </Form>
  );
}

function InputForm(props) {
  const { label, children } = props;
  return (
    <FormInputs>
      <div>
        <label>{label}</label>
      </div>
      {children}
    </FormInputs>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Seats = styled.div`
  display: flex;
  width: 371px;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  row-gap: 16px;
  column-gap: 10px;
`;

const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  padding-right: 10px;
`;

const Form = styled.form`
  padding-bottom: 147px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  row-gap: 18px;
`;

const FormInputs = styled.div`
  flex-direction: column;
`;

const Input = styled.input`
  width: 327px;
  height: 36px;
  padding-left: 18px;
  margin-top: 6px;
  font-style: italic;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 225px;
  height: 36px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  margin-top: 57px;
`;

const Button = styled.button`
  width: 225px;
  height: 36px;
  background-color: #e8833a;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin: 22px 8px 23px 0;
`;
