import { NavLink } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div>
        <NavLink to="/favourites/" className="nav--link">
          Favourites
        </NavLink>
      </div>
    </nav>
  );
}
