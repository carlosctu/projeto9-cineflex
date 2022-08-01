import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Footer from "../fixed_components/footer";

export default function MovieAvailability() {
  const [movieShowtime, setMovieShowtime] = useState("");
  const moviesId = useParams();
  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/movies/${moviesId.moviesId}/showtimes`
    );
    promise.then((response) => {
      setMovieShowtime(response.data);
    });
    promise.catch((error) => console.log("error: " + error));
  }, [moviesId]);
  return (
    <>
      <Wrapper>
        <Title>Selecione o horário</Title>
        {movieShowtime ? <ShowTimes movieShowtime={movieShowtime.days} /> : ""}
      </Wrapper>
      <Footer showTime={movieShowtime}>
        <p>{movieShowtime.title}</p>
      </Footer>
    </>
  );
}

function ShowTimes({ movieShowtime }) {
  return movieShowtime.map((showtime, index) => {
    return (
      <Body key={index}>
        <MovieDate>{`${showtime.weekday} - ${showtime.date}`}</MovieDate>
        <MovieHour>
          {showtime.showtimes.map((hour) => {
            return (
              <Link key={hour.id} to={`/assentos/${hour.id}`}>
                <button>{hour.name}</button>
              </Link>
            );
          })}
        </MovieHour>
      </Body>
    );
  });
}

const Wrapper = styled.div`
  padding-top: 67px;
  padding-bottom: 117px;
  font-family: 'Roboto', sans-serif;
`;
const Title = styled.div`
  height: 110px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 400;
`;
const Body = styled.div``;
const MovieDate = styled.div`
  width: 281px;
  height: 35px;
  margin-left: 23px;
  font-size: 20px;
  line-height: 24px;
  font-weight: 400;
`;
const MovieHour = styled.div`
  display: flex;
  margin-left: 23px;
  button {
    width: 83px;
    height: 43px;
    font-size: 14px;
    font-weight: 400;
    background-color: #e8833a;
    color: #ffffff;
    border-radius: 5px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
    margin: 22px 8px 23px 0;
  }
`;
