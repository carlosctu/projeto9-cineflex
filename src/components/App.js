import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieAvailability from "../components/movie_showtime/movie_availability";
import MovieSession from "../components/movie_reservation/movie_session";
import MoviesList from "../components/home/movies_list";
import Header from "./fixed_components/header";
import MovieCheckout from "../components/movie_checkout/movie_checkout";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies/:moviesId" element={<MovieAvailability />}></Route>
        <Route
          path="/assentos/:movieSessionId"
          element={<MovieSession />}
        ></Route>
        <Route path="/checkout" element={<MovieCheckout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
