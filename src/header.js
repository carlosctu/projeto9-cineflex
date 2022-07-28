import { Link } from "react-router-dom";
export default function Header() {
  return (
    <Link to="/">
      <div className="header">
        <h1>CINEFLEX</h1>
      </div>
    </Link>
  );
}
