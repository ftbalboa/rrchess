import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setColor,
  setStatus,
  setMode,
} from "../../../redux/actions/gameActions";
import styles from "./OptionsReact.css";

export function OptionsReact() {
  const nDiff = 9;
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);
  const [practiceActive, changePractice] = useState(true);

  const setActiveColor = (color) => {
    changeWhite(color);
    dispatch(setColor(color ? "white" : "black"));
  };

  const setActivePractice = (practice) => {
    changePractice(practice);
    dispatch(setMode(practice ? "practice" : "IA"));
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

  return (
    <div className="OR">
      Options
      <div>
        Name
        <input type="text" name="name" />
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
      <button
        className="optionButton"
        onClick={() => {
          dispatch(setStatus("play"));
        }}
      >
        Start
      </button>
    </div>
  );
}
