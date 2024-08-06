import React from "react";
import { json, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear("user");
    navigate("/signup");
  };
  return (
    <nav className="nav">
      {/* <ul className="nav-ul">
        <li className="ul-li">
          <Link to="/">Products</Link>
        </li>
        <li className="ul-li">
          <Link to="/add">Add Products</Link>
        </li>
        <li className="ul-li">
          <Link to="/update">Update Products</Link>
        </li>
        <li className="ul-li">
          <Link to="/profile">Profile</Link>
        </li>

        {auth ? (
          <li className="ul-li">
            <Link onClick={logout} to="/signup">
              Logout
            </Link>
          </li>
        ) : (
          <>
            <li className="ul-li">
              <Link to="/signup">signup</Link>
            </li>
            <li className="ul-li">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul> */}

      {auth ? (
        <ul className="nav-ul">
          <li className="ul-li">
            <Link to="/">Products</Link>
          </li>
          <li className="ul-li">
            <Link to="/add">Add Products</Link>
          </li>
          <li className="ul-li">
            <Link to="/update">Update Products</Link>
          </li>
          <li className="ul-li">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="ul-li">
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li className="ul-li">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="ul-li">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
