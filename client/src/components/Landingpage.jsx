import React from "react";
import { Link } from "react-router-dom";
import './styles/Landingpage.css';

export default function LandingPage() {
  return (
    <div className="landing">
      <h1 className="h1">Welcome to LOLIXGAMES</h1>
      <Link to="/home">
        <button className="boton">Press to start</button>
      </Link>
    </div>
  );
}
