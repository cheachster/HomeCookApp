import React from "react";
import { Link } from "react-router-dom";

function Router (){
    return (
        <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
            Chat
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className={window.location.pathname === "/about" ? "nav-link active" : "nav-link"}
          >
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/Register"
            className={window.location.pathname === "/Register" ? "nav-link active" : "nav-link"}
          >
            Register
          </Link>
          </li>
        </ul>
    );
}

export default Router;