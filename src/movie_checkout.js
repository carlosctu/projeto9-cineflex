import { useLocation, Link } from "react-router-dom";
export default function MovieCheckout() {
  const location = useLocation();
  console.log(location.state);
  return (
    <>
      <div className="movie-checkout-title">
        <h1>Pedido feito</h1>
        <h1>com sucesso!</h1>
      </div>
      <div className="movie-checkout">
        <div className="movie-checkout-body">
          <h1>File e sessão</h1>
          <p>{location.state.title}</p>
          <p>{`${location.state.day} ${location.state.hour}`}</p>
        </div>
        <div className="movie-checkout-body">
          <h1>Ingressos</h1>
          {location.state.seats.map((seat, index) => {
            return <p key={index}>{`Assento ${seat}`}</p>;
          })}
        </div>
        <div className="movie-checkout-body">
          <h1>Comprador</h1>
          <p>Nome: {location.state.name}</p>
          <p>CPF: {location.state.userId}</p>
        </div>
      </div>
      <Link style={{ textDecoration: "none" }} to="/">
        <div className="movie-checkout-button">
          <button>Voltar para Home</button>
        </div>
      </Link>
    </>
  );
}
