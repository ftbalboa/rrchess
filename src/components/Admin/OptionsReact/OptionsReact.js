import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setStatus, setMode } from "../../../redux/actions/gameActions";
import styles from "./OptionsReact.css";

export function OptionsReact() {
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

  return (
    <div className="OR">
      Opciones
      <div>
        <button
          className={whiteActive? "optionButton" : "activeOptionButton"}
          onClick={() => {
            setActiveColor(false);
          }}
        >
          Black
        </button>
        <button
          className={whiteActive? "activeOptionButton" : "optionButton"}
          onClick={() => {
            setActiveColor(true);
          }}
        >
          White
        </button>
      </div>
      <div>
        <button
          className={practiceActive? "optionButton" : "activeOptionButton"}
          onClick={() => {
            setActivePractice(false);
          }}
        >
          Practice
        </button>
        <button
          className={practiceActive? "activeOptionButton" : "optionButton"}
          onClick={() => {
            setActivePractice(true);
          }}
        >
          Vs IA
        </button>
      </div>
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
