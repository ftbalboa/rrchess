import React, { useEffect, useState } from "react";
import styles from "./Nav.css";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "../../assets/logo/rookLogo.svg";


export function Nav() {
  return (
    <Navbar bg="dark">
    <Container>
        <NavLink exact to="/" className="navTitle">
          <Container>
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
            Another pixel chess :)
          </Container>
        </NavLink>
        <NavLink to="/database" className="navItem">
          Database
        </NavLink>
        <NavLink to="/about" className="navItem">
          About
        </NavLink>
    </Container>
    </Navbar>
  );
}
