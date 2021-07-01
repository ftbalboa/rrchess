import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setStatus } from "../../../redux/actions/gameActions";
import styles from "./OptionsReact.css";

export function OptionsReact() {
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);

  const setActiveColor = (color) => {
    changeWhite(color);
    dispatch(setColor(color ? "white" : "black"));
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
