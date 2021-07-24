import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBoard } from "../../redux/actions/gameActions";
import styles from "./Nav.css";
import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <div className="Nav">
      <NavLink exact to="/" className="navTitle">
        Another pixel chess :)
      </NavLink>
      <NavLink to="/database" className="navItem" activeClassName="active">
        Database
      </NavLink>
      <NavLink to="/about" className="navItem" activeClassName="active">
        About
      </NavLink>
    </div>
  );
}
