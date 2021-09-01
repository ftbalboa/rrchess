import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API } from "../../..";
import {
  setColor,
  setStatus,
  setName,
  setDif,
  setTurn,
} from "../../../redux/actions/gameActions";
import styles from "./OptionsReact.css";
const axios = require("axios");

export function OptionsReact() {
  const dispatch = useDispatch();
  const playerName = useSelector((state) => state.chess.name);
  const [winrate, setWinrate] = useState(null);
  const [input, setInput] = useState({
    name: playerName,
    dif: "Easy",
    color: "randomColor",
  });

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API}/winrate`,
    }).then((res) => {
      setWinrate(res.data);
    });
  }, []);

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
    let forMap = ["★", "★★", "★★★"];
    let forText = ["Easy", "Medium", "Hard"];
    return (
      <div className="winrate">
        {forMap.map((n, i) => (
          <div className="winrateItem">
            <button
              name={forText[i]}
              key={i}
              className={
                forText[i] !== input.dif ? "optionButton" : "activeOptionButton"
              }
              onClick={handleDif}
            >
              {n}
            </button>
            {winrate ? Math.round(winrate[forText[i]]) + '%' : ""}
          </div>
        ))}
      </div>
    );
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setName(input.name.length > 0 ? capitalizeFirstLetter(input.name) :  "Anonymous" ));
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
    <form className="OR" onSubmit={handleSubmit}>
      <div className="optionsTitle">Options</div>
      <div className="nameForm">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          maxLength="10"
          className="nameInput"
        />
      </div>
      <div className="optionsTitle">Pieces</div>
      <div>
        <button
          name="blackColor"
          style={{
            backgroundColor: "black",
            borderRadius: "100%",
            height: "50px",
            width: "50px",
            marginRight: "20px",
          }}
          className={
            input.color !== "blackColor" ? "optionButton" : "activeOptionButton"
          }
          onClick={handleColor}
        ></button>
        <button
          name="randomColor"
          style={{
            borderRadius: "100%",
            height: "50px",
            width: "50px",
            background:
              "linear-gradient( 270deg, black, black 49%, white 51% )",
          }}
          className={
            input.color !== "randomColor"
              ? "optionButton"
              : "activeOptionButton"
          }
          onClick={handleColor}
        ></button>
        <button
          name="whiteColor"
          style={{
            backgroundColor: "white",
            borderRadius: "100%",
            height: "50px",
            width: "50px",
            marginLeft: "20px",
          }}
          className={
            input.color !== "whiteColor" ? "optionButton" : "activeOptionButton"
          }
          onClick={handleColor}
        ></button>
      </div>
      <div className="optionsTitle">Diff</div>
      {difficulty()}
      <input type="submit" className="optionButton" value="Start" />
    </form>
  );
}
