import React from "react";
import { Link } from "react-router-dom";
import logo from '../hand-white-38.png';

export default function Navbar(props) {
  return (
    <nav id="single-line-menu" className="single-nav menu" role="navigation">
      <ul>
        <li>
          <img src={logo} alt="Tooltip Logo" className="brand-logo"/>
          <Link to="/" className="link-normalize brand">
            <h3>TooltipMaker</h3>
          </Link>
        </li>
        <li>
          <Link to={props.buttonLink} className="link-normalize button">
            {props.buttonText}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
