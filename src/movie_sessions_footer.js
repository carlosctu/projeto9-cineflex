export default function MovieSessionsFooter({ sessions }) {
  return (
    <>
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
        ""
      )}
    </>
  );
}
