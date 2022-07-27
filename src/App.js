import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      </Routes>
    </BrowserRouter>
  );
}
