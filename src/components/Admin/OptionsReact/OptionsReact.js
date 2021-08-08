import React, { useState } from "react";
import { Container, Form, Col, Row, ButtonGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setStatus,
  setName,
  setDif,
  setTurn,
} from "../../../redux/actions/gameActions";
//import styles from "./OptionsReact.css";

export function OptionsReact() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.chess.name);
  const [input, setInput] = useState({
    name: playerName,
    dif: "Easy",
    color: "randomColor",
  });
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleDif = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      dif: e.target.name,
    });
  };
  const handleColor = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      color: e.target.name,
    });
    switch (e.target.name) {
      case "blackColor":
        dispatch(setColor("black"));
        break;
      case "whiteColor":
        dispatch(setColor("white"));
        break;
      default:
        break;
    }
  };

  const difficulty = () => {
    let forMap = ["Easy", "Medium", "Hard"];
    return (
      <div>
        {forMap.map((n) => (
          <button
            name={n}
            key={n}
            className={n !== input.dif ? "optionButton" : "activeOptionButton"}
            onClick={handleDif}
          >
            {n}
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setName(input.name));
    dispatch(setDif(input.dif));
    dispatch(setTurn("white"));
    if (input.color === "randomColor") {
      Math.random() < 0.5
        ? dispatch(setColor("white"))
        : dispatch(setColor("black"));
    }
    setTimeout(() => {
      dispatch(setStatus("play"));
    }, 0);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="p-3 mb-2 bg-dark text-white">
      <Col>
        Options
        <Form.Group controlId="playerName" className="m-4">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            required="required"
            maxLength="10"
            className="form-control"
            size="sm"
          />
          {/* <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          required="required"
          maxLength="10"
          className="nameInput"
        /> */}
        </Form.Group>
        <Form.Group controlId="playerColor" className="m-4">
        <Form.Label>Pieces</Form.Label>
        <ButtonGroup>
          <Button
            name="blackColor"
            className={
              input.color !== "blackColor"
                ? "optionButton"
                : "activeOptionButton"
            }
            onClick={handleColor}
          >
            Black
          </Button>
          <Button
            name="randomColor"
            className={
              input.color !== "randomColor"
                ? "optionButton"
                : "activeOptionButton"
            }
            onClick={handleColor}
          >
            Random
          </Button>
          <Button
            name="whiteColor"
            className={
              input.color !== "whiteColor"
                ? "optionButton"
                : "activeOptionButton"
            }
            onClick={handleColor}
          >
            White
          </Button>
          </ButtonGroup>
          </Form.Group>
        Diff
        {difficulty()}
        <input type="submit" className="optionButton" value="Start" />
        </Col>
      </Form>
    </Container>
  );
}
