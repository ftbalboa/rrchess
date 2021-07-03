import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setStatus } from "../../../../redux/actions/gameActions";
import styles from "./ShowMovs.css";
import { Mov } from "./Mov/Mov";

export function ShowMovs() {
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);
const arr = ["a","b","c","d","e","f","g","h","i","j"]

  return (
    <div className="OR">
        <p> Movs </p>
        <p> Aperture </p>
        <div className="movs">
            {arr.map((mov,index)=>(
                <Mov name={mov} key={index} />
            ))}
        </div>
    </div>
  );
}
