import React from "react";
import "./About.css";

function About() {
  return (
    <div className="AboutBox">
      <div className="About">
        <h3 className="licenseTitle">About</h3>
        <p>
          Hi! Another Pixel Chess is a Stockfish GUI with database and three
          difficulty levels
        </p>
        <h4 className="licenseTitle">Licenses</h4>
        <ul className="licensesList">
          <li className="licenseItem">
            <a href="https://www.1001fonts.com/press-start-font.html">Font</a>
          </li>
          <li className="licenseItem">
            <a href="https://opengameart.org/content/pixel-chess-pieces">
              Pieces
            </a>
          </li>
          <li className="licenseItem">
            <a href="https://www.npmjs.com/package/stockfish">Stockfish</a>
          </li>
        </ul>
        <h4 className="licenseTitle">Made by</h4>
        Francisco Balboa, FullStack and IOT developer.
        <h4 className="licenseTitle">Contact</h4>
        <div className="contactList">
          <a href="https://www.linkedin.com/in/ftbr/" className="contactItem">Linkedin</a>
          <a href="https://github.com/ftbalboa/" className="contactItem">Github</a>
        </div>
      </div>
    </div>
  );
}

export default About;
