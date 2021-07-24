import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetMoves } from "../../../../redux/actions/gameActions";
import styles from "./ShowMovs.css";
import { Mov } from "./Mov/Mov";

export function ShowMovs({needReset}) {
  const dispatch = useDispatch();
  const [whiteActive, changeWhite] = useState(true);

  useEffect(() => {
    needReset && dispatch(resetMoves());
  }, []);

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
      <div className="movs">
        {arrMovs.map((mov, index) => (
          <Mov movs={mov} key={index} index={index+1} />
        ))}
      </div>
    </div>
  );
}
