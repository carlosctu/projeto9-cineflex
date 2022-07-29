import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieAvailability from "./movie_availability";
import MovieSession from "./movie_session";
import MoviesList from "./movies_list";
import Header from "./header";
import "./reset.css";
import "./style.css";
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
      </Routes>
    </BrowserRouter>
  );
}
