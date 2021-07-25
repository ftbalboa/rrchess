import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setStatus,
  setName
} from "../../../redux/actions/gameActions";
import styles from "./OptionsReact.css";

export function OptionsReact() {
  const nDiff = 10;
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);
  const [input, setInput] = useState({
    name: "",
  });
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const setActiveColor = (color) => {
    changeWhite(color);
    dispatch(setColor(color ? "white" : "black"));
  };

  const difficulty = () => {
    let forMap = [];
    for (let i = 1; i <= nDiff; i++) {
      forMap.push(i);
    }
    return (
      <div>
        {forMap.map((n, index) => (
          <button
            key={index}
            className={whiteActive ? "optionButton" : "activeOptionButton"}
            onClick={() => {
              setActiveColor(false);
            }}
          >
            {n}
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setStatus("play"));
    dispatch(setName(input.name));
  }

  return (
    <form className="OR" onSubmit={handleSubmit}>
      Options
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          required="required"
          maxlength="10"
          className="nameInput"
        />
      </div>
      <div>
        <p>Picture</p>A B C
      </div>
      <div>Pieces</div>
      <div>
        <button
          className={whiteActive ? "optionButton" : "activeOptionButton"}
          onClick={() => {
            setActiveColor(false);
          }}
        >
          Black
        </button>
        <button
          className={whiteActive ? "activeOptionButton" : "optionButton"}
          onClick={() => {
            setActiveColor(true);
          }}
        >
          Random
        </button>
        <button
          className={whiteActive ? "activeOptionButton" : "optionButton"}
          onClick={() => {
            setActiveColor(true);
          }}
        >
          White
        </button>
      </div>
      Diff
      {difficulty()}
      <input
        type="submit"
        className="optionButton"
        value="Start"
      />
    </form>
  );
}
