import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

export default function MovieCheckout() {
  const location = useLocation();
  return (
    <>
      <Title>
        <p>Pedido feito</p>
        <p>com sucesso!</p>
      </Title>
      <Wrapper>
        <MovieCheckoutBody title="Filme e sessão">
          <p>{location.state.title}</p>
          <p>{`${location.state.day} ${location.state.hour}`}</p>
        </MovieCheckoutBody>
        <MovieCheckoutBody title="Ingressos">
          {location.state.seats.map((seat, index) => {
            return <p key={index}>{`Assento ${seat}`}</p>;
          })}
        </MovieCheckoutBody>
        <MovieCheckoutBody title="Comprador">
          <p>Nome: {location.state.name}</p>
          <p>CPF: {location.state.userId}</p>
        </MovieCheckoutBody>
      </Wrapper>
      <Link style={{ textDecoration: "none" }} to="/">
        <ButtonContainer>
          <Button>Voltar para Home</Button>
        </ButtonContainer>
      </Link>
    </>
  );
}

function MovieCheckoutBody(props) {
  const { title, children } = props;
  return (
    <TextContainer>
      <h1>{title}</h1>
      {children}
    </TextContainer>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-left: 28px;
  display: flex;
  font-family: "Roboto", sans-serif;
  flex-direction: column;
  row-gap: 22px;
`;
const Title = styled.div`
  margin-top: 67px;
  width: 100%;
  height: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #247a6b;
  font-size: 24px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
`;
const TextContainer = styled.div`
  h1 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  p {
    font-size: 20px;
    font-weight: 400;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 42px;

  text-decoration: none;
`;

const Button = styled.button`
  width: 225px;
  height: 36px;
  background-color: #e8833a;
  color: #ffffff;
  border: none;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  margin: 22px 8px 23px 0;
`;
