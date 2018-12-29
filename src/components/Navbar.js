import React from 'react';

export default function Navbar(props) {
  return (
    <nav id="single-line-menu" className="single-nav menu" role="navigation">
      <ul>
          <li><h3>TooltipMaker</h3></li>
          <li><button onClick={() => props.toggleRender(props.buttonLink)}>{props.buttonText}</button></li>
      </ul>
    </nav>
  )
}
