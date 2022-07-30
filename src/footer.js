export default function Footer({ movieShowtime }) {
  return (
    <div className="movie-availability-footer">
      <div className="movie-availability-footer-image">
        <img src={movieShowtime.posterURL} alt={movieShowtime.title} />
      </div>
      <p>{movieShowtime.title}</p>
    </div>
  );
}
