import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setColor, setStatus } from "../../../../redux/actions/gameActions";
import styles from "./ShowMovs.css";
import { Mov } from "./Mov/Mov";

export function ShowMovs() {
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);

  const ajustArray = (a) => {
    let fr = [];
    a.forEach((mov) => {
      if (fr.length === 0 || fr[fr.length - 1].length > 1) fr.push([]);
      fr[fr.length - 1].push(mov);
    });
    return fr
  };

  const arrMovs = useSelector((state) => ajustArray(state.chess.moves));

  return (
    <div>
      <p> Movs </p>
      <p> Aperture </p>
      <div className="movs">
        {arrMovs.map((mov, index) => (
          <Mov movs={mov} key={index} index={index+1} />
        ))}
      </div>
    </div>
  );
}
