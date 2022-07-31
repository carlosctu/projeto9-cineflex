export default function MovieSessionReferences({ seatClass }) {
  const referenceInfo = [
    { seatClass: `${seatClass}-reserving`, seatStatus: "Selecionado" },
    { seatClass: `${seatClass}`, seatStatus: "Disponível" },
    { seatClass: `${seatClass}-not-available`, seatStatus: "Indisponível" },
  ];
  return (
    <div className="movie-sessions-reference">
      {referenceInfo.map((info, index) => {
        return (
          <div key={index} className="movie-sessions-reference-container">
            <div className={info.seatClass}></div>
            <p>{info.seatStatus}</p>
          </div>
        );
      })}
    </div>
  );
}
