export default function MovieSessionReferences({ seatClass }) {
  return (
    <div className="movie-sessions-reference">
      <div className="movie-sessions-reference-container">
        <div className={`${seatClass}-reserving`}></div>
        <p>Selecionado</p>
      </div>
      <div className="movie-sessions-reference-container">
        <div className={`${seatClass}`}></div>
        <p>Disponível</p>
      </div>
      <div className="movie-sessions-reference-container">
        <div className={`${seatClass}-not-available`}></div>
        <p>Indisponível</p>
      </div>
    </div>
  );
}
