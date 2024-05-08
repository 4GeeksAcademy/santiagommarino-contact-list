import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar bg-secondary mb-3 p-2">
      <div className="d-flex justify-content-center w-100">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-white fs-2 fw-bold">HOME</span>
        </Link>
      </div>
    </nav>
  );
};