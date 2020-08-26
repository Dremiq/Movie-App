import React from "react";
import { Link } from "react-router-dom";
import "../styles/Theme.scss";
const ChooseATheme = () => {
  return (
    <div className="theme">
      <div className="dark-theme oneofthemes">
        <div className="dark-inner">
          <Link className="dark-p" to="/bT/popular">
            DARK
          </Link>
        </div>
      </div>
      <div className="light-theme oneofthemes">
        <div className="white-inner">
          <Link className="light-p" to="/lT">
            LIGHT
          </Link>
        </div>
      </div>

      <div className="slideDiv">
        <p>
          C<br />
          H<br />O<br />O<br />S<br />E<br />
          <br /> A <br /> <br />T<br />H<br />E<br />M
          <br />E
        </p>
      </div>
    </div>
  );
};

export default ChooseATheme;
